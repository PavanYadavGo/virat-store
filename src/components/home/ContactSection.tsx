import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
export default function ContactSection() {
  return (
    <section
      id="contact"
      className=" relative overflow-hidden bg-[#F5F5F2] px-5 py-20 text-[#080808] sm:px-8 lg:px-10 "
    >
      {" "}
      {/* Background number */}{" "}
      <div
        aria-hidden="true"
        className=" pointer-events-none absolute right-[-20px] top-1/2 z-0 -translate-y-1/2 select-none text-[clamp(10rem,24vw,24rem)] font-black leading-none tracking-[-0.1em] text-black/[0.045] "
      >
        {" "}
        05{" "}
      </div>{" "}
      <div className="relative z-10 mx-auto max-w-[1500px]">
        {" "}
        {/* TOP LABEL */}{" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className=" mb-12 flex items-center justify-between border-b border-black/10 pb-5 sm:mb-16 "
        >
          {" "}
          <span className="text-xs font-bold uppercase tracking-[0.25em]">
            {" "}
            Contact Virat{" "}
          </span>{" "}
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-black/40">
            {" "}
            Get in touch{" "}
          </span>{" "}
        </motion.div>{" "}
        {/* MAIN CONTENT */}{" "}
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {" "}
          {/* LEFT SIDE */}{" "}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            {" "}
            <div>
              {" "}
              <p className=" mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#FF0000] ">
                {" "}
                Let's talk cricket.{" "}
              </p>{" "}
              <h2 className=" text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] ">
                {" "}
                Get in <br />{" "}
                <span className="text-[#FF0000]">touch.</span>{" "}
              </h2>{" "}
            </div>{" "}
            <div className=" mt-12 max-w-md border-l-2 border-[#FF0000] pl-6 lg:mt-20 ">
              {" "}
              <p className="text-lg font-medium leading-relaxed text-black/65 sm:text-xl">
                {" "}
                Have a question about our products, teamwear, orders or anything
                else? Send us a message and we'll get back to you.{" "}
              </p>{" "}
              <div className="mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em]">
                {" "}
                <span>We'd love to hear from you</span>{" "}
                <ArrowUpRight className="h-4 w-4 text-[#FF0000]" />{" "}
              </div>{" "}
            </div>{" "}
          </motion.div>{" "}
          {/* FORM */}{" "}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {" "}
            <form className="border-t border-black/15">
              {" "}
              {/* NAME + EMAIL */}{" "}
              <div className="grid border-b border-black/15 sm:grid-cols-2">
                {" "}
                <div className="border-b border-black/15 p-5 sm:border-b-0 sm:border-r sm:p-6">
                  {" "}
                  <label
                    htmlFor="name"
                    className=" mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 "
                  >
                    {" "}
                    Name{" "}
                  </label>{" "}
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className=" w-full bg-transparent text-lg font-semibold outline-none placeholder:text-black/25 "
                  />{" "}
                </div>{" "}
                <div className="p-5 sm:p-6">
                  {" "}
                  <label
                    htmlFor="email"
                    className=" mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 "
                  >
                    {" "}
                    Email{" "}
                  </label>{" "}
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className=" w-full bg-transparent text-lg font-semibold outline-none placeholder:text-black/25 "
                  />{" "}
                </div>{" "}
              </div>{" "}
              {/* PHONE + SUBJECT */}{" "}
              <div className="grid border-b border-black/15 sm:grid-cols-2">
                {" "}
                <div className="border-b border-black/15 p-5 sm:border-b-0 sm:border-r sm:p-6">
                  {" "}
                  <label
                    htmlFor="phone"
                    className=" mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 "
                  >
                    {" "}
                    Phone{" "}
                  </label>{" "}
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className=" w-full bg-transparent text-lg font-semibold outline-none placeholder:text-black/25 "
                  />{" "}
                </div>{" "}
                <div className="p-5 sm:p-6">
                  {" "}
                  <label
                    htmlFor="subject"
                    className=" mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 "
                  >
                    {" "}
                    Subject{" "}
                  </label>{" "}
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What can we help with?"
                    className=" w-full bg-transparent text-lg font-semibold outline-none placeholder:text-black/25 "
                  />{" "}
                </div>{" "}
              </div>{" "}
              {/* MESSAGE */}{" "}
              <div className="border-b border-black/15 p-5 sm:p-6">
                {" "}
                <label
                  htmlFor="message"
                  className=" mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 "
                >
                  {" "}
                  Message{" "}
                </label>{" "}
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className=" w-full resize-none bg-transparent text-lg font-semibold outline-none placeholder:text-black/25 "
                />{" "}
              </div>{" "}
              {/* SUBMIT */}{" "}
              <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {" "}
                <p className="max-w-sm text-xs leading-relaxed text-black/40">
                  {" "}
                  By submitting this form, you agree to be contacted regarding
                  your enquiry.{" "}
                </p>{" "}
                <button
                  type="submit"
                  className=" group flex w-full items-center justify-center gap-3 bg-[#080808] px-7 py-5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#FF0000] sm:w-auto "
                >
                  {" "}
                  Send Message{" "}
                  <ArrowUpRight className=" h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 " />{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </motion.div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
