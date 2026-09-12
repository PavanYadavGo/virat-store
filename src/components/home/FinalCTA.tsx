import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion } from "motion/react";

const FinalCTA = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[#F5F5F2]
        px-5 py-20
        text-[#080808]
        transition-colors duration-300
        dark:bg-[#050505]
        dark:text-white
        sm:px-8 sm:py-24
        lg:px-10 lg:py-36
      "
    >
      {/* Section Number */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[-10px] top-1/2 z-0
          -translate-y-1/2
          select-none
          text-[clamp(10rem,22vw,22rem)]
          font-black
          leading-none
          tracking-[-0.1em]
          text-black/[0.045]
          dark:text-white/[0.045]
        "
      >
        06
      </div>

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
            text-[55vw]
            font-black
            leading-none
            tracking-[-0.15em]
            text-black/[0.025]
            dark:text-white/[0.018]
            sm:text-[45vw]
            lg:text-[40vw]
          "
        >
          V
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div
          className="
            mb-12
            flex flex-col gap-4
            border-b border-black/10
            pb-5
            dark:border-white/10
            sm:mb-16
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF0000]" />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#FF0000]
                sm:text-[10px]
                sm:tracking-[0.3em]
              "
            >
              The Virat Standard
            </span>
          </div>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-black/25
              dark:text-white/25
              sm:text-[9px]
              sm:tracking-[0.3em]
            "
          >
            04 / 04
          </span>
        </div>

        {/* Main content */}
        <div
          className="
            grid gap-12
            lg:grid-cols-[1fr_0.45fr]
            lg:items-end
            lg:gap-16
          "
        >
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
                  text-[clamp(4rem,16vw,10rem)]
                  font-black
                  uppercase
                  leading-[0.78]
                  tracking-[-0.08em]
                  text-[#080808]
                  dark:text-white
                  sm:text-[clamp(5rem,13vw,10rem)]
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
                mt-8
                max-w-lg
                text-sm
                leading-6
                text-black/50
                dark:text-white/50
                sm:mt-10
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
                mb-5
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-black/30
                dark:text-white/30
                sm:mb-6
                sm:text-[9px]
              "
            >
              Start here
            </span>

            <a
              href="#"
              className="
                group
                flex items-center justify-between
                gap-4
                border-b
                border-black/15
                pb-4
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                transition-colors
                hover:border-[#FF0000]
                dark:border-white/15
                sm:pb-5
                sm:text-sm
                sm:tracking-[0.18em]
              "
            >
              <span>Shop all</span>

              <span
                className="
                  flex
                  h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[#FF0000]
                  text-white
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  sm:h-12 sm:w-12
                "
              >
                <ArrowUpRight
                  size={17}
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
                mt-5
                flex items-center gap-3
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-black/25
                dark:text-white/25
                sm:mt-6
                sm:text-[9px]
                sm:tracking-[0.3em]
              "
            >
              <MoveRight size={13} />
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
            mt-16
            grid
            border-y
            border-black/10
            dark:border-white/10
            sm:mt-20
            sm:grid-cols-3
          "
        >
          {/* Principle 01 */}
          <div
            className="
              border-b
              border-black/10
              px-0 py-5
              dark:border-white/10
              sm:border-b-0
              sm:border-r
              sm:px-6
              sm:py-6
              sm:first:pl-0
            "
          >
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#FF0000]
                sm:text-[9px]
              "
            >
              01
            </span>

            <p className="mt-2 text-sm font-semibold sm:mt-3">
              Built to perform
            </p>
          </div>

          {/* Principle 02 */}
          <div
            className="
              border-b
              border-black/10
              px-0 py-5
              dark:border-white/10
              sm:border-b-0
              sm:border-r
              sm:px-6
              sm:py-6
            "
          >
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#FF0000]
                sm:text-[9px]
              "
            >
              02
            </span>

            <p className="mt-2 text-sm font-semibold sm:mt-3">
              Designed for movement
            </p>
          </div>

          {/* Principle 03 */}
          <div
            className="
              px-0 py-5
              sm:px-6
              sm:py-6
              sm:pr-0
            "
          >
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#FF0000]
                sm:text-[9px]
              "
            >
              03
            </span>

            <p className="mt-2 text-sm font-semibold sm:mt-3">
              Made beyond the game
            </p>
          </div>
        </motion.div>

        {/* Bottom */}
        <div
          className="
            mt-5
            flex flex-col gap-2
            text-[8px]
            uppercase
            tracking-[0.22em]
            text-black/25
            dark:text-white/25
            sm:mt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-0
            sm:text-[9px]
            sm:tracking-[0.25em]
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