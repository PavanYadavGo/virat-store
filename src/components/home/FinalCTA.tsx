import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion } from "motion/react";

const FinalCTA = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[#F5F5F2]
        px-6 py-24
        text-[#080808]
        transition-colors duration-300
        dark:bg-[#050505]
        dark:text-white
        lg:px-10 lg:py-36
      "
    >
      {/* Top red line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          absolute left-0 top-0
          h-px w-full origin-left
          bg-[#FF0000]
        "
      />

      {/* Background V */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          flex items-center justify-center
          overflow-hidden
        "
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            select-none
            text-[40vw]
            font-black
            leading-none
            tracking-[-0.15em]
            text-black/[0.025]
            dark:text-white/[0.018]
          "
        >
          V
        </motion.span>
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div
          className="
            mb-16 flex items-center justify-between
            border-b border-black/10
            pb-5
            dark:border-white/10
          "
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#FF0000]" />

            <span
              className="
                text-[10px] font-bold uppercase
                tracking-[0.3em]
                text-[#FF0000]
              "
            >
              The Virat Standard
            </span>
          </div>

          <span
            className="
              text-[9px] uppercase
              tracking-[0.3em]
              text-black/25
              dark:text-white/25
            "
          >
            04 / 04
          </span>
        </div>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_0.45fr] lg:items-end">

          {/* Heading */}
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(4rem,10vw,10rem)]
                  font-black
                  uppercase
                  leading-[0.8]
                  tracking-[-0.08em]
                "
              >
                Move
                <br />
                <span className="text-[#FF0000]">
                  different.
                </span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="
                mt-10
                max-w-lg
                text-sm
                leading-6
                text-black/50
                dark:text-white/50
                sm:text-base
              "
            >
              Built for the ones who play hard,
              move freely and carry the game beyond
              the boundary. Discover cricket,
              sportswear and everyday essentials
              by Virat.
            </motion.p>
          </div>

          {/* CTA side */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="
              flex flex-col
              lg:pb-2
            "
          >
            <span
              className="
                mb-6
                text-[9px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-black/30
                dark:text-white/30
              "
            >
              Start here
            </span>

            <a
              href="#"
              className="
                group
                flex items-center justify-between
                border-b
                border-black/15
                pb-5
                text-sm
                font-bold
                uppercase
                tracking-[0.18em]
                transition-colors
                hover:border-[#FF0000]
                dark:border-white/15
              "
            >
              Shop all

              <span
                className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  bg-[#FF0000]
                  text-white
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </span>
            </a>

            <div
              className="
                mt-6
                flex items-center gap-3
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-black/25
                dark:text-white/25
              "
            >
              <MoveRight size={14} />
              Explore Virat
            </div>
          </motion.div>
        </div>

        {/* Brand principles */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
          className="
            mt-20
            grid
            border-y
            border-black/10
            dark:border-white/10
            sm:grid-cols-3
          "
        >
          <div
            className="
              border-b
              border-black/10
              px-0 py-6
              dark:border-white/10
              sm:border-b-0
              sm:border-r
              sm:px-6
              sm:first:pl-0
            "
          >
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#FF0000]
              "
            >
              01
            </span>

            <p className="mt-3 text-sm font-semibold">
              Built to perform
            </p>
          </div>

          <div
            className="
              border-b
              border-black/10
              px-0 py-6
              dark:border-white/10
              sm:border-b-0
              sm:border-r
              sm:px-6
            "
          >
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#FF0000]
              "
            >
              02
            </span>

            <p className="mt-3 text-sm font-semibold">
              Designed for movement
            </p>
          </div>

          <div className="px-0 py-6 sm:px-6 sm:pr-0">
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#FF0000]
              "
            >
              03
            </span>

            <p className="mt-3 text-sm font-semibold">
              Made beyond the game
            </p>
          </div>
        </motion.div>

        {/* Bottom */}
        <div
          className="
            mt-6
            flex items-center justify-between
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-black/25
            dark:text-white/25
          "
        >
          <span>Virat Sportswear</span>
          <span>Play / Move / Repeat</span>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;