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
        relative
        overflow-hidden
        bg-[#F5F5F2]
        px-5
        py-20
        text-[#080808]
        transition-colors
        duration-300
        dark:bg-[#050505]
        dark:text-white

        sm:px-8
        sm:py-24

        lg:px-10
        lg:py-32
      "
    >
      {/* =====================================================
          LARGE SECTION NUMBER
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-15px]
          top-1/2
          z-0
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
        03
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-14 lg:mb-20">

          {/* TOP META */}

          <div
            className="
              flex
              flex-col
              gap-4
              border-b
              border-black/10
              pb-5

              sm:flex-row
              sm:items-center
              sm:justify-between

              dark:border-white/10
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-[#FF0000]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#FF0000]
                "
              >
                Cricket Collection
              </span>
            </div>

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-black/30
                dark:text-white/30
              "
            >
              Collection 02 / 2026
            </span>
          </div>

          {/* =================================================
              MAIN HEADING
          ================================================== */}

          <div className="mt-7 overflow-hidden sm:mt-8">
            <motion.h2
              initial={{
                y: "100%",
              }}
              whileInView={{
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                text-[clamp(3.7rem,13vw,8rem)]
                font-black
                uppercase
                leading-[0.8]
                tracking-[-0.075em]
                text-[#080808]
                dark:text-white
              "
            >
              Cricket.
              <br />
              <span className="text-[#FF0000]">
                Redefined.
              </span>
            </motion.h2>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <div
            className="
              mt-7
              flex
              flex-col
              gap-5

              sm:mt-8
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="
                max-w-lg
                text-sm
                leading-6
                text-black/50
                dark:text-white/50

                sm:text-base
                sm:leading-7
              "
            >
              Performance-driven cricket wear built for movement,
              confidence and the demands of the game.
            </motion.p>

            <span
              className="
                shrink-0
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-black/30
                dark:text-white/30
              "
            >
              06 Pieces / Performance
            </span>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div
          className="
            grid
            items-center
            gap-12

            lg:grid-cols-[0.7fr_1.3fr]
            lg:gap-20
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <motion.div
            style={{ y: textY }}
            className="
              relative
              z-10
              max-w-md
            "
          >
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-black/30
                dark:text-white/30
              "
            >
              Built for the game
            </span>

            <div className="mt-5 overflow-hidden sm:mt-6">
              <motion.h3
                initial={{
                  y: "100%",
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(3.2rem,12vw,6rem)]
                  font-black
                  uppercase
                  leading-[0.8]
                  tracking-[-0.07em]
                  text-[#080808]
                  dark:text-white
                "
              >
                Own
                <br />
                the
                <br />
                <span className="text-[#FF0000]">
                  game.
                </span>
              </motion.h3>
            </div>

            <motion.a
              href="#"
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.25,
              }}
              className="
                group
                mt-8
                flex
                w-fit
                items-center
                gap-4
                border-b
                border-black/20
                pb-3
                text-xs
                font-bold
                uppercase
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
                  transition-transform
                  duration-300
                  group-hover:translate-x-2
                  group-hover:text-[#FF0000]
                "
              />
            </motion.a>
          </motion.div>

          {/* =================================================
              IMAGE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              w-full
              max-w-2xl
              justify-self-center
              lg:max-w-none
            "
          >
            {/* =================================================
                RED CORNER
            ================================================== */}

            <div
              className="
                absolute
                -left-2
                -top-2
                z-20
                h-16
                w-16
                border-l
                border-t
                border-[#FF0000]

                sm:-left-4
                sm:-top-4
                sm:h-24
                sm:w-24

                lg:-left-5
                lg:-top-5
                lg:h-28
                lg:w-28
              "
            />

            {/* =================================================
                IMAGE
            ================================================== */}

            <div
              className="
                relative
                aspect-[4/5]
                w-full
                overflow-hidden
                bg-[#E5E5E2]
                dark:bg-[#0D0D0D]
              "
            >
              <motion.img
                src={cricketCollectionImage}
                alt="Virat cricket collection"
                draggable={false}
                style={{
                  y: imageY,
                }}
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
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/65
                  via-black/10
                  to-transparent
                "
              />

              {/* =================================================
                  TOP LABEL
              ================================================== */}

              <div
                className="
                  absolute
                  left-5
                  top-5

                  sm:left-6
                  sm:top-6
                "
              >
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-white/70

                    sm:text-[9px]
                  "
                >
                  Virat / Cricket
                </span>
              </div>

              {/* =================================================
                  BOTTOM IMAGE TEXT
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5

                  sm:bottom-6
                  sm:left-6
                "
              >
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.3em]
                    text-white/60

                    sm:text-[9px]
                  "
                >
                  Built to perform
                </p>

                <p
                  className="
                    mt-1
                    text-lg
                    font-black
                    uppercase
                    tracking-[-0.04em]
                    text-white

                    sm:text-xl
                  "
                >
                  Every ball.
                </p>
              </div>
            </div>

            {/* =================================================
                FLOATING CTA
            ================================================== */}

            <a
              href="#"
              aria-label="Explore cricket collection"
              className="
                group
                absolute
                -bottom-4
                -right-2
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#FF0000]
                text-white
                transition-transform
                duration-500
                hover:scale-110

                sm:-bottom-5
                sm:-right-4
                sm:h-20
                sm:w-20

                lg:-right-5
                lg:h-24
                lg:w-24
              "
            >
              <ArrowUpRight
                size={22}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1

                  sm:size-[25px]
                "
              />
            </a>
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM LINE
        ====================================================== */}

        <div
          className="
            mt-16
            flex
            items-center
            justify-between
            border-t
            border-black/10
            pt-5
            text-[9px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-black/30
            dark:border-white/10
            dark:text-white/30

            sm:mt-20

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