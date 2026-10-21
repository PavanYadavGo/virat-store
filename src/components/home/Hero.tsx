import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// import banner0 from "../../assets/hero/banner-0.webp";
// import banner1 from "../../assets/hero/banner-1.webp";
// import banner2 from "../../assets/hero/banner-2.webp";
// import banner3 from "../../assets/hero/banner-3.webp";
// import banner4 from "../../assets/hero/banner-4.webp";
import header01 from "../../assets/hero/header-1.png";
import header02 from "../../assets/hero/header-2.png";
import header03 from "../../assets/hero/header-3.png";
import header04 from "../../assets/hero/header-4.png";
import header05 from "../../assets/hero/header-5.png";

const slides = [
  // banner0,
  // banner1,
  // banner2,
  // banner3,
  // banner4,
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
    mt-[68px]
    w-full
    aspect-[1600/666]
    overflow-hidden
    bg-black
    sm:mt-20
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
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: {
                duration: 0.8,
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            <img
              src={slide}
              alt={`Virat Sportswear Campaign Banner ${current + 1}`}
              draggable={false}
              className="
                h-full
                w-full
                select-none
                object-contain
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
  top-0
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
          bottom-2.5
          right-3
          z-30
          flex
          items-center
          gap-2.5
          sm:bottom-6
          sm:right-8
          sm:gap-5
          lg:right-10
        "
      >
        {/* Counter */}

        <div
          className="
            flex
            items-baseline
            gap-1
            font-mono
            text-[10px]
            sm:gap-1.5
            sm:text-xs
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
                h-6
                w-7
                overflow-hidden
                md:h-8
                md:w-10
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
              h-7
              w-7
              items-center
              justify-center
              border
              border-white/20
              text-white/70
              transition-all
              hover:border-white
              hover:bg-white
              hover:text-black
              sm:h-8
              sm:w-8
              lg:h-9
              lg:w-9
            "
          >
            <ChevronLeft size={15} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              border
              border-white/20
              text-white/70
              transition-all
              hover:border-white
              hover:bg-white
              hover:text-black
              sm:h-8
              sm:w-8
              lg:h-9
              lg:w-9
            "
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* =====================================================
          SIDE BRAND
      ====================================================== */}

      <div
        className="
          absolute
          bottom-6
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