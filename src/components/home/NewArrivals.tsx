import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import velocityJersey from "../../assets/products/velocity-jersey.png";
import performanceTee from "../../assets/products/performance-tee.png";
import viratPolo from "../../assets/products/virat-polo.png";
import matchDayShorts from "../../assets/products/match-day-shorts.png";

const products = [
  {
    number: "01",
    name: "Pro Match Jersey",
    category: "Cricket / Performance",
    price: "₹1,499",
    description:
      "Lightweight match-day construction built for unrestricted movement.",
    image: velocityJersey,
    imageScale: 1.5,
    gradient:
      "from-[#E3E5ED] via-[#F5F5F2] to-[#D5D7E0] dark:from-[#000045] dark:via-[#111111] dark:to-black",
    accent: "CRICKET",
  },
  {
    number: "02",
    name: "Velocity Tee",
    category: "Sportswear / Training",
    price: "₹999",
    description:
      "A clean performance essential designed for training and everyday movement.",
    image: performanceTee,
    imageScale: 1.5,
    gradient:
      "from-[#E6E6E4] via-[#F5F5F2] to-[#D7D7D5] dark:from-[#1b1b1b] dark:via-[#0d0d0d] dark:to-black",
    accent: "TRAIN",
  },
  {
    number: "03",
    name: "Club Polo",
    category: "Casual / Lifestyle",
    price: "₹1,299",
    description:
      "Sport-inspired styling with an effortless everyday silhouette.",
    image: viratPolo,
    imageScale: 1.5,
    gradient:
      "from-[#F0DEDE] via-[#F5F5F2] to-[#E4CECE] dark:from-[#220000] dark:via-[#111111] dark:to-black",
    accent: "EVERYDAY",
  },
  {
    number: "04",
    name: "Sprint Shorts",
    category: "Sportswear / Training",
    price: "₹799",
    description:
      "Lightweight shorts engineered to keep up with every movement.",
    image: matchDayShorts,
    imageScale: 1.5,
    gradient:
      "from-[#E3E5ED] via-[#E9E9E7] to-[#D8D9E0] dark:from-[#151515] dark:via-[#000045] dark:to-black",
    accent: "MOVE",
  },
];

