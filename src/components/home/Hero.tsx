import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import header01 from "../../assets/hero/header-1.png";
import header02 from "../../assets/hero/header-2.png";
import header03 from "../../assets/hero/header-3.png";
import header04 from "../../assets/hero/header-4.png";

const slides = [
  {
    image: header01,
    eyebrow: "VIRAT / 01",
    title: "Play",
    accent: "Harder.",
  },
  {
    image: header02,
    eyebrow: "VIRAT / 02",
    title: "Own",
    accent: "The Game.",
  },
  {
    image: header03,
    eyebrow: "VIRAT / 03",
    title: "Built",
    accent: "To Move.",
  },
  {
    image: header04,
    eyebrow: "VIRAT / 04",
    title: "Never",
    accent: "Settle.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  /*
   * Automatic slideshow
   */
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-black
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND SLIDESHOW
      ====================================================== */}

      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.03,
            }}
            transition={{
              opacity: {
                duration: 1.2,
                ease: "easeInOut",
              },
              scale: {
                duration: 7,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt=""
              draggable={false}
              className="
                h-full
                w-full
                object-cover
                select-none
              "
            />

            {/* Image darkening */}

            <div
              className="
                absolute
                inset-0
                bg-black/35
              "
            />

            {/* Bottom gradient */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/20
                to-black/10
              "
            />

            {/* Left gradient */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black/65
                via-black/20
                to-transparent
              "
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================================
          SUBTLE RED LIGHT
      ====================================================== */}

      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-32
          top-1/4
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#FF0000]/20
          blur-[150px]
        "
      />

      {/* =====================================================
          TOP NAV LINE
      ====================================================== */}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.2,
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
          via-white/40
          to-transparent
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-[100svh]
          max-w-7xl
          items-end
          px-5
          pb-28
          pt-32
          sm:px-8
          sm:pb-32
          lg:px-10
          lg:pb-28
        "
      >
        <div className="w-full">

          {/* =================================================
              EYEBROW
          ================================================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={`eyebrow-${current}`}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                mb-5
                flex
                items-center
                gap-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white/65
                sm:text-xs
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF0000]" />

              {slide.eyebrow}
            </motion.div>
          </AnimatePresence>

          {/* =================================================
              TITLE
          ================================================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${current}`}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -30,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1
                className="
                  max-w-4xl
                  text-[clamp(4.5rem,13vw,10rem)]
                  font-black
                  uppercase
                  leading-[0.78]
                  tracking-[-0.075em]
                "
              >
                {slide.title}
                <br />

                <span className="text-[#FF0000]">
                  {slide.accent}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* =================================================
              BOTTOM CONTENT
          ================================================= */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-7
              sm:mt-10
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.6,
              }}
              className="
                max-w-sm
                text-sm
                leading-6
                text-white/65
                sm:text-base
              "
            >
              Performance wear built for cricket,
              sports and everything beyond the game.
            </motion.p>

            {/* CTA */}

            <motion.button
              whileHover="hover"
              whileTap={{
                scale: 0.96,
              }}
              className="
                group
                flex
                w-fit
                items-center
                gap-4
                border
                border-white/30
                bg-white/[0.06]
                px-6
                py-3.5
                text-xs
                font-bold
                uppercase
                tracking-wider
                backdrop-blur-md
                transition-colors
                hover:border-white
                hover:bg-white
                hover:text-black
                sm:px-7
                sm:py-4
              "
            >
              Shop collection

              <motion.span
                variants={{
                  hover: {
                    x: 5,
                    y: -5,
                  },
                }}
              >
                <ArrowUpRight size={17} />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* =====================================================
          SLIDE CONTROLS
      ====================================================== */}

      <div
        className="
          absolute
          bottom-7
          right-5
          z-30
          flex
          items-center
          gap-5
          sm:right-8
          lg:right-10
        "
      >
        {/* Counter */}

        <div
          className="
            flex
            items-baseline
            gap-1.5
            font-mono
            text-xs
          "
        >
          <span className="font-bold text-white">
            {String(current + 1).padStart(2, "0")}
          </span>

          <span className="text-white/30">
            /
          </span>

          <span className="text-white/40">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Progress bars */}

        <div className="hidden gap-1.5 sm:flex">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(
                  index > current ? 1 : -1
                );
                setCurrent(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
              className="
                relative
                h-8
                w-10
                overflow-hidden
              "
            >
              <span
                className="
                  absolute
                  left-0
                  top-1/2
                  h-px
                  w-full
                  -translate-y-1/2
                  bg-white/25
                "
              />

              <motion.span
                animate={{
                  scaleX:
                    index === current ? 1 : 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  absolute
                  left-0
                  top-1/2
                  h-px
                  w-full
                  origin-left
                  -translate-y-1/2
                  bg-[#FF0000]
                "
              />
            </button>
          ))}
        </div>

        {/* Arrows */}

        <div className="flex gap-1">
          <button
            onClick={previousSlide}
            aria-label="Previous slide"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              border
              border-white/20
              text-white/70
              transition-all
              hover:border-white
              hover:bg-white
              hover:text-black
            "
          >
            <ChevronLeft size={17} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              border
              border-white/20
              text-white/70
              transition-all
              hover:border-white
              hover:bg-white
              hover:text-black
            "
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {/* =====================================================
          SIDE BRAND
      ====================================================== */}

      <div
        className="
          absolute
          bottom-8
          left-5
          z-30
          hidden
          -rotate-90
          origin-left
          text-[9px]
          uppercase
          tracking-[0.4em]
          text-white/35
          sm:left-8
          lg:block
        "
      >
        VIRAT / SPORTSWEAR
      </div>
    </section>
  );
};

export default Hero;