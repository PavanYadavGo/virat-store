import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { api } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    if (!fullName || !formData.email || !formData.message) {
      setStatusMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatusMessage({ type: "error", text: "Message must be at least 10 characters long." });
      return;
    }

    setLoading(true);

    try {
      const res = await api.submitContact({
        name: fullName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (res.success) {
        setStatusMessage({
          type: "success",
          text: res.message || "Thank you! Your message has been received.",
        });
        setFormData({ firstName: "", lastName: "", email: "", subject: "Order Inquiry", message: "" });
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "Failed to send message. Please try again.",
        });
      }
    } catch (err: unknown) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Network error sending message.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F2] text-[#080808]">
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-20 lg:pb-32">
        {/* WATERMARK */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-5%] top-[-5%] z-0 select-none text-[clamp(15rem,35vw,35rem)] font-black leading-none tracking-[-0.1em] text-black/[0.03]"
        >
          08
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            
            {/* LEFT: INFO & SOCIALS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="mb-12">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF0000] sm:text-xs"
                >
                  <span className="h-px w-10 bg-[#FF0000]" />
                  Get in touch
                </motion.p>

                <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
                  Contact
                  <br />
                  <span>Us<span className="text-[#FF0000]">.</span></span>
                </h1>

                <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 sm:text-base sm:leading-7">
                  Have a question about your order, sizing, teamwear, or want to collaborate? Drop us a message and our team will get back to you.
                </p>
              </div>

              {/* Direct Details */}
              <div className="border-t border-black/10 pt-10">
                <ul className="flex flex-col gap-8">
                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 bg-white">
                      <Mail size={16} className="text-[#FF0000]" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-black/50">Email</h3>
                      <a href="mailto:support@viratsports.com" className="text-sm font-bold transition-colors hover:text-[#FF0000]">
                        support@viratsports.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 bg-white">
                      <Phone size={16} className="text-[#FF0000]" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-black/50">Phone</h3>
                      <p className="text-sm font-bold">+91 1800-VIRAT-00</p>
                      <p className="mt-1 text-xs text-black/50">Mon-Fri, 9AM-6PM IST</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 bg-white">
                      <MapPin size={16} className="text-[#FF0000]" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-black/50">Headquarters</h3>
                      <p className="text-sm font-bold leading-relaxed">
                        Virat Sports Official<br />
                        Bengaluru, Karnataka<br />
                        India
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-12">
                  <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
                    Follow Official Instagram
                  </h3>

                  <a
                    href="https://www.instagram.com/viratsportsofficial/#"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-fit items-center gap-4 border border-black/10 bg-white px-6 py-4 transition-colors hover:border-[#FF0000] hover:bg-[#FF0000]"
                  >
                    <FaInstagram size={18} className="text-[#080808] transition-colors group-hover:text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#080808] transition-colors group-hover:text-white">
                      @viratsportsofficial
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-8 sm:p-12 shadow-sm border border-black/5">
                <h2 className="mb-2 text-2xl font-black uppercase tracking-[-0.03em] sm:text-3xl">
                  Send a Message
                </h2>

                {statusMessage && (
                  <div
                    className={`flex items-center gap-3 p-4 text-xs font-bold ${
                      statusMessage.type === "success"
                        ? "border border-green-500/30 bg-green-50 text-green-800"
                        : "border border-red-500/30 bg-red-50 text-red-800"
                    }`}
                  >
                    {statusMessage.type === "success" ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-[0.2em]">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                      placeholder="Virat"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-[0.2em]">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                      placeholder="Kohli"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em]">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                    placeholder="hello@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em]">Subject *</label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="appearance-none border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                  >
                    <option>Order Inquiry</option>
                    <option>Custom Teamwear & Uniforms</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Information</option>
                    <option>Partnerships & Sponsorships</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em]">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="resize-none border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-4 flex w-full items-center justify-between overflow-hidden border border-[#080808] bg-[#080808] px-8 py-5 text-white transition-all duration-300 hover:bg-transparent hover:text-[#080808] disabled:bg-black/50"
                >
                  <div className="absolute inset-0 -translate-y-full bg-transparent transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em]">
                    {loading ? "Sending Message..." : "Send Message"}
                  </span>
                  {loading ? (
                    <Loader2 size={18} className="relative z-10 animate-spin" />
                  ) : (
                    <ArrowRight size={18} strokeWidth={2} className="relative z-10 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

