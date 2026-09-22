import { motion } from "motion/react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#F5F5F2] text-[#080808]">
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-20 lg:pb-32">
        {/* ===================================================== 
            BACKGROUND WATERMARK
        ====================================================== */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-[-5%] top-[-5%]
            z-0
            select-none
            text-[clamp(15rem,35vw,35rem)]
            font-black
            leading-none
            tracking-[-0.1em]
            text-black/[0.03]
          "
        >
          08
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            
            {/* LEFT: HEADER & INFO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              {/* Header Titles */}
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
                
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3rem,8vw,5.5rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]"
                >
                  Contact
                  <br />
                  <span>Us<span className="text-[#FF0000]">.</span></span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mt-6 max-w-md text-sm leading-relaxed text-black/60 sm:text-base sm:leading-7"
                >
                  Have a question about your order, sizing, or want to collaborate? 
                  Drop us a message and our team will get back to you as soon as possible.
                </motion.p>
              </div>

              {/* Info Details */}
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
                </ul>

                <div className="mt-12">
                  <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
                    Follow Us
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
              className="lg:mt-0"
            >
              <form className="flex flex-col gap-6 bg-white p-8 sm:p-12 shadow-sm border border-black/5">
                <h2 className="mb-4 text-2xl font-black uppercase tracking-[-0.03em] sm:text-3xl">
                  Send a Message
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-[0.2em]">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                      placeholder="Virat"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-[0.2em]">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                      placeholder="Kohli"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em]">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                    placeholder="hello@example.com"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em]">Subject</label>
                  <select 
                    id="subject" 
                    className="appearance-none border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                  >
                    <option>Order Inquiry</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Information</option>
                    <option>Partnerships</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em]">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="resize-none border-b border-black/20 bg-transparent py-3 text-sm font-bold outline-none transition-colors focus:border-[#FF0000]"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button 
                  type="button" 
                  className="group relative mt-4 flex w-full items-center justify-between overflow-hidden border border-[#080808] bg-[#080808] px-8 py-5 text-white transition-all duration-300 hover:bg-transparent hover:text-[#080808]"
                >
                  <div className="absolute inset-0 -translate-y-full bg-transparent transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em]">
                    Send Message
                  </span>
                  <ArrowRight size={18} strokeWidth={2} className="relative z-10 transition-transform group-hover:translate-x-1" />
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