const NewArrivals = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const product = products[activeIndex];

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? products.length - 1 : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % products.length);
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F5F5F2]
        px-5
        py-20
        text-[#080808]
        transition-colors
        duration-300
        sm:px-8
        sm:py-24
        lg:px-10
        lg:py-36
        dark:bg-[#050505]
        dark:text-white
      "
    >
      {/* ======================================================
          SECTION NUMBER
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
          dark:text-white/[0.045]
        "
      >
        05
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-6
            border-b
            border-black/10
            pb-5
            sm:mb-12
            sm:flex-row
            sm:items-end
            sm:justify-between
            dark:border-white/10
            lg:mb-16
          "
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="
                mb-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#FF0000]
                sm:text-xs
              "
            >
              Just dropped
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(3.8rem,14vw,8rem)]
                  font-black
                  uppercase
                  leading-[0.78]
                  tracking-[-0.075em]
                  text-[#080808]
                  dark:text-white
                "
              >
                New
                <br />
                arrivals<span className="text-[#FF0000]">.</span>
              </motion.h2>
            </div>
          </div>

          <span
            className="
              hidden
              text-right
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-black/25
              sm:block
              dark:text-white/25
            "
          >
            September
            <br />
            Drop / 2026
          </span>
        </div>

        {/* ======================================================
            MAIN PRODUCT
        ====================================================== */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[1fr_0.42fr]
            lg:gap-8
          "
        >

          {/* ====================================================
              PRODUCT IMAGE
          ==================================================== */}

          <div
            className="
              relative
              min-h-[500px]
              overflow-hidden
              bg-[#E8E8E5]
              dark:bg-[#0B0B0B]
              sm:min-h-[620px]
              md:min-h-[680px]
              lg:min-h-[650px]
            "
          >
            <AnimatePresence mode="wait">

              <motion.div
                key={product.number}
                initial={{
                  opacity: 0,
                  scale: 1.05,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className={`
                  absolute
                  inset-0
                  bg-gradient-to-br
                  ${product.gradient}
                `}
              >

                {/* Red lighting */}

                <div
                  className="
                    absolute
                    -left-24
                    top-16
                    h-56
                    w-56
                    rounded-full
                    bg-[#FF0000]/10
                    blur-[90px]
                    sm:h-72
                    sm:w-72
                    sm:blur-[110px]
                  "
                />

                {/* Navy lighting */}

                <div
                  className="
                    absolute
                    -bottom-24
                    right-[-30px]
                    h-72
                    w-72
                    rounded-full
                    bg-[#000045]/15
                    blur-[100px]
                    sm:h-96
                    sm:w-96
                    sm:blur-[120px]
                    dark:bg-[#000045]/60
                  "
                />

                {/* ==================================================
                    PRODUCT IMAGE
                ================================================== */}

                <div className="absolute inset-0 flex items-center justify-center">

                  <motion.img
                    key={product.number}
                    src={product.image}
                    alt={product.name}
                    draggable={false}
                    initial={{
                      opacity: 0,
                      scale: 0.92,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      scale: product.imageScale,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                      relative
                      z-10
                      h-[82%]
                      w-[88%]
                      object-contain
                      select-none
                      transition-transform
                      duration-700
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      hover:scale-[1.04]
                      sm:h-[88%]
                      sm:w-[88%]
                    "
                  />

                </div>

                {/* ==================================================
                    LIGHT MODE GRID
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.035]
                    dark:hidden
                  "
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
                    backgroundSize: "55px 55px",
                  }}
                />

                {/* ==================================================
                    DARK MODE GRID
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    hidden
                    opacity-[0.025]
                    dark:block
                  "
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "55px 55px",
                  }}
                />

                {/* ==================================================
                    PRODUCT NUMBER
                ================================================== */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    z-20
                    sm:left-6
                    sm:top-6
                  "
                >
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.3em]
                      text-black/35
                      sm:text-[10px]
                      dark:text-white/35
                    "
                  >
                    {product.number} / {products.length}
                  </span>
                </div>

                {/* ==================================================
                    ACCENT WORD
                ================================================== */}

                <div
                  className="
                    absolute
                    right-5
                    top-1/2
                    hidden
                    -translate-y-1/2
                    rotate-90
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.5em]
                    text-black/20
                    md:block
                    lg:right-6
                    dark:text-white/20
                  "
                >
                  {product.accent}
                </div>

              </motion.div>

            </AnimatePresence>

            {/* ======================================================
                CONTROLS
            ====================================================== */}

            <div
              className="
                absolute
                bottom-4
                right-4
                z-30
                flex
                gap-2
                sm:bottom-6
                sm:right-6
              "
            >
              <button
                onClick={previous}
                aria-label="Previous product"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  border
                  border-black/15
                  bg-white/50
                  text-black
                  backdrop-blur-sm
                  transition-all
                  hover:border-[#FF0000]
                  hover:bg-[#FF0000]
                  hover:text-white
                  sm:h-11
                  sm:w-11
                  dark:border-white/15
                  dark:bg-black/30
                  dark:text-white
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                aria-label="Next product"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  border
                  border-black/15
                  bg-white/50
                  text-black
                  backdrop-blur-sm
                  transition-all
                  hover:border-[#FF0000]
                  hover:bg-[#FF0000]
                  hover:text-white
                  sm:h-11
                  sm:w-11
                  dark:border-white/15
                  dark:bg-black/30
                  dark:text-white
                "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* ======================================================
              PRODUCT DETAILS
          ====================================================== */}

          <div className="flex flex-col justify-between">

            <div>
              <AnimatePresence mode="wait">

                <motion.div
                  key={product.number}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >

                  <p
                    className="
                      mb-3
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-[#FF0000]
                    "
                  >
                    {product.category}
                  </p>

                  <h3
                    className="
                      max-w-xl
                      text-[clamp(2.8rem,10vw,4.5rem)]
                      font-black
                      uppercase
                      leading-[0.85]
                      tracking-[-0.06em]
                      text-[#080808]
                      dark:text-white
                    "
                  >
                    {product.name}
                    <span className="text-[#FF0000]">.</span>
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-sm
                      text-sm
                      leading-6
                      text-black/40
                      sm:mt-6
                      dark:text-white/40
                    "
                  >
                    {product.description}
                  </p>

                  <p className="mt-6 text-lg font-bold sm:mt-7">
                    {product.price}
                  </p>

                  <a
                    href="#"
                    className="
                      group
                      mt-7
                      flex
                      w-fit
                      items-center
                      gap-3
                      bg-black
                      px-5
                      py-3.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-white
                      transition-all
                      hover:bg-[#FF0000]
                      sm:mt-8
                      sm:gap-4
                      sm:px-6
                      sm:py-4
                      sm:text-xs
                      dark:bg-white
                      dark:text-black
                      dark:hover:bg-[#FF0000]
                      dark:hover:text-white
                    "
                  >
                    Shop product

                    <ArrowUpRight
                      size={16}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                      "
                    />
                  </a>

                </motion.div>

              </AnimatePresence>
            </div>

            {/* ==================================================
                PRODUCT SELECTOR
            ================================================== */}

            <div className="mt-14 lg:mt-12">

              <p
                className="
                  mb-4
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-black/25
                  dark:text-white/25
                "
              >
                Browse the drop
              </p>

              <div className="space-y-1">

                {products.map((item, index) => (

                  <button
                    key={item.number}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-4
                      border-b
                      py-3.5
                      text-left
                      transition-all
                      sm:py-4
                      ${
                        activeIndex === index
                          ? "border-[#FF0000]"
                          : "border-black/10 dark:border-white/10"
                      }
                    `}
                  >

                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                        sm:gap-4
                      "
                    >

                      <span
                        className={`
                          shrink-0
                          text-[9px]
                          ${
                            activeIndex === index
                              ? "text-[#FF0000]"
                              : "text-black/25 dark:text-white/25"
                          }
                        `}
                      >
                        {item.number}
                      </span>

                      <span
                        className={`
                          truncate
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          transition-colors
                          sm:text-xs
                          ${
                            activeIndex === index
                              ? "text-black dark:text-white"
                              : "text-black/40 group-hover:text-black dark:text-white/40 dark:group-hover:text-white"
                          }
                        `}
                      >
                        {item.name}
                      </span>

                    </div>

                    <span
                      className="
                        shrink-0
                        text-[11px]
                        text-black/30
                        sm:text-xs
                        dark:text-white/30
                      "
                    >
                      {item.price}
                    </span>

                  </button>

                ))}

              </div>
            </div>

          </div>
        </div>

        {/* ======================================================
            BOTTOM LINE
        ====================================================== */}

        <div
          className="
            mt-12
            flex
            flex-col
            items-start
            gap-3
            border-t
            border-black/10
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/10
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-black/25
              dark:text-white/25
            "
          >
            Designed to move
          </span>

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-black/25
              dark:text-white/25
            "
          >
            Virat / New arrivals
          </span>
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;