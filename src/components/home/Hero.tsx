import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRef } from "react";

import heroImage from "../../assets/Hero.png";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.08]
  );
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 1, 0]
  );

  const topoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const topoScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.12]
  );

  return (
    <section
      ref={sectionRef}
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
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Very subtle center glow */}
        <div
          className="
            absolute left-1/2 top-[45%]
            h-[600px] w-[600px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[#FF0000]/[0.025]
            blur-[120px]
            dark:bg-[#FF0000]/[0.07]
          "
        />

        {/* =====================================================
            TOPOGRAPHIC CONTOUR MAP
        ====================================================== */}

        <motion.svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          style={{
            y: topoY,
            scale: topoScale,
          }}
          className="
            absolute left-1/2 top-1/2
            h-[125%] w-[125%]
            -translate-x-1/2 -translate-y-1/2
            opacity-[0.14]
            dark:opacity-[0.22]
          "
          animate={{
            rotate: [0, 1.2, 0, -1.2, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <defs>

            {/* Fade the terrain towards the edges */}
            <radialGradient id="topoFade">
              <stop
                offset="0%"
                stopColor="white"
                stopOpacity="1"
              />

              <stop
                offset="55%"
                stopColor="white"
                stopOpacity="0.85"
              />

              <stop
                offset="100%"
                stopColor="white"
                stopOpacity="0"
              />
            </radialGradient>

            <mask id="topoMask">
              <rect
                width="1200"
                height="900"
                fill="url(#topoFade)"
              />
            </mask>

            {/* Slight glow for contour lines */}
            <filter
              id="topoGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                stdDeviation="2.2"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

          </defs>

          <g
            mask="url(#topoMask)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            vectorEffect="non-scaling-stroke"
            filter="url(#topoGlow)"
            className="
              text-black
              dark:text-white
            "
          >

            {/* =================================================
                MAIN LARGE ELEVATION
            ================================================== */}

            <path d="
              M 90 420
              C 130 250 300 130 505 155
              C 690 75 930 145 1070 300
              C 1180 425 1090 620 940 715
              C 760 830 510 815 315 735
              C 135 660 45 555 90 420 Z
            " />

            <path d="
              M 145 425
              C 185 290 325 190 505 205
              C 675 130 875 190 1000 320
              C 1090 420 1010 575 875 660
              C 720 755 515 755 350 690
              C 200 630 110 535 145 425 Z
            " />

            <path d="
              M 205 430
              C 240 325 355 250 510 260
              C 650 205 820 245 925 345
              C 1010 425 945 535 825 610
              C 690 690 535 690 390 635
              C 265 590 175 510 205 430 Z
            " />

            <path d="
              M 270 430
              C 300 350 390 295 515 310
              C 635 270 765 295 855 365
              C 925 420 875 500 775 560
              C 665 625 545 625 430 585
              C 330 550 245 490 270 430 Z
            " />

            <path d="
              M 330 430
              C 350 365 420 330 515 345
              C 610 315 710 345 780 395
              C 830 435 785 485 710 525
              C 620 575 540 570 460 545
              C 380 520 310 475 330 430 Z
            " />

            <path d="
              M 390 430
              C 410 385 455 360 520 375
              C 590 350 665 370 715 405
              C 755 435 720 470 665 500
              C 600 535 545 530 485 510
              C 430 492 375 465 390 430 Z
            " />

            <path d="
              M 445 430
              C 460 400 490 385 530 395
              C 575 380 620 395 650 420
              C 675 440 650 460 615 480
              C 575 500 540 495 505 482
              C 470 470 435 450 445 430 Z
            " />

            {/* =================================================
                INNER PEAK
            ================================================== */}

            <path d="
              M 495 430
              C 505 408 520 400 535 405
              C 555 397 575 407 585 422
              C 595 438 580 450 565 458
              C 545 468 525 462 510 453
              C 495 445 490 437 495 430 Z
            " />

            {/* =================================================
                SECONDARY MOUNTAIN — TOP RIGHT
            ================================================== */}

            <path d="
              M 690 170
              C 745 125 825 120 885 155
              C 940 185 945 240 900 270
              C 850 305 775 295 730 265
              C 680 235 650 205 690 170 Z
            " />

            <path d="
              M 730 180
              C 770 150 825 150 865 175
              C 900 195 900 225 870 245
              C 830 270 785 260 750 240
              C 715 220 705 200 730 180 Z
            " />

            <path d="
              M 765 188
              C 790 172 820 172 842 187
              C 860 200 858 215 840 226
              C 818 240 792 235 775 224
              C 758 213 750 198 765 188 Z
            " />

            {/* =================================================
                LEFT TERRAIN
            ================================================== */}

            <path d="
              M 40 300
              C 110 250 170 265 205 310
              C 235 350 205 390 155 405
              C 100 420 40 390 15 350
            " />

            <path d="
              M 65 315
              C 110 285 150 295 175 325
              C 195 350 175 375 140 385
              C 105 395 65 375 48 350
            " />

            {/* =================================================
                BOTTOM TERRAIN
            ================================================== */}

            <path d="
              M 410 700
              C 480 660 570 675 620 715
              C 665 750 645 795 585 815
              C 515 840 435 815 400 770
              C 380 745 385 720 410 700 Z
            " />

            <path d="
              M 450 715
              C 500 690 555 700 590 725
              C 620 750 605 775 565 790
              C 520 805 470 790 445 765
              C 425 745 430 725 450 715 Z
            " />

            {/* =================================================
                RIGHT TERRAIN
            ================================================== */}

            <path d="
              M 900 450
              C 940 420 985 425 1015 450
              C 1040 470 1030 500 995 515
              C 955 530 915 515 895 490
              C 880 475 885 460 900 450 Z
            " />

            <path d="
              M 925 455
              C 950 438 980 440 998 455
              C 1015 468 1008 485 985 495
              C 960 505 935 495 922 480
              C 912 470 915 462 925 455 Z
            " />

          </g>
        </motion.svg>

        {/* =====================================================
            RED ATMOSPHERIC GLOW
        ====================================================== */}

        <motion.div
          className="
            absolute left-1/2 top-[48%]
            h-[380px] w-[380px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[#FF0000]/[0.035]
            blur-[100px]
            dark:bg-[#FF0000]/[0.09]
          "
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.45, 0.75, 0.45],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =====================================================
            ROTATING BACKGROUND TEXT
        ====================================================== */}

        <motion.div
          className="
            absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            whitespace-nowrap
            select-none
            text-[18vw]
            font-black
            uppercase
            leading-none
            tracking-[-0.08em]
            text-black/[0.035]
            dark:text-white/[0.045]
          "
          animate={{
            rotate: [0, 4, 0, -4, 0],
            x: ["-50%", "-49%", "-50%", "-51%", "-50%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          VIRAT
        </motion.div>

      </div>

      {/* =========================================================
          HERO IMAGE
      ========================================================== */}

      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
          opacity: imageOpacity,
        }}
        className="
          pointer-events-none
          absolute
          bottom-[-5%]
          right-[2%]
          z-20
          flex
          h-[82%]
          w-[62%]
          items-end
          justify-center
          lg:right-[4%]
          lg:w-[58%]
        "
      >
        <img
          src={heroImage}
          alt="VIRAT sportswear athlete"
          className="
            h-full
            w-full
            object-contain
            object-bottom
          "
        />

        {/* =====================================================
            RED SPEED TRAILS
        ====================================================== */}

        <motion.div
          className="
            absolute
            bottom-[23%]
            left-[15%]
            h-[2px]
            w-[180px]
            rotate-[-12deg]
            bg-[#FF0000]/50
            blur-[1px]
          "
          animate={{
            x: [-20, 25, -20],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="
            absolute
            bottom-[19%]
            left-[12%]
            h-px
            w-[120px]
            rotate-[-12deg]
            bg-[#FF0000]/35
          "
          animate={{
            x: [10, -20, 10],
            opacity: [0.1, 0.55, 0.1],
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Impact glow */}
        <motion.div
          className="
            absolute
            bottom-[17%]
            left-[18%]
            h-24
            w-24
            rounded-full
            bg-[#FF0000]/20
            blur-[35px]
          "
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* =========================================================
          HERO CONTENT
      ========================================================== */}

      <div
        className="
          relative z-30
          mx-auto
          flex min-h-[100svh]
          max-w-7xl
          items-center
          px-6
          pb-16
          pt-28
          lg:px-10
        "
      >
        <div className="max-w-[620px]">

          {/* Eyebrow */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="
              mb-7
              flex
              items-center
              gap-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.28em]
              text-black/50
              dark:text-white/50
            "
          >
            <span
              className="
                h-px
                w-10
                bg-[#FF0000]
              "
            />

            Performance / Everyday
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              text-[clamp(4rem,9vw,8rem)]
              font-black
              uppercase
              leading-[0.82]
              tracking-[-0.07em]
            "
          >
            Built
            <br />

            <span className="text-[#FF0000]">
              To Move.
            </span>
          </motion.h1>

          {/* Description */}
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
              duration: 0.7,
              delay: 0.55,
            }}
            className="
              mt-8
              max-w-[460px]
              text-sm
              leading-7
              text-black/55
              dark:text-white/55
              sm:text-base
            "
          >
            Performance-driven cricket and sportswear
            designed for the way you play, train and live.
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
              delay: 0.7,
            }}
            className="
              mt-9
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            <motion.a
              href="#shop"
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                inline-flex
                items-center
                gap-3
                bg-[#FF0000]
                px-7
                py-4
                text-sm
                font-bold
                uppercase
                tracking-wide
                text-white
                transition-shadow
                duration-300
                hover:shadow-[0_12px_40px_rgba(255,0,0,0.22)]
              "
            >
              Shop Collection

              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </motion.a>

            <motion.a
              href="#cricket"
              whileHover={{
                y: -3,
              }}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-3
                text-sm
                font-semibold
                uppercase
                tracking-wide
                text-black/65
                transition-colors
                hover:text-[#FF0000]
                dark:text-white/65
              "
            >
              Explore Cricket

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
              />
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/* =========================================================
          TOP RIGHT LABEL
      ========================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.8,
        }}
        className="
          absolute
          right-8
          top-28
          z-30
          hidden
          text-right
          lg:block
        "
      >
        <div
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-black/35
            dark:text-white/35
          "
        >
          Est. 2026
        </div>

        <div
          className="
            mt-2
            text-xs
            font-medium
            uppercase
            tracking-[0.18em]
            text-black/55
            dark:text-white/55
          "
        >
          Made For Motion
        </div>
      </motion.div>

      {/* =========================================================
          BOTTOM LEFT INDEX
      ========================================================== */}

      <div
        className="
          absolute
          bottom-8
          left-6
          z-30
          hidden
          items-center
          gap-3
          lg:flex
        "
      >
        <span
          className="
            text-[10px]
            font-bold
            tracking-[0.25em]
            text-[#FF0000]
          "
        >
          01
        </span>

        <span
          className="
            h-px
            w-8
            bg-black/20
            dark:bg-white/20
          "
        />

        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-black/35
            dark:text-white/35
          "
        >
          Collection
        </span>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="
          absolute
          bottom-7
          left-1/2
          z-30
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          sm:flex
        "
      >
        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-black/35
            dark:text-white/35
          "
        >
          Scroll
        </span>

        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className="
              text-black/40
              dark:text-white/40
            "
          />
        </motion.div>
      </motion.div>

      {/* =========================================================
          RED CORNER ACCENTS
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          z-30
          h-24
          w-24
          border-b
          border-r
          border-[#FF0000]/30
        "
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          right-8
          bottom-8
          z-30
          h-1.5
          w-1.5
          rounded-full
          bg-[#FF0000]
        "
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </section>
  );
};

export default Hero;