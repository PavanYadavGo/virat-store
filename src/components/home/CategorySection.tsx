import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import cricketImage from "../../assets/categories/cricket.jpg";
import casualImage from "../../assets/categories/casual.jpg";
import sportsImage from "../../assets/categories/sports.jpg";

const categories = [
  {
    number: "01",
    title: "Cricket",
    description: "Built for the game.",
    image: cricketImage,
    className: "md:col-span-2 md:row-span-2",
    width: "105%",
    x: 0,
    y: 50,
  },
  {
    number: "02",
    title: "Casual",
    description: "Made for every day.",
    image: casualImage,
    className: "",
    width: "105%",
    x: 0,
    y: 80,
  },
  {
    number: "03",
    title: "Sports",
    description: "Move without limits.",
    image: sportsImage,
    className: "",
    width: "105%",
    x: 0,
    y: 0,
  },
];

const CategorySection = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F5F5F2]
        px-5
        py-24
        text-[#080808]
        transition-colors
        duration-300
        dark:bg-[#050505]
        dark:text-white
        sm:px-8
        sm:py-28
        lg:px-10
        lg:py-36
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
          text-black/[0.055]
          dark:text-white/[0.055]
        "
      >
        01
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div
          className="
            mb-14
            grid
            gap-8
            sm:mb-16
            lg:mb-20
            lg:grid-cols-[1fr_320px]
            lg:items-end
          "
        >
          {/* =================================================
              LEFT HEADER
          ================================================== */}

          <div>
            <motion.p
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                mb-5
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

              Explore the collection
            </motion.p>

            {/* =================================================
                BIG TITLE
            ================================================== */}

            <div className="overflow-hidden">
              <motion.h2
                initial={{
                  y: "105%",
                }}
                whileInView={{
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[4.8rem]
                  font-black
                  uppercase
                  leading-[0.78]
                  tracking-[-0.075em]
                  text-[#080808]
                  dark:text-white
                  sm:text-[6.5rem]
                  md:text-[7.5rem]
                  lg:text-[8.5rem]
                  xl:text-[9.5rem]
                "
              >
                Find your
                <br />
                <span>
                  game
                  <span className="text-[#FF0000]">.</span>
                </span>
              </motion.h2>
            </div>
          </div>

          {/* =================================================
              RIGHT HEADER
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="
              max-w-sm
              lg:ml-auto
              lg:pb-2
            "
          >
            <p
              className="
                text-sm
                leading-6
                text-black/60
                dark:text-white/60
                sm:text-base
                sm:leading-7
              "
            >
              From match-day performance to
              everyday movement, find the gear
              that moves with you.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-black/40
                dark:text-white/40
              "
            >
              <span className="h-px w-8 bg-current" />

              03 Categories
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            CATEGORY GRID
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:gap-4
            md:grid-cols-2
            md:auto-rows-[260px]
            lg:auto-rows-[300px]
          "
        >
          {categories.map((category, index) => (
            <motion.a
              href="#"
              key={category.title}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`
                group
                relative
                min-h-[300px]
                overflow-hidden
                ${category.className}
                md:min-h-0
              `}
            >
              {/* =================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  bg-black
                "
              >
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-auto
                    max-w-none
                  "
                  style={{
                    width: category.width,
                  }}
                  animate={{
                    x: `calc(-50% + ${category.x}px)`,
                    y: `calc(-50% + ${category.y}px)`,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>

              {/* =================================================
                  HOVER DARKEN
              ================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  bg-black/0
                  transition-colors
                  duration-500
                  group-hover:bg-black/30
                  dark:group-hover:bg-black/45
                "
              />

              {/* =================================================
                  CINEMATIC GRADIENT
              ================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/85
                  via-black/20
                  to-transparent
                "
              />

              {/* =================================================
                  RED GLOW
              ================================================== */}

              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  h-56
                  w-56
                  rounded-full
                  bg-[#FF0000]
                  opacity-0
                  blur-[100px]
                  transition-opacity
                  duration-700
                  group-hover:opacity-20
                "
              />

              {/* =================================================
                  IMAGE SWEEP
              ================================================== */}

              <motion.div
                className="
                  absolute
                  inset-y-0
                  -left-1/2
                  w-1/3
                  rotate-[12deg]
                  bg-white/10
                  blur-2xl
                "
                initial={{
                  x: "-100%",
                }}
                whileHover={{
                  x: "450%",
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
              />

              {/* =================================================
                  CARD TOP
              ================================================== */}

              <div
                className="
                  absolute
                  left-5
                  right-5
                  top-5
                  flex
                  items-center
                  justify-between
                  sm:left-6
                  sm:right-6
                  sm:top-6
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    tracking-[0.2em]
                    text-white/60
                    sm:text-xs
                  "
                >
                  {category.number}
                </span>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.5}
                  className="
                    text-white/80
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-[#FF0000]
                  "
                />
              </div>

              {/* =================================================
                  CARD CONTENT
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  sm:bottom-6
                  sm:left-6
                  sm:right-6
                "
              >
                <p
                  className="
                    mb-2
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-white/60
                    sm:text-xs
                  "
                >
                  {category.description}
                </p>

                <div
                  className="
                    flex
                    items-end
                    justify-between
                    gap-4
                  "
                >
                  <h3
                    className="
                      text-3xl
                      font-black
                      uppercase
                      leading-none
                      tracking-[-0.05em]
                      text-white
                      sm:text-5xl
                    "
                  >
                    {category.title}
                    <span className="text-[#FF0000]">.</span>
                  </h3>

                  <span
                    className="
                      mb-1
                      hidden
                      h-px
                      w-12
                      origin-right
                      bg-[#FF0000]
                      transition-transform
                      duration-500
                      group-hover:scale-x-[1.7]
                      sm:block
                      sm:w-16
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  HOVER BORDER
              ================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  border
                  border-transparent
                  transition-colors
                  duration-500
                  group-hover:border-[#FF0000]/60
                "
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;