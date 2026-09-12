import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion } from "motion/react";

import performanceTee from "../../assets/products/performance-tee.png";
import viratPolo from "../../assets/products/virat-polo.png";
import matchDayShorts from "../../assets/products/match-day-shorts.png";

const products = [
  {
    name: "Essential Tee",
    category: "Everyday",
    price: "₹899",
    image: performanceTee,
    gradient:
      "from-[#E5E5E3] via-[#F5F5F2] to-[#D7D7D5] dark:from-[#191919] dark:via-[#0D0D0D] dark:to-black",
  },
  {
    name: "Street Polo",
    category: "Casual",
    price: "₹1,299",
    image: viratPolo,
    gradient:
      "from-[#E3E5ED] via-[#F5F5F2] to-[#D5D7E0] dark:from-[#000045] dark:via-[#111111] dark:to-black",
  },
  {
    name: "Core Shorts",
    category: "Everyday",
    price: "₹799",
    image: matchDayShorts,
    gradient:
      "from-[#F0DEDE] via-[#F5F5F2] to-[#E4CECE] dark:from-[#220000] dark:via-[#111111] dark:to-black",
  },
];

const ProductVisual = ({
  product,
  index,
  large = false,
}: {
  product: (typeof products)[number];
  index: number;
  large?: boolean;
}) => {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative block"
    >
      {/* =====================================================
          PRODUCT VISUAL
      ====================================================== */}

      <div
        className={`
          relative
          w-full
          overflow-hidden
          bg-gradient-to-br
          ${product.gradient}

          ${
            large
              ? "h-[430px] sm:h-[520px] md:h-[580px] lg:h-[700px]"
              : "h-[320px] sm:h-[360px] md:h-[390px] lg:h-[330px]"
          }
        `}
      >
        {/* =================================================
            SUBTLE RED GLOW
        ================================================== */}

        <div
          className="
            absolute
            -bottom-24
            -right-24
            h-72
            w-72
            rounded-full
            bg-[#FF0000]/10
            blur-[100px]
            transition-all
            duration-700
            group-hover:scale-150
            group-hover:bg-[#FF0000]/15
          "
        />

        {/* =================================================
            PRODUCT NUMBER
        ================================================== */}

        <span
          className={`
            absolute
            right-3
            top-2
            z-10
            select-none
            font-black
            leading-none
            tracking-[-0.08em]
            text-black/[0.045]
            dark:text-white/[0.045]

            ${
              large
                ? "text-[8rem] sm:text-[11rem] md:text-[14rem]"
                : "text-[6rem] sm:text-[7rem] md:text-[8rem]"
            }
          `}
        >
          0{index + 1}
        </span>

        {/* =================================================
            PRODUCT IMAGE
        ================================================== */}

        <motion.div
          initial={{ scale: 0.94 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <motion.img
            src={product.image}
            alt={product.name}
            draggable={false}
            className={`
              relative
              z-[2]
              h-full
              w-full
              select-none
              object-contain

              transition-transform
              duration-700
              ease-[cubic-bezier(0.16,1,0.3,1)]

              scale-[1.12]
              group-hover:scale-[1.18]

              sm:scale-[1.18]
              sm:group-hover:scale-[1.24]

              md:scale-[1.22]
              md:group-hover:scale-[1.28]

              ${
                large
                  ? "p-8 sm:p-10 md:p-12 lg:p-14"
                  : "p-6 sm:p-7 md:p-8"
              }
            `}
          />
        </motion.div>

        {/* =================================================
            SOFT IMAGE OVERLAY
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[3]
            bg-gradient-to-t
            from-black/10
            via-transparent
            to-transparent
            dark:from-black/20
          "
        />

        {/* =================================================
            LIGHT MODE GRID
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[4]
            opacity-[0.02]
            dark:hidden
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        {/* =================================================
            DARK MODE GRID
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[4]
            hidden
            opacity-[0.02]
            dark:block
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        {/* =================================================
            TOP INFORMATION
        ================================================== */}

        <div
          className="
            absolute
            left-4
            right-4
            top-4
            z-10
            flex
            items-center
            justify-between

            sm:left-5
            sm:right-5
            sm:top-5
          "
        >
          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-black/45
              dark:text-white/45
            "
          >
            {product.category}
          </span>

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              border
              border-black/10
              bg-white/20
              backdrop-blur-sm
              transition-all
              duration-300

              group-hover:border-[#FF0000]
              group-hover:bg-[#FF0000]

              dark:border-white/10
              dark:bg-black/10

              sm:h-9
              sm:w-9
            "
          >
            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </div>
        </div>

        {/* =================================================
            BOTTOM PRODUCT LABEL
        ================================================== */}

        <div
          className="
            absolute
            bottom-4
            left-4
            z-10

            sm:bottom-5
            sm:left-5
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-black/30
              dark:text-white/35
            "
          >
            Virat / {product.category}
          </span>
        </div>

        {/* =================================================
            HOVER BORDER
        ================================================== */}

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
            group-hover:border-[#FF0000]/40
          "
        />
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}

      <div
        className="
          mt-3
          flex
          items-end
          justify-between
          gap-4

          sm:mt-4
        "
      >
        <h3
          className={`
            font-black
            uppercase
            leading-none
            tracking-[-0.03em]

            ${
              large
                ? "text-lg sm:text-xl md:text-2xl"
                : "text-base sm:text-lg"
            }
          `}
        >
          {product.name}
          <span className="text-[#FF0000]">.</span>
        </h3>

        <span
          className="
            shrink-0
            text-xs
            font-semibold
            text-black/65
            dark:text-white/65

            sm:text-sm
          "
        >
          {product.price}
        </span>
      </div>
    </motion.a>
  );
};

const OffTheField = () => {
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
        dark:bg-[#0B0B0B]
        dark:text-white

        sm:px-8
        sm:py-24

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
          right-[-15px]
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
        04
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-14 lg:mb-20">

          {/* TOP META */}
          <div
            className="
              flex
              flex-col
              gap-4
              border-b
              border-black/10
              pb-5

              sm:flex-row
              sm:items-center
              sm:justify-between

              dark:border-white/10
            "
          >
            <motion.div
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
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-[#FF0000]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#FF0000]
                "
              >
                Everyday Collection
              </span>
            </motion.div>

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-black/30
                dark:text-white/30
              "
            >
              Collection 03 / 2026
            </span>
          </div>

          {/* =================================================
              MAIN HEADING
          ================================================== */}

          <div className="mt-7 overflow-hidden sm:mt-8">
            <motion.h2
              initial={{
                y: "100%",
              }}
              whileInView={{
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                text-[clamp(3.8rem,14vw,9rem)]
                font-black
                uppercase
                leading-[0.78]
                tracking-[-0.085em]
                text-[#080808]
                dark:text-white
              "
            >
              Off The
              <br />
              <span className="text-[#FF0000]">Field.</span>
            </motion.h2>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <div
            className="
              mt-7
              flex
              flex-col
              gap-5

              sm:mt-8
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="
                max-w-xl
                text-sm
                leading-6
                text-black/55
                dark:text-white/55

                sm:text-base
                sm:leading-7
              "
            >
              The game doesn't stop when you leave the pitch. Everyday
              silhouettes, comfort and sports-inspired design made for
              everything after the final whistle.
            </motion.p>

            <span
              className="
                shrink-0
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-black/30
                dark:text-white/30
              "
            >
              Casual / Everyday / 03
            </span>
          </div>
        </div>

        {/* =====================================================
            PRODUCT GRID
        ====================================================== */}

        <div
          className="
            grid
            gap-5

            lg:grid-cols-[1.25fr_0.75fr]
          "
        >
          {/* =================================================
              LARGE PRODUCT
          ================================================== */}

          <ProductVisual
            product={products[0]}
            index={0}
            large
          />

          {/* =================================================
              SMALL PRODUCTS
          ================================================== */}

          <div
            className="
              grid
              gap-5

              sm:grid-cols-2

              lg:grid-cols-1
            "
          >
            <ProductVisual
              product={products[1]}
              index={1}
            />

            <ProductVisual
              product={products[2]}
              index={2}
            />
          </div>
        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

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
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-14
            flex
            flex-col
            gap-6
            border-t
            border-black/10
            pt-7

            sm:mt-16
            sm:flex-row
            sm:items-center
            sm:justify-between

            lg:mt-20

            dark:border-white/10
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-black/60
                dark:text-white/60
              "
            >
              Performance meets everyday.
            </p>

            <p
              className="
                mt-2
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-black/25
                dark:text-white/25
              "
            >
              Built for everything after the game.
            </p>
          </div>

          <a
            href="#"
            className="
              group
              flex
              w-fit
              items-center
              gap-4
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
            "
          >
            Shop everyday

            <MoveRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-2
                group-hover:text-[#FF0000]
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OffTheField;