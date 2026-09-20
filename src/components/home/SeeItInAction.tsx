import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import action01 from "../../assets/action/action-01.jpeg";
import action02 from "../../assets/action/action-02.jpeg";
import action03 from "../../assets/action/action-03.jpeg";
import action04 from "../../assets/action/action-04.jpeg";
import action05 from "../../assets/action/action-05.jpeg";
import action06 from "../../assets/action/action-06.jpeg";
import action07 from "../../assets/action/action-02.jpeg";
import action08 from "../../assets/action/action-03.jpeg";

const videos = [
  {
    id: "01",
    title: "Match Day",
    description: "Built for the pressure.",
    image: action01,
  },
  {
    id: "02",
    title: "Train Hard",
    description: "Made to move.",
    image: action02,
  },
  {
    id: "03",
    title: "Game Ready",
    description: "Performance without compromise.",
    image: action03,
  },
  {
    id: "04",
    title: "Off The Field",
    description: "Beyond the game.",
    image: action04,
  },
  {
    id: "05",
    title: "Built Different",
    description: "Engineered for movement.",
    image: action05,
  },
  {
    id: "06",
    title: "Stay Ready",
    description: "Every session matters.",
    image: action06,
  },
  {
    id: "07",
    title: "Play Hard",
    description: "Made for the moment.",
    image: action07,
  },
  {
    id: "08",
    title: "Never Settle",
    description: "Keep moving forward.",
    image: action08,
  },
];

