import { ArrowUpRight, MoveDown } from "lucide-react";
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

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-2%", "8%"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.02, 1.08]
  );

  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 1, 0.75]
  );

  return (
    <section
      ref={heroRef}
      className="
  relative min-h-[100svh]
  overflow-hidden
  bg-[#F5F5F2]
  text-[#080808]
  transition-colors duration-500
  dark:bg-[#050505]
  dark:text-white
"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">

        {/* NAVY GLOW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            absolute right-[-15%] top-[5%]
            h-[550px] w-[550px]
            rounded-full
            bg-[#000045]/[0.07]
            blur-[150px]
            dark:bg-[#000045]/40
          "
        />

        {/* RED GLOW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 0.5,
          }}
          className="
            absolute bottom-[-20%] left-[10%]
            h-[400px] w-[400px]
            rounded-full
            bg-[#FF0000]/[0.025]
            blur-[160px]
            dark:bg-[#FF0000]/[0.08]
          "
        />

        {/* MOVING BACKGROUND TEXT — ROW 1 */}
        <div className="absolute left-0 top-[42%] w-full -translate-y-1/2 overflow-hidden">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-33.333%" }}
            transition={{
              duration: 38,
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

        {/* MOVING BACKGROUND TEXT — ROW 2 */}
        <div className="absolute left-0 top-[63%] w-full -translate-y-1/2 overflow-hidden">
          <motion.div
            initial={{ x: "-33.333%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 45,
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

      {/* TOP RED LINE */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          absolute left-0 top-20 z-20
          h-px w-full origin-left
          bg-gradient-to-r
          from-[#FF0000]
          via-[#FF0000]/40
          to-transparent
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 pt-20 lg:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_0.95fr]">

          {/* LEFT CONTENT */}
          <div className="relative z-20">

            {/* EYEBROW */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mb-6 text-xs font-semibold
                uppercase tracking-[0.35em]
                text-[#FF0000]
              "
            >
              Sportswear / Cricket / Lifestyle
            </motion.p>

            {/* PLAY */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(5rem,11vw,10rem)]
                  font-black uppercase
                  leading-[0.78]
                  tracking-[-0.075em]
                "
              >
                Play
              </motion.h1>
            </div>

            {/* HARDER */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.58,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(5rem,11vw,10rem)]
                  font-black uppercase
                  leading-[0.78]
                  tracking-[-0.075em]
                "
              >
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-[#FF0000]"
                >
                  Harder
                </motion.span>
                .
              </motion.h1>
            </div>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 1.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mt-10 max-w-md
                text-sm leading-7
                text-black/60
                dark:text-white/65
                sm:text-base
              "
            >
              Performance wear built for the game and designed for every day.
              Discover cricket and sportswear made to move with you.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.2,
                ease: [0.16, 1, 1, 1],
              }}
              className="mt-8"
            >
              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="
                  group relative flex items-center
                  gap-4 overflow-hidden
                  bg-[#FF0000]
                  px-7 py-4
                  text-sm font-bold
                  uppercase tracking-wider
                  text-white
                "
              >
                {/* HOVER FILL */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  variants={{
                    hover: { scaleX: 1 },
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    absolute inset-0 origin-left
                    bg-white
                  "
                />

                <span
                  className="
                    relative z-10
                    transition-colors duration-300
                    group-hover:text-black
                  "
                >
                  Shop now
                </span>

                <motion.span
                  variants={{
                    hover: { x: 4, y: -4 },
                  }}
                  transition={{ duration: 0.25 }}
                  className="
                    relative z-10
                    transition-colors duration-300
                    group-hover:text-black
                  "
                >
                  <ArrowUpRight size={18} />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
              scale: 1.04,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.16, 1, 1, 1],
            }}
            className="relative mx-auto w-full max-w-[580px]"
          >

            {/* RED CORNER */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 1,
              }}
              className="
                absolute -right-3 -top-3 z-30
                h-24 w-24
                border-r border-t
                border-[#FF0000]
              "
            />

            {/* IMAGE FRAME */}
            <div className="relative aspect-[4/5] overflow-hidden bg-white">

              {/* PARALLAX IMAGE */}
              <motion.img
                src={heroImage}
                alt="VIRAT cricket player"
                style={{
                  y: imageY,
                  scale: imageScale,
                  opacity: imageOpacity,
                }}
                className="
                  absolute inset-0
                  h-full w-full
                  object-contain object-center
                "
              />

              {/* SUBTLE IMAGE SHADOW */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t
                  from-black/10
                  via-transparent
                  to-transparent
                "
              />

              {/* IMAGE LABEL */}
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
                className="absolute bottom-6 left-6 z-20"
              >
                <span
                  className="
                    text-[10px] font-medium
                    uppercase tracking-[0.3em]
                    text-black/45
                  "
                >
                  VIRAT
                </span>

                <p
                  className="
                    mt-1 text-xs uppercase
                    tracking-widest text-black/70
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
                x: 10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 1.4,
              }}
              className="
                absolute -right-8 bottom-16
                hidden rotate-90
                text-[9px] uppercase
                tracking-[0.4em]
                text-black/30
                dark:text-white/30
                lg:block
              "
            >
              Cricket / Performance
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.8,
          duration: 0.6,
        }}
        className="
          absolute bottom-7 left-6 z-20
          flex items-center gap-3
          lg:left-10
        "
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MoveDown
            size={14}
            strokeWidth={1}
            className="text-black/35 dark:text-white/35"
          />
        </motion.div>

        <span
          className="
            text-[10px] uppercase
            tracking-[0.3em]
            text-black/35
            dark:text-white/35
          "
        >
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
};

const BackgroundText = () => {
  return (
    <div className="flex items-center">
      <span
        className="
          mx-10 text-[clamp(5rem,10vw,10rem)]
          font-black uppercase leading-none
          tracking-[-0.08em]
          text-[#9A9A96]/40
          dark:text-[#5A5A5A]/45
        "
      >
        VIRAT
      </span>

      <span
        className="
          mx-10 text-[clamp(5rem,10vw,10rem)]
          font-black uppercase leading-none
          tracking-[-0.08em]
          text-[#9A9A96]/40
          dark:text-[#5A5A5A]/45
        "
      >
        PLAY HARDER
      </span>

      <span
        className="
          mx-10 text-[clamp(5rem,10vw,10rem)]
          font-black uppercase leading-none
          tracking-[-0.08em]
          text-[#9A9A96]/40
          dark:text-[#5A5A5A]/45
        "
      >
        CRICKET
      </span>

      <span
        className="
          mx-10 text-[clamp(5rem,10vw,10rem)]
          font-black uppercase leading-none
          tracking-[-0.08em]
          text-[#9A9A96]/40
          dark:text-[#5A5A5A]/45
        "
      >
        VIRAT
      </span>
    </div>
  );
};

export default Hero;