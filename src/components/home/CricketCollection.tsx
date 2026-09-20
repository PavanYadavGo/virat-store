import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import performanceVideo from "../../assets/cricket-collection.mp4";

const CricketCollection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "5%"]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    ["20px", "-20px"]
  );

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
        sm:px-8
        sm:py-24
        lg:px-10
        lg:py-36
      "
    >
      {/* =========================================================
          SECTION NUMBER
      ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-10px]
          top-1/2
          z-0
          -translate-y-1/2
          select-none
          text-[clamp(10rem,22vw,22rem)]
          font-black
          leading-none
          tracking-[-0.1em]
          text-black/[0.045]
        "
      >
        03
      </div>

      {/* =========================================================
          TOP META
      ========================================================= */}

      <div
        className="
          relative
          z-10
          mb-12
          flex
          flex-col
          gap-4
          border-b
          border-black/10
          pb-6
          sm:mb-16
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#FF0000]" />

          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-black/60
            "
          >
            Performance Collection
          </span>
        </div>

        <span
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
            text-black/40
          "
        >
          Collection 03 / 2026
        </span>
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div
        className="
          relative
          z-20
          grid
          gap-10
          lg:grid-cols-[1fr_0.55fr]
          lg:items-end
          lg:gap-16
        "
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="
              mb-6
              text-xs
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#FF0000]
            "
          >
            Made for motion.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.8,
              delay: 0.05,
              ease: "easeOut",
            }}
            className="
              text-[clamp(4rem,13vw,9.5rem)]
              font-black
              uppercase
              leading-[0.78]
              tracking-[-0.085em]
              text-[#080808]
            "
          >
            Built to
            <br />
            Move<span className="text-[#FF0000]">.</span>
          </motion.h2>
        </div>

        <motion.div
          style={{ y: textY }}
          className="relative z-20 max-w-md lg:pb-3"
        >
          <p
            className="
              text-base
              leading-relaxed
              text-black/60
              sm:text-lg
            "
          >
            Performance-driven apparel made for every game, every session
            and everything in between.
          </p>

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-x-8
              gap-y-3
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
            "
          >
            <span>06 Pieces</span>

            <span className="h-1 w-1 rounded-full bg-[#FF0000]" />

            <span className="text-black/40">
              Performance
            </span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          VIDEO
      ========================================================= */}

      <div className="relative z-10 mt-14 sm:mt-20 lg:mt-24">
        <div
          className="
            relative
            aspect-[4/5]
            overflow-hidden
            bg-[#111]
            sm:aspect-[16/10]
            lg:aspect-[16/9]
          "
        >
          {/* RED CORNER FRAME */}

          <div className="pointer-events-none absolute inset-0 z-20">
            <div
              className="
                absolute
                left-0
                top-0
                h-16
                w-16
                border-l-2
                border-t-2
                border-[#FF0000]
                sm:h-24
                sm:w-24
              "
            />

            <div
              className="
                absolute
                bottom-0
                right-0
                h-16
                w-16
                border-b-2
                border-r-2
                border-[#FF0000]
                sm:h-24
                sm:w-24
              "
            />
          </div>

          {/* VIDEO */}

          <motion.video
            style={{ y: imageY }}
            src={performanceVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="
              absolute
              inset-0
              h-[110%]
              w-full
              scale-[1.02]
              object-cover
            "
          />

          {/* CINEMATIC OVERLAY */}

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

          {/* RED GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-20%]
              left-[-10%]
              z-10
              h-[50%]
              w-[50%]
              rounded-full
              bg-[#FF0000]/10
              blur-[100px]
            "
          />

          {/* VIDEO CONTENT */}

          <div className="absolute inset-x-0 bottom-0 z-30 p-6 sm:p-10 lg:p-14">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF0000]" />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-white/70
                    "
                  >
                    Performance / 2026
                  </span>
                </div>

                <h3
                  className="
                    text-[clamp(2.5rem,8vw,6rem)]
                    font-black
                    uppercase
                    leading-[0.8]
                    tracking-[-0.07em]
                    text-white
                  "
                >
                  Made for
                  <br />
                  motion<span className="text-[#FF0000]">.</span>
                </h3>
              </div>

              {/* CTA */}

              <motion.a
                href="/sports"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-4
                  border
                  border-white/30
                  bg-white/10
                  px-5
                  py-4
                  backdrop-blur-md
                  transition-colors
                  hover:border-[#FF0000]
                  hover:bg-[#FF0000]
                "
              >
                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-white
                  "
                >
                  Explore performance
                </span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={2}
                  className="
                    text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </motion.a>
            </div>
          </div>

          {/* TOP VIDEO LABEL */}

          <div className="absolute right-5 top-5 z-30 sm:right-8 sm:top-8">
            <span
              className="
                border
                border-white/20
                bg-black/20
                px-3
                py-2
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/70
                backdrop-blur-md
              "
            >
              VIRAT / PERFORMANCE
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM INFORMATION
      ========================================================= */}

      <div
        className="
          relative
          z-10
          mt-8
          grid
          gap-6
          border-t
          border-black/10
          pt-6
          sm:grid-cols-3
          sm:items-center
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#FF0000]
            "
          >
            03
          </span>

          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-black/50
            "
          >
            Performance
          </span>
        </div>

        <div
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.18em]
            text-black/40
            sm:text-center
          "
        >
          Built for movement
        </div>

        <div className="flex items-center gap-3 sm:justify-end">
          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-black/40
            "
          >
            Virat Sportswear
          </span>

          <MoveRight
            size={18}
            strokeWidth={1.5}
            className="text-[#FF0000]"
          />
        </div>
      </div>
    </section>
  );
};

export default CricketCollection;