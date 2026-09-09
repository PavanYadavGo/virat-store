import {
  ArrowUpRight,
  MoveDown,
  Zap,
} from "lucide-react";

import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import { useRef } from "react";

import heroImage from "../../assets/Hero.png";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* =========================================================
     SCROLL MOTION
  ========================================================= */

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-1%", "10%"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.03, 1.11]
  );

  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 1, 0.6]
  );

  const patternY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-6%"]
  );

  const patternScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.08]
  );

  return (
    <section
      ref={heroRef}
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[#F5F5F2]
        text-[#080808]
        transition-colors
        duration-500
        dark:bg-[#050505]
        dark:text-white
      "
    >

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* =================================================
            DAMASCUS STEEL
        ================================================= */}

        <motion.div
          style={{
            y: patternY,
            scale: patternScale,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            absolute
            -inset-[8%]
            overflow-hidden
            opacity-[0.22]
            dark:opacity-[0.14]
          "
        >

          <svg
            className="
              h-full
              w-full
              overflow-visible
            "
            viewBox="0 0 1600 1000"
            preserveAspectRatio="none"
          >

            <defs>

              {/* ===========================================
                  DAMASCUS BASE PATTERN
              =========================================== */}

              <pattern
                id="damascusPattern"
                width="260"
                height="260"
                patternUnits="userSpaceOnUse"
              >

                {/* Large flowing layers */}

                <path
                  d="
                    M-80 40
                    C20 130 80 210 190 190
                    C250 180 290 120 340 60
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="
                    M-80 60
                    C20 150 80 230 190 210
                    C250 200 290 140 340 80
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="
                    M-80 90
                    C20 180 90 255 200 230
                    C255 218 300 165 340 110
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                {/* Reverse flow */}

                <path
                  d="
                    M340 210
                    C270 145 235 80 145 70
                    C70 62 25 100 -60 155
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="
                    M340 235
                    C270 170 230 105 145 95
                    C70 87 15 125 -60 180
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />

                {/* Fine forged-metal layers */}

                <path
                  d="
                    M-50 20
                    C40 100 90 170 185 160
                    C245 153 280 100 330 35
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />

                <path
                  d="
                    M-50 120
                    C40 200 95 270 190 250
                    C250 238 285 190 330 135
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />

                <path
                  d="
                    M-30 145
                    C40 210 100 245 165 235
                    C220 227 270 190 315 150
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                />

              </pattern>


              {/* ===========================================
                  DISTORTION
              =========================================== */}

              <filter
                id="damascusWarp"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >

                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.008 0.028"
                  numOctaves="2"
                  seed="12"
                  result="noise"
                />

                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="28"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />

              </filter>


              {/* ===========================================
                  SILVER GLOW
              =========================================== */}

              <filter
                id="steelGlow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >

                <feGaussianBlur
                  stdDeviation="2.5"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>

              </filter>


              {/* ===========================================
                  EDGE FADE
              =========================================== */}

              <radialGradient
                id="steelFade"
                cx="50%"
                cy="45%"
                r="70%"
              >

                <stop
                  offset="0%"
                  stopColor="white"
                  stopOpacity="1"
                />

                <stop
                  offset="55%"
                  stopColor="white"
                  stopOpacity="0.75"
                />

                <stop
                  offset="100%"
                  stopColor="white"
                  stopOpacity="0"
                />

              </radialGradient>

              <mask id="steelMask">
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#steelFade)"
                />
              </mask>

            </defs>


            {/* ===========================================
                DAMASCUS LAYER
            =========================================== */}

            <rect
              width="100%"
              height="100%"
              fill="url(#damascusPattern)"
              mask="url(#steelMask)"
              filter="url(#damascusWarp)"
              className="
                text-black/[0.20]
                dark:text-white/[0.28]
              "
            />

          </svg>

        </motion.div>


        {/* =================================================
            DAMASCUS SILVER SHIMMER
        ================================================= */}

        <motion.div
          animate={{
            x: ["-120%", "120%"],
            opacity: [0, 0.12, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[-30%]
            top-[-20%]
            h-[140%]
            w-[35%]
            rotate-[18deg]
            bg-gradient-to-r
            from-transparent
            via-white
            to-transparent
            blur-[35px]
            opacity-20
            dark:opacity-10
          "
        />


        {/* =================================================
            RED FORGED-STEEL GLOW
        ================================================= */}

        <motion.div
          animate={{
            opacity: [0.04, 0.12, 0.04],
            scale: [0.9, 1.08, 0.9],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[15%]
            top-[25%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#FF0000]
            blur-[180px]
            dark:opacity-20
          "
        />


        {/* =================================================
            NAVY ATMOSPHERE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            absolute
            right-[-15%]
            top-[5%]
            h-[550px]
            w-[550px]
            rounded-full
            bg-[#000045]/[0.06]
            blur-[150px]
            dark:bg-[#000045]/35
          "
        />


        {/* =================================================
            MOVING BACKGROUND TEXT
        ================================================= */}

        <div
          className="
            absolute
            left-0
            top-[42%]
            w-full
            -translate-y-1/2
            overflow-hidden
          "
        >

          <motion.div
            initial={{
              x: "0%",
            }}
            animate={{
              x: "-33.333%",
            }}
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max whitespace-nowrap"
          >

            <BackgroundText />
            <BackgroundText />
            <BackgroundText />

          </motion.div>

        </div>


        <div
          className="
            absolute
            left-0
            top-[68%]
            w-full
            -translate-y-1/2
            overflow-hidden
          "
        >

          <motion.div
            initial={{
              x: "-33.333%",
            }}
            animate={{
              x: "0%",
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max whitespace-nowrap"
          >

            <BackgroundText />
            <BackgroundText />
            <BackgroundText />

          </motion.div>

        </div>

      </div>


      {/* =====================================================
          TOP RED LINE
      ===================================================== */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          absolute
          left-0
          top-20
          z-30
          h-px
          w-full
          origin-left
          bg-gradient-to-r
          from-[#FF0000]
          via-[#FF0000]/50
          to-transparent
        "
      />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[100svh]
          max-w-7xl
          items-center
          px-6
          pt-20
          lg:px-10
        "
      >

        <div
          className="
            grid
            w-full
            items-center
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative z-20">

            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
              className="
                mb-6
                flex
                items-center
                gap-3
                text-xs
                font-bold
                uppercase
                tracking-[0.32em]
                text-[#FF0000]
              "
            >

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#FF0000]
                "
              />

              Sportswear

              <span className="text-black/20 dark:text-white/20">
                /
              </span>

              Cricket

              <span className="text-black/20 dark:text-white/20">
                /
              </span>

              Lifestyle

            </motion.div>


            {/* PLAY */}

            <div className="overflow-hidden">

              <motion.h1
                initial={{
                  y: "110%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(5rem,10vw,9rem)]
                  font-black
                  uppercase
                  leading-[0.78]
                  tracking-[-0.08em]
                "
              >
                Play
              </motion.h1>

            </div>


            {/* HARDER */}

            <div className="overflow-hidden">

              <motion.h1
                initial={{
                  y: "110%",
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.58,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(5rem,10vw,9rem)]
                  font-black
                  uppercase
                  leading-[0.78]
                  tracking-[-0.08em]
                "
              >

                <span className="text-[#FF0000]">
                  Harder
                </span>

                .

              </motion.h1>

            </div>


            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 1.05,
              }}
              className="
                mt-10
                max-w-md
                text-sm
                leading-7
                text-black/60
                dark:text-white/60
                sm:text-base
              "
            >
              Performance wear built for the game
              and designed for every day. Discover
              cricket and sportswear made to move
              with you.
            </motion.p>


            {/* CTA */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 1.2,
              }}
              className="mt-8"
            >

              <motion.button
                whileHover="hover"
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-4
                  overflow-hidden
                  bg-[#FF0000]
                  px-7
                  py-4
                  text-sm
                  font-bold
                  uppercase
                  tracking-wider
                  text-white
                "
              >

                <motion.span
                  initial={{
                    scaleX: 0,
                  }}
                  variants={{
                    hover: {
                      scaleX: 1,
                    },
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    absolute
                    inset-0
                    origin-left
                    bg-black
                  "
                />

                <span className="relative z-10">
                  Shop now
                </span>

                <motion.span
                  variants={{
                    hover: {
                      x: 5,
                      y: -5,
                    },
                  }}
                  className="relative z-10"
                >
                  <ArrowUpRight size={18} />
                </motion.span>

              </motion.button>

            </motion.div>


            {/* MICRO DETAIL */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.5,
                duration: 0.8,
              }}
              className="
                mt-8
                flex
                items-center
                gap-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-black/35
                dark:text-white/30
              "
            >

              <Zap
                size={12}
                className="text-[#FF0000]"
              />

              Engineered for movement

            </motion.div>

          </div>


          {/* =================================================
              PLAYER / IMAGE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.25,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[620px]
            "
          >

            {/* PLAYER GLOW */}

            <motion.div
              animate={{
                opacity: [0.08, 0.18, 0.08],
                scale: [0.9, 1.08, 0.9],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                left-[28%]
                top-[25%]
                h-[320px]
                w-[320px]
                rounded-full
                bg-[#FF0000]/20
                blur-[120px]
                dark:bg-[#FF0000]/15
              "
            />


            {/* OUTER FRAME */}

            <motion.div
              style={{
                y: patternY,
              }}
              className="
                absolute
                inset-[4%]
                border
                border-black/[0.08]
                dark:border-white/[0.08]
              "
            />


            {/* RED TOP CORNER */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 1,
              }}
              className="
                absolute
                -right-3
                -top-3
                z-30
                h-24
                w-24
                border-r
                border-t
                border-[#FF0000]
              "
            />


            {/* RED BOTTOM CORNER */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 1.1,
              }}
              className="
                absolute
                -bottom-3
                -left-3
                z-30
                h-16
                w-16
                border-b
                border-l
                border-[#FF0000]/50
              "
            />


            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                bg-white
                dark:bg-[#111]
              "
            >

              {/* FLOAT */}

              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, 0.18, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  inset-0
                  will-change-transform
                "
              >

                <motion.img
                  src={heroImage}
                  alt="VIRAT sportswear athlete"
                  style={{
                    y: imageY,
                    scale: imageScale,
                    opacity: imageOpacity,
                  }}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-contain
                    object-center
                    will-change-transform
                  "
                />

              </motion.div>


              {/* RED SPEED TRAIL */}

              <motion.div
                animate={{
                  x: ["-130%", "130%"],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 1.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  left-[-20%]
                  top-[52%]
                  z-10
                  h-[2px]
                  w-[140%]
                  rotate-[-13deg]
                  bg-gradient-to-r
                  from-transparent
                  via-[#FF0000]
                  to-transparent
                  blur-[1px]
                "
              />


              {/* SECOND SPEED TRAIL */}

              <motion.div
                animate={{
                  x: ["-120%", "140%"],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2.7,
                  delay: 2,
                  repeat: Infinity,
                  repeatDelay: 6,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  left-[-20%]
                  top-[58%]
                  z-10
                  h-px
                  w-[140%]
                  rotate-[-13deg]
                  bg-gradient-to-r
                  from-transparent
                  via-[#FF0000]
                  to-transparent
                  blur-[2px]
                "
              />


              {/* LIGHT SWEEP */}

              <motion.div
                animate={{
                  x: ["-160%", "160%"],
                  opacity: [0, 0.16, 0],
                }}
                transition={{
                  duration: 1.8,
                  delay: 2.2,
                  repeat: Infinity,
                  repeatDelay: 7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-y-[-30%]
                  left-[-30%]
                  z-20
                  w-[18%]
                  rotate-[18deg]
                  bg-gradient-to-r
                  from-transparent
                  via-[#FF0000]
                  to-transparent
                  blur-xl
                "
              />


              {/* IMPACT GLOW */}

              <motion.div
                animate={{
                  opacity: [0, 0.14, 0],
                  scale: [0.7, 1.15, 1.35],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  left-[48%]
                  top-[48%]
                  z-10
                  h-40
                  w-40
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#FF0000]/20
                  blur-[75px]
                "
              />


              {/* VIGNETTE */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-20
                  bg-gradient-to-t
                  from-black/10
                  via-transparent
                  to-transparent
                "
              />


              {/* LABEL */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 1.35,
                }}
                className="
                  absolute
                  bottom-6
                  left-6
                  z-30
                "
              >

                <span
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-black/40
                  "
                >
                  VIRAT
                </span>

                <p
                  className="
                    mt-1
                    text-xs
                    uppercase
                    tracking-widest
                    text-black/70
                  "
                >
                  Built for the game
                </p>

              </motion.div>

            </div>


            {/* SIDE LABEL */}

            <motion.div
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 1.4,
              }}
              className="
                absolute
                -right-9
                bottom-20
                hidden
                rotate-90
                text-[9px]
                uppercase
                tracking-[0.4em]
                text-black/30
                dark:text-white/30
                lg:block
              "
            >
              Cricket / Performance
            </motion.div>


            {/* RED PULSE */}

            <motion.div
              animate={{
                scale: [1, 1.8],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeOut",
              }}
              className="
                pointer-events-none
                absolute
                -right-[5px]
                -top-[5px]
                z-40
                h-2
                w-2
                rounded-full
                bg-[#FF0000]
              "
            />

          </motion.div>

        </div>

      </div>


      {/* =====================================================
          SCROLL
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.8,
          duration: 0.7,
        }}
        className="
          absolute
          bottom-7
          left-6
          z-30
          flex
          items-center
          gap-3
          lg:left-10
        "
      >

        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >

          <MoveDown
            size={14}
            strokeWidth={1}
            className="
              text-black/35
              dark:text-white/35
            "
          />

        </motion.div>

        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-black/35
            dark:text-white/35
          "
        >
          Scroll to explore
        </span>

      </motion.div>


      {/* =====================================================
          INDEX
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 2,
        }}
        className="
          absolute
          bottom-8
          right-6
          z-30
          hidden
          items-center
          gap-3
          lg:flex
        "
      >

        <span
          className="
            h-px
            w-8
            bg-[#FF0000]
          "
        />

        <span
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.25em]
            text-black/40
            dark:text-white/40
          "
        >
          01 / 03
        </span>

      </motion.div>

    </section>
  );
};


/* =========================================================
   BACKGROUND TEXT
========================================================= */

const BackgroundText = () => {
  return (
    <div className="flex items-center">

      <span
        className="
          mx-10
          text-[clamp(5rem,10vw,10rem)]
          font-black
          uppercase
          leading-none
          tracking-[-0.08em]
          text-[#777773]/20
          dark:text-[#777777]/20
        "
      >
        VIRAT
      </span>

      <span
        className="
          mx-10
          text-[clamp(5rem,10vw,10rem)]
          font-black
          uppercase
          leading-none
          tracking-[-0.08em]
          text-[#777773]/20
          dark:text-[#777777]/20
        "
      >
        PLAY HARDER
      </span>

      <span
        className="
          mx-10
          text-[clamp(5rem,10vw,10rem)]
          font-black
          uppercase
          leading-none
          tracking-[-0.08em]
          text-[#777773]/20
          dark:text-[#777777]/20
        "
      >
        CRICKET
      </span>

    </div>
  );
};

export default Hero;