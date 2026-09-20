import { ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { motion } from "motion/react";
const videos = [
  {
    id: "01",
    title: "Match Day",
    description: "Built for the pressure.",
    url: "https://www.instagram.com/reel/REPLACE_01/",
  },
  {
    id: "02",
    title: "Train Hard",
    description: "Made to move.",
    url: "https://www.instagram.com/reel/REPLACE_02/",
  },
  {
    id: "03",
    title: "Game Ready",
    description: "Performance without compromise.",
    url: "https://www.instagram.com/reel/REPLACE_03/",
  },
  {
    id: "04",
    title: "Off The Field",
    description: "Beyond the game.",
    url: "https://www.instagram.com/reel/REPLACE_04/",
  },
];
const SeeItInAction = () => {
  return (
    <section className=" relative overflow-hidden bg-[#F5F5F2] px-5 py-24 text-[#080808] sm:px-8 sm:py-28 lg:px-10 lg:py-36 ">
      {" "}
      {/* ===================================================== LARGE SECTION NUMBER ====================================================== */}{" "}
      <div
        aria-hidden="true"
        className=" pointer-events-none absolute right-[-10px] top-1/2 z-0 -translate-y-1/2 select-none text-[clamp(10rem,22vw,22rem)] font-black leading-none tracking-[-0.1em] text-black/[0.045] "
      >
        {" "}
        07{" "}
      </div>{" "}
      <div className="relative z-10 mx-auto max-w-7xl">
        {" "}
        {/* ===================================================== HEADER ====================================================== */}{" "}
        <div className=" mb-14 grid gap-8 sm:mb-16 lg:mb-20 lg:grid-cols-[1fr_320px] lg:items-end ">
          {" "}
          {/* LEFT */}{" "}
          <div>
            {" "}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className=" mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF0000] sm:text-xs "
            >
              {" "}
              <span className="h-px w-10 bg-[#FF0000]" /> VIRAT / IN MOTION{" "}
            </motion.p>{" "}
            <div className="overflow-hidden">
              {" "}
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className=" text-[clamp(3rem,9vw,6rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#080808] "
              >
                {" "}
                See it <br />{" "}
                <span>
                  {" "}
                  in action<span className="text-[#FF0000]">.</span>{" "}
                </span>{" "}
              </motion.h2>{" "}
            </div>{" "}
          </div>{" "}
          {/* RIGHT */}{" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className=" max-w-sm lg:ml-auto lg:pb-2 "
          >
            {" "}
            <p className=" text-sm leading-6 text-black/60 sm:text-base sm:leading-7 ">
              {" "}
              From the field to the streets, see how Virat moves when the game
              begins.{" "}
            </p>{" "}
            <div className=" mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 ">
              {" "}
              <span className="h-px w-8 bg-current" /> 04 Featured reels{" "}
            </div>{" "}
          </motion.div>{" "}
        </div>{" "}
        {/* ===================================================== VIDEO GRID ====================================================== */}{" "}
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          {" "}
          {videos.map((video, index) => (
            <motion.article
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className=" group relative overflow-hidden border border-black/10 bg-[#080808] "
            >
              {" "}
              {/* VIDEO FRAME */}{" "}
              <div className=" relative aspect-[9/16] overflow-hidden ">
                {" "}
                {/* Instagram embed */}{" "}
                <iframe
                  src={`${video.url}embed/`}
                  title={video.title}
                  className=" absolute inset-0 h-full w-full border-0 "
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />{" "}
                {/* Subtle overlay */}{" "}
                <div className=" pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-70 " />{" "}
                {/* TOP META */}{" "}
                <div className=" pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between ">
                  {" "}
                  <span className=" text-[10px] font-bold tracking-[0.2em] text-white/70 ">
                    {" "}
                    {video.id}{" "}
                  </span>{" "}
                  <div className=" flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-sm ">
                    {" "}
                    <FaInstagram size={14} className="text-white" />{" "}
                  </div>{" "}
                </div>{" "}
                {/* BOTTOM INFO */}{" "}
                <div className=" pointer-events-none absolute bottom-4 left-4 right-4 z-10 ">
                  {" "}
                  <p className=" mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF0000] ">
                    {" "}
                    {video.description}{" "}
                  </p>{" "}
                  <div className="flex items-end justify-between gap-3">
                    {" "}
                    <h3 className=" text-xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-2xl ">
                      {" "}
                      {video.title}{" "}
                      <span className="text-[#FF0000]">.</span>{" "}
                    </h3>{" "}
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className=" text-white/70 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FF0000] "
                    />{" "}
                  </div>{" "}
                </div>{" "}
                {/* HOVER BORDER */}{" "}
                <div className=" pointer-events-none absolute inset-0 z-20 border border-transparent transition-colors duration-500 group-hover:border-[#FF0000]/70 " />{" "}
              </div>{" "}
            </motion.article>
          ))}{" "}
        </div>{" "}
        {/* ===================================================== INSTAGRAM CTA ====================================================== */}{" "}
        <motion.a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className=" group mt-10 flex items-center justify-between border-t border-black/10 pt-5 "
        >
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <FaInstagram size={16} className="text-[#080808]" />{" "}
            <span className=" text-[10px] font-bold uppercase tracking-[0.25em] text-black/50 transition-colors duration-300 group-hover:text-[#FF0000] ">
              {" "}
              Follow Virat on Instagram{" "}
            </span>{" "}
          </div>{" "}
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            className=" text-black/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FF0000] "
          />{" "}
        </motion.a>{" "}
      </div>{" "}
    </section>
  );
};
export default SeeItInAction;