const SeeItInAction = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  /*
   * =========================================================
   * INFINITE AUTO SCROLL
   * =========================================================
   */

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    let lastTime = performance.now();

    const speed = 35;

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPausedRef.current) {
        carousel.scrollLeft += (speed * delta) / 1000;

        /*
         * The cards are duplicated.
         * Once we've passed the first complete set,
         * jump back by exactly that set's width.
         *
         * Because both sets are identical, the user
         * sees a completely seamless infinite loop.
         */

        const halfWidth = carousel.scrollWidth / 2;

        if (carousel.scrollLeft >= halfWidth) {
          carousel.scrollLeft -= halfWidth;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /*
   * =========================================================
   * MANUAL CONTROLS
   * =========================================================
   */

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const amount = carouselRef.current.clientWidth * 0.75;

    carouselRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F5F5F2]
        px-5
        text-[#080808]
        sm:px-8
        lg:px-10
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
        07
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            grid
            gap-8
            sm:pb-12
            lg:grid-cols-[1fr_320px]
            lg:items-end
          "
        >
          {/* LEFT */}

          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="
                mb-4
                flex
                items-center
                gap-3
                text-[11px]
                font-bold
                uppercase
                tracking-[0.35em]
                text-[#FF0000]
                sm:text-xs
              "
            >
              <span className="h-px w-10 bg-[#FF0000]" />
              VIRAT / IN MOTION
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(3rem,9vw,6rem)]
                  font-black
                  uppercase
                  leading-[0.82]
                  tracking-[-0.075em]
                  text-[#080808]
                "
              >
                See it
                <br />
                <span>
                  in action<span className="text-[#FF0000]">.</span>
                </span>
              </motion.h2>
            </div>
          </div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm lg:ml-auto lg:pb-1"
          >
            <p className="text-sm leading-6 text-black/60 sm:text-base sm:leading-7">
              From the field to the streets, see how Virat moves when the game
              begins.
            </p>

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-black/40
              "
            >
              <span className="h-px w-8 bg-current" />
              08 Featured moments
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            CAROUSEL CONTROLS
        ====================================================== */}

        <div className="mb-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Previous"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-black/15
              bg-transparent
              transition-all
              duration-300
              hover:border-[#FF0000]
              hover:bg-[#FF0000]
              hover:text-white
            "
          >
            <ArrowLeft size={17} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Next"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-black/15
              bg-transparent
              transition-all
              duration-300
              hover:border-[#FF0000]
              hover:bg-[#FF0000]
              hover:text-white
            "
          >
            <ArrowRight size={17} strokeWidth={1.5} />
          </button>
        </div>

        {/* =====================================================
            INFINITE IMAGE CAROUSEL
        ====================================================== */}

        <div
          ref={carouselRef}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
          className="
            flex
            gap-4
            overflow-x-auto
            pb-4
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {/* =================================================
              FIRST SET
          ================================================= */}

          {videos.map((video, index) => (
            <motion.article
              key={`first-${video.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group
                relative
                w-[82vw]
                shrink-0
                overflow-hidden
                border
                border-black/10
                bg-[#080808]
                sm:w-[46vw]
                lg:w-[calc((100vw-10rem)/4)]
                lg:max-w-[320px]
              "
            >
              <div className="relative aspect-[9/16] overflow-hidden">

                <img
                  src={video.image}
                  alt={video.title}
                  draggable={false}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.04]
                  "
                />

                {/* OVERLAY */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/75
                    via-transparent
                    to-black/10
                    opacity-70
                  "
                />

                {/* TOP META */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    right-4
                    top-4
                    z-10
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-bold
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    {video.id}
                  </span>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/20
                      backdrop-blur-sm
                    "
                  >
                    <FaInstagram size={14} className="text-white" />
                  </div>
                </div>

                {/* BOTTOM INFO */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-4
                    left-4
                    right-4
                    z-10
                  "
                >
                  <p
                    className="
                      mb-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#FF0000]
                    "
                  >
                    {video.description}
                  </p>

                  <div className="flex items-end justify-between gap-3">
                    <h3
                      className="
                        text-xl
                        font-black
                        uppercase
                        leading-none
                        tracking-[-0.04em]
                        text-white
                        sm:text-2xl
                      "
                    >
                      {video.title}
                      <span className="text-[#FF0000]">.</span>
                    </h3>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="
                        text-white/70
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-[#FF0000]
                      "
                    />
                  </div>
                </div>

                {/* HOVER BORDER */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-20
                    border
                    border-transparent
                    transition-colors
                    duration-500
                    group-hover:border-[#FF0000]/70
                  "
                />
              </div>
            </motion.article>
          ))}

          {/* =================================================
              SECOND SET
              IDENTICAL COPY FOR INFINITE LOOP
          ================================================= */}

          {videos.map((video, index) => (
            <motion.article
              key={`second-${video.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group
                relative
                w-[82vw]
                shrink-0
                overflow-hidden
                border
                border-black/10
                bg-[#080808]
                sm:w-[46vw]
                lg:w-[calc((100vw-10rem)/4)]
                lg:max-w-[320px]
              "
            >
              <div className="relative aspect-[9/16] overflow-hidden">

                <img
                  src={video.image}
                  alt={video.title}
                  draggable={false}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.04]
                  "
                />

                {/* OVERLAY */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/75
                    via-transparent
                    to-black/10
                    opacity-70
                  "
                />

                {/* TOP META */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    right-4
                    top-4
                    z-10
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-bold
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    {video.id}
                  </span>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/20
                      backdrop-blur-sm
                    "
                  >
                    <FaInstagram size={14} className="text-white" />
                  </div>
                </div>

                {/* BOTTOM INFO */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-4
                    left-4
                    right-4
                    z-10
                  "
                >
                  <p
                    className="
                      mb-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#FF0000]
                    "
                  >
                    {video.description}
                  </p>

                  <div className="flex items-end justify-between gap-3">
                    <h3
                      className="
                        text-xl
                        font-black
                        uppercase
                        leading-none
                        tracking-[-0.04em]
                        text-white
                        sm:text-2xl
                      "
                    >
                      {video.title}
                      <span className="text-[#FF0000]">.</span>
                    </h3>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="
                        text-white/70
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-[#FF0000]
                      "
                    />
                  </div>
                </div>

                {/* HOVER BORDER */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-20
                    border
                    border-transparent
                    transition-colors
                    duration-500
                    group-hover:border-[#FF0000]/70
                  "
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* =====================================================
            INSTAGRAM CTA
        ====================================================== */}

        <motion.a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="
            group
            mt-10
            flex
            items-center
            justify-between
            border-t
            border-black/10
            pt-5
          "
        >
          <div className="flex items-center gap-3">
            <FaInstagram size={16} className="text-[#080808]" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-black/50
                transition-colors
                duration-300
                group-hover:text-[#FF0000]
              "
            >
              Follow Virat on Instagram
            </span>
          </div>

          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            className="
              text-black/40
              transition-all
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
              group-hover:text-[#FF0000]
            "
          />
        </motion.a>
      </div>
    </section>
  );
};

export default SeeItInAction;