import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { config } from "../config/env.js";
import { ContactMessageModel } from "../models/ContactMessage.js";
import { getIsConnected } from "../config/db.js";
import { memoryStore } from "../config/memoryStore.js";

// POST /api/contact
export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      res.status(400).json({
        success: false,
        error: "Please provide a valid name (at least 2 characters).",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
      return;
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 2) {
      res.status(400).json({
        success: false,
        error: "Please provide a subject for your enquiry.",
      });
      return;
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      res.status(400).json({
        success: false,
        error: "Please provide a message with at least 10 characters.",
      });
      return;
    }

    const trimmedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      subject: subject.trim(),
      message: message.trim(),
    };

    let deliveryStatus: "sent" | "mock_logged" | "failed" = "mock_logged";
    let errorDetails: string | undefined = undefined;

    // Check if live SMTP credentials are provided
    const hasSmtpCredentials = Boolean(config.SMTP.USER && config.SMTP.PASS);

    if (hasSmtpCredentials) {
      try {
        const transporter = nodemailer.createTransport({
          host: config.SMTP.HOST,
          port: config.SMTP.PORT,
          secure: config.SMTP.PORT === 465,
          auth: {
            user: config.SMTP.USER,
            pass: config.SMTP.PASS,
          },
        });

        await transporter.sendMail({
          from: `"${trimmedData.name}" <${config.SMTP.SENDER}>`,
          to: config.SMTP.RECEIVER,
          replyTo: trimmedData.email,
          subject: `[Virat Store Enquiry] ${trimmedData.subject}`,
          text: `
Name: ${trimmedData.name}
Email: ${trimmedData.email}
Phone: ${trimmedData.phone || "Not provided"}
Subject: ${trimmedData.subject}

Message:
${trimmedData.message}
          `.trim(),
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #080808; max-width: 600px;">
              <h2 style="border-bottom: 2px solid #FF0000; padding-bottom: 8px;">New Contact Message — Virat Store</h2>
              <p><strong>Name:</strong> ${trimmedData.name}</p>
              <p><strong>Email:</strong> ${trimmedData.email}</p>
              <p><strong>Phone:</strong> ${trimmedData.phone || "Not provided"}</p>
              <p><strong>Subject:</strong> ${trimmedData.subject}</p>
              <div style="background: #F5F5F2; padding: 16px; border-left: 4px solid #FF0000; margin-top: 16px;">
                <p style="margin: 0; white-space: pre-wrap;">${trimmedData.message}</p>
              </div>
            </div>
          `,
        });

        deliveryStatus = "sent";
        console.log(`[CONTACT EMAIL] Real email dispatched to ${config.SMTP.RECEIVER} via ${config.SMTP.HOST}`);
      } catch (mailError: any) {
        deliveryStatus = "failed";
        errorDetails = mailError.message;
        console.error("[CONTACT EMAIL ERROR] Failed dispatching email:", mailError.message);
      }
    } else {
      console.log(`[CONTACT FORM] Message received and logged (Live SMTP credentials not configured).`);
      console.log(`[CONTACT FORM DATA] From: ${trimmedData.name} <${trimmedData.email}> | Subject: ${trimmedData.subject}`);
    }

    // Persist to Database or Memory Store
    if (getIsConnected()) {
      await ContactMessageModel.create({
        ...trimmedData,
        deliveryStatus,
        errorDetails,
      });
    } else {
      memoryStore.contacts.push({
        id: `MSG-${Date.now()}`,
        ...trimmedData,
        deliveryStatus,
        errorDetails,
        createdAt: new Date(),
      });
    }

    res.status(200).json({
      success: true,
      message:
        deliveryStatus === "sent"
          ? "Thank you! Your message has been sent to our team."
          : "Thank you! Your message has been securely recorded by our support system.",
      deliveryStatus,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/admin/contacts (Admin Only)
export const getAdminContacts = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (getIsConnected()) {
      const messages = await ContactMessageModel.find().sort({ createdAt: -1 });
      res.json({ success: true, count: messages.length, data: messages });
      return;
    }

    res.json({
      success: true,
      count: memoryStore.contacts.length,
      data: memoryStore.contacts,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

