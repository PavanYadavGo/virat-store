import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion } from "motion/react";

const FinalCTA = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[#F5F5F2]
        px-6 py-28
        text-[#080808]
        transition-colors duration-300
        dark:bg-black
        dark:text-white
        lg:px-10 lg:py-44
      "
    >
      {/* Background typography */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="
            select-none
            text-[30vw]
            font-black
            uppercase
            leading-none
            tracking-[-0.12em]
            text-black/[0.025]
            dark:text-white/[0.018]
          "
        >
          V
        </motion.span>
      </div>

      {/* Red energy line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          absolute left-0 top-0
          h-px w-full origin-left
          bg-gradient-to-r
          from-transparent
          via-[#FF0000]
          to-transparent
        "
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Top label */}
        <div
          className="
            mb-14 flex items-center justify-between
            lg:mb-20
          "
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              text-xs font-bold uppercase
              tracking-[0.3em]
              text-[#FF0000]
            "
          >
            Your game. Your rules.
          </motion.p>

          <span
            className="
              text-[9px] uppercase tracking-[0.3em]
              text-black/20
              dark:text-white/20
            "
          >
            VIRAT / 2026
          </span>
        </div>

        {/* Main heading */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              text-[clamp(4.5rem,13vw,13rem)]
              font-black
              uppercase
              leading-[0.76]
              tracking-[-0.09em]
            "
          >
            Play
            <br />
            <span className="text-[#FF0000]">
              harder.
            </span>
          </motion.h2>
        </div>

        {/* Bottom content */}
        <div
          className="
            mt-14 grid gap-10
            border-t border-black/10
            pt-8
            dark:border-white/10
            lg:mt-20
            lg:grid-cols-2
            lg:items-end
          "
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="
              max-w-md
              text-sm
              leading-6
              text-black/40
              dark:text-white/40
              sm:text-base
            "
          >
            From the first ball to the last step of the
            day. Discover performance wear and everyday
            essentials built to keep moving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.4,
            }}
            className="flex justify-start lg:justify-end"
          >
            <a
              href="#"
              className="
                group relative flex
                h-28 w-28
                items-center justify-center
                rounded-full
                bg-[#FF0000]
                text-center
                text-white
                transition-transform duration-500
                hover:scale-110
                sm:h-36 sm:w-36
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  sm:text-xs
                "
              >
                Shop
                <br />
                now
              </span>

              <ArrowUpRight
                size={18}
                className="
                  absolute right-5 top-5
                  transition-transform duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  sm:right-7 sm:top-7
                "
              />
            </a>
          </motion.div>
        </div>

        {/* Bottom navigation hint */}
        <div
          className="
            mt-16 flex items-center gap-3
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-black/20
            dark:text-white/20
          "
        >
          <MoveRight size={14} />
          Enter the collection
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;