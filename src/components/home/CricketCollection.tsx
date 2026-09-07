import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const CricketCollection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white lg:px-10 lg:py-36"
    >
      {/* Background number */}
      <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none text-[35vw] font-black leading-none tracking-[-0.12em] text-white/[0.018]">
        01
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF0000]"
          >
            Built for cricket
          </motion.p>

          <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
            Collection 01 / 2026
          </span>
        </div>

        {/* Main composition */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Text */}
          <motion.div style={{ y: textY }} className="relative z-10">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[clamp(4rem,8vw,8rem)] font-black uppercase leading-[0.8] tracking-[-0.07em]"
              >
                Own
                <br />
                the
                <br />
                <span className="text-[#FF0000]">game.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-9 max-w-sm text-sm leading-6 text-white/45 sm:text-base"
            >
              Engineered for every ball, every run and every moment between
              the wickets. Cricket wear designed to perform when it matters.
            </motion.p>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="group mt-9 flex w-fit items-center gap-4 border-b border-white/20 pb-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:border-[#FF0000]"
            >
              Explore cricket
              <MoveRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </motion.a>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            {/* Red corner */}
            <div className="absolute -left-3 -top-3 z-20 h-20 w-20 border-l border-t border-[#FF0000] sm:-left-5 sm:-top-5 sm:h-28 sm:w-28" />

            {/* Main image placeholder */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0D0D0D]">
              <motion.div
                style={{ y: imageY }}
                className="absolute -inset-[8%]"
              >
                {/* Placeholder lighting */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#000045] via-[#101010] to-black" />

                <div className="absolute left-[8%] top-[15%] h-[55%] w-[30%] rounded-full bg-[#FF0000]/10 blur-[90px]" />

                <div className="absolute bottom-[-10%] right-[5%] h-[60%] w-[45%] rounded-full bg-[#000045]/60 blur-[100px]" />

                {/* Abstract athlete */}
                <div className="absolute bottom-[8%] left-1/2 h-[78%] w-[55%] -translate-x-1/2">
                  <div className="absolute left-1/2 top-0 h-[16%] w-[18%] -translate-x-1/2 rounded-full bg-white/[0.08]" />

                  <div className="absolute left-1/2 top-[13%] h-[67%] w-[58%] -translate-x-1/2 skew-x-[-4deg] rounded-t-[35%] bg-white/[0.06]" />

                  <div className="absolute left-[2%] top-[18%] h-[53%] w-[13%] -rotate-[12deg] rounded-full bg-white/[0.045]" />

                  <div className="absolute right-[2%] top-[18%] h-[53%] w-[13%] rotate-[12deg] rounded-full bg-white/[0.045]" />

                  <div className="absolute bottom-0 left-[24%] h-[35%] w-[15%] rotate-[4deg] bg-white/[0.04]" />

                  <div className="absolute bottom-0 right-[24%] h-[35%] w-[15%] -rotate-[4deg] bg-white/[0.04]" />

                  {/* Jersey stripe */}
                  <div className="absolute left-1/2 top-[35%] h-[3px] w-[82%] -translate-x-1/2 bg-[#FF0000]/70" />
                </div>
              </motion.div>

              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Image label */}
              <div className="absolute bottom-6 left-6">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/25">
                  Athlete / Product
                </span>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
                  Photography coming soon
                </p>
              </div>

              {/* Product count */}
              <div className="absolute right-6 top-6 text-right">
                <span className="block text-3xl font-black tracking-[-0.05em]">
                  06
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/30">
                  Pieces
                </span>
              </div>
            </div>

            {/* Floating link */}
            <a
              href="#"
              className="group absolute -bottom-5 -right-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform duration-500 hover:scale-110 sm:-right-5 sm:h-24 sm:w-24"
            >
              <ArrowUpRight
                size={25}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid grid-cols-3 border-t border-white/10 pt-6 lg:mt-28">
          <div>
            <span className="text-2xl font-black tracking-tight sm:text-3xl">
              01
            </span>
            <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-white/30 sm:text-[9px]">
              Performance
            </p>
          </div>

          <div className="border-l border-white/10 pl-5">
            <span className="text-2xl font-black tracking-tight sm:text-3xl">
              06
            </span>
            <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-white/30 sm:text-[9px]">
              Products
            </p>
          </div>

          <div className="border-l border-white/10 pl-5">
            <span className="text-2xl font-black tracking-tight sm:text-3xl">
              ∞
            </span>
            <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-white/30 sm:text-[9px]">
              Possibilities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CricketCollection;