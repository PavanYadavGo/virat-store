import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import header01 from "../../assets/hero/header-1.png";
import header02 from "../../assets/hero/header-2.png";
import header03 from "../../assets/hero/header-3.png";
import header04 from "../../assets/hero/header-4.png";
import header05 from "../../assets/hero/header-5.png";

const slides = [
  header01,
  header02,
  header03,
  header04,
  header05,
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
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
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
              src={slide}
              alt=""
              draggable={false}
              className="
                h-full
                w-full
                select-none
                object-cover
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
          opacity: [0.08, 0.16, 0.08],
          scale: [1, 1.1, 1],
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
          bg-[#FF0000]/10
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

          <span className="text-white/30">/</span>

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
                setDirection(index > current ? 1 : -1);
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
                  scaleX: index === current ? 1 : 0,
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