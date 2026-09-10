import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import cricketCollectionImage from "../../assets/cricket-collection.jpg";

const CricketCollection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        bg-[#F5F5F2] px-6 py-24
        text-[#080808]
        transition-colors duration-300
        dark:bg-[#050505] dark:text-white
        lg:px-10 lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-14 lg:mb-20">
          <div className="flex items-center justify-between border-b border-black/10 pb-5 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#FF0000]" />

              <span
                className="
                  text-[10px] font-bold uppercase
                  tracking-[0.3em] text-[#FF0000]
                "
              >
                Cricket Collection
              </span>
            </div>

            <span
              className="
                text-[9px] font-medium uppercase
                tracking-[0.25em]
                text-black/30
                dark:text-white/30
              "
            >
              Collection 02 / 2026
            </span>
          </div>

          {/* MAIN HEADING */}
          <div className="mt-8 overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                text-[clamp(3.5rem,8vw,8rem)]
                font-black uppercase
                leading-[0.82]
                tracking-[-0.075em]
              "
            >
              Cricket.
              <br />
              <span className="text-[#FF0000]">Redefined.</span>
            </motion.h2>
          </div>

          <div
            className="
              mt-7 flex flex-col gap-5
              sm:flex-row sm:items-end
              sm:justify-between
            "
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="
                max-w-lg text-sm leading-6
                text-black/50
                dark:text-white/50
                sm:text-base
              "
            >
              Performance-driven cricket wear built for movement,
              confidence and the demands of the game.
            </motion.p>

            <span
              className="
                text-[9px] font-bold uppercase
                tracking-[0.25em]
                text-black/30
                dark:text-white/30
              "
            >
              06 Pieces / Performance
            </span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div
          className="
            grid items-center gap-12
            lg:grid-cols-[0.7fr_1.3fr]
            lg:gap-20
          "
        >

          {/* LEFT CONTENT */}
          <motion.div
            style={{ y: textY }}
            className="relative z-10"
          >
            <span
              className="
                text-[10px] font-bold uppercase
                tracking-[0.3em]
                text-black/30
                dark:text-white/30
              "
            >
              Built for the game
            </span>

            <div className="mt-6 overflow-hidden">
              <motion.h3
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(3rem,6vw,6rem)]
                  font-black uppercase
                  leading-[0.82]
                  tracking-[-0.07em]
                "
              >
                Own
                <br />
                the
                <br />
                <span className="text-[#FF0000]">game.</span>
              </motion.h3>
            </div>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="
                group mt-9 flex w-fit
                items-center gap-4
                border-b border-black/20
                pb-3
                text-xs font-bold uppercase
                tracking-[0.2em]
                transition-colors
                hover:border-[#FF0000]
                dark:border-white/20
              "
            >
              Explore cricket

              <MoveRight
                size={17}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-2
                "
              />
            </motion.a>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            {/* RED CORNER */}
            <div
              className="
                absolute -left-3 -top-3
                z-20
                h-20 w-20
                border-l border-t border-[#FF0000]
                sm:-left-5 sm:-top-5
                sm:h-28 sm:w-28
              "
            />

            {/* IMAGE */}
            <div
              className="
                relative aspect-[4/5]
                overflow-hidden
                bg-[#E5E5E2]
                dark:bg-[#0D0D0D]
              "
            >
              <motion.img
                src={cricketCollectionImage}
                alt="Virat cricket collection"
                draggable={false}
                style={{ y: imageY }}
                className="
                  absolute
                  -inset-[4%]
                  h-[108%]
                  w-[108%]
                  max-w-none
                  object-cover
                  select-none
                "
              />

              {/* IMAGE GRADIENT */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t
                  from-black/65
                  via-black/10
                  to-transparent
                "
              />

              {/* TOP LABEL */}
              <div className="absolute left-6 top-6">
                <span
                  className="
                    text-[9px] font-bold uppercase
                    tracking-[0.3em]
                    text-white/70
                  "
                >
                  Virat / Cricket
                </span>
              </div>

              {/* BOTTOM IMAGE TEXT */}
              <div className="absolute bottom-6 left-6">
                <p
                  className="
                    text-[9px] uppercase
                    tracking-[0.3em]
                    text-white/60
                  "
                >
                  Built to perform
                </p>

                <p
                  className="
                    mt-1 text-xl font-black
                    uppercase tracking-[-0.04em]
                    text-white
                  "
                >
                  Every ball.
                </p>
              </div>
            </div>

            {/* FLOATING CTA */}
            <a
              href="#"
              aria-label="Explore cricket collection"
              className="
                group absolute -bottom-5 -right-3
                flex h-20 w-20
                items-center justify-center
                rounded-full
                bg-[#FF0000]
                text-white
                transition-transform duration-500
                hover:scale-110
                sm:-right-5
                sm:h-24 sm:w-24
              "
            >
              <ArrowUpRight
                size={25}
                strokeWidth={1.5}
                className="
                  transition-transform duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </a>
          </motion.div>
        </div>

        {/* BOTTOM LINE */}
        <div
          className="
            mt-20 flex items-center justify-between
            border-t border-black/10
            pt-5
            text-[9px] font-bold uppercase
            tracking-[0.25em]
            text-black/30
            dark:border-white/10
            dark:text-white/30
            lg:mt-28
          "
        >
          <span>01 / Cricket</span>

          <span className="hidden sm:block">
            Built to perform
          </span>

          <span>Virat</span>
        </div>
      </div>
    </section>
  );
};

export default CricketCollection;