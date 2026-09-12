import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import velocityJersey from "../../assets/products/velocity-jersey.png";
import performanceTee from "../../assets/products/performance-tee.png";
import matchDayShorts from "../../assets/products/match-day-shorts.png";
import viratPolo from "../../assets/products/virat-polo.png";

type Product = {
  number: string;
  name: string;
  category: string;
  price: string;
  tag: string;
  image?: string;

  /*
   * Individual image controls.
   * Change these per product if the photo needs adjustment.
   */
  imageScale: number;
  imageX: number;
  imageY: number;

  gradient: string;
};

const products: Product[] = [
  {
    number: "01",
    name: "Velocity Jersey",
    category: "Cricket",
    price: "₹1,499",
    tag: "Bestseller",
    image: velocityJersey,

    imageScale: 1.6,
    imageX: 0,
    imageY: 0,

    gradient:
      "from-[#DDE1EA] via-[#F5F5F2] to-[#C9CDD8] dark:from-[#000045] dark:via-[#111111] dark:to-black",
  },

  {
    number: "02",
    name: "Core Performance Tee",
    category: "Sportswear",
    price: "₹999",
    tag: "New",
    image: performanceTee,

    imageScale: 1.3,
    imageX: 0,
    imageY: 0,

    gradient:
      "from-[#E4E4E1] via-[#F5F5F2] to-[#D2D2D0] dark:from-[#181818] dark:via-[#101010] dark:to-black",
  },

  {
    number: "03",
    name: "Match Day Shorts",
    category: "Cricket",
    price: "₹899",
    tag: "",
    image: matchDayShorts,

    imageScale: 1.3,
    imageX: 0,
    imageY: 0,

    gradient:
      "from-[#F0DADA] via-[#F5F5F2] to-[#E4C8C8] dark:from-[#250000] dark:via-[#111111] dark:to-black",
  },

  {
    number: "04",
    name: "Virat Polo",
    category: "Casual",
    price: "₹1,299",
    tag: "Popular",
    image: viratPolo,

    imageScale: 1.3,
    imageX: 0,
    imageY: 0,

    gradient:
      "from-[#E0E1DF] via-[#F5F5F2] to-[#D0D0CE] dark:from-[#151515] dark:via-[#080808] dark:to-black",
  },
];

/* ============================================================
   PRODUCT VISUAL
   ============================================================ */

const ProductVisual = ({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      whileHover={{ scale: 1.02 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* ======================================================
          ATMOSPHERIC GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[38%]
          w-[38%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/50
          blur-[60px]
          transition-all
          duration-700
          group-hover:scale-125
          group-hover:bg-[#FF0000]/10
          sm:h-[45%]
          sm:w-[45%]
          sm:blur-[80px]
          dark:bg-white/10
          dark:group-hover:bg-[#FF0000]/10
        "
      />

      {/* ======================================================
          REAL PRODUCT IMAGE
      ====================================================== */}

      {product.image ? (
        <motion.img
          src={product.image}
          alt={product.name}
          draggable={false}
          className={`
            absolute
            left-1/2
            top-1/2
            max-h-full
            max-w-full
            -translate-x-1/2
            -translate-y-1/2
            object-contain
            select-none
            transition-transform
            duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              large
                ? "h-[88%] w-[88%] p-4 sm:h-[92%] sm:w-[92%] sm:p-8 lg:p-10"
                : "h-[84%] w-[84%] p-4 sm:h-[88%] sm:w-[88%] sm:p-6"
            }
          `}
          style={{
            scale: product.imageScale,
            x: product.imageX,
            y: product.imageY,
          }}
        />
      ) : (
        /* ====================================================
           FALLBACK PRODUCT PLACEHOLDER
        ==================================================== */

        <div
          className={`
            relative
            ${
              large
                ? "h-[78%] w-[58%] sm:h-[82%] sm:w-[42%]"
                : "h-[72%] w-[68%] sm:h-[76%] sm:w-[55%]"
            }
          `}
        >
          {/* Neck */}
          <div
            className="
              absolute
              left-1/2
              top-0
              h-[10%]
              w-[24%]
              -translate-x-1/2
              rounded-b-xl
              bg-black/[0.09]
              dark:bg-white/[0.10]
            "
          />

          {/* Body */}
          <div
            className="
              absolute
              left-1/2
              top-[7%]
              h-[67%]
              w-[70%]
              -translate-x-1/2
              rounded-[18%_18%_7%_7%]
              bg-black/[0.09]
              shadow-[0_30px_80px_rgba(0,0,0,0.12)]
              transition-all
              duration-700
              group-hover:-translate-y-2
              group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.2)]
              dark:bg-white/[0.10]
              dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)]
            "
          >
            {/* Shoulder panels */}
            <div
              className="
                absolute
                left-0
                top-0
                h-[18%]
                w-[28%]
                -translate-x-[15%]
                -rotate-[22deg]
                rounded-full
                bg-black/[0.07]
                dark:bg-white/[0.07]
              "
            />

            <div
              className="
                absolute
                right-0
                top-0
                h-[18%]
                w-[28%]
                translate-x-[15%]
                rotate-[22deg]
                rounded-full
                bg-black/[0.07]
                dark:bg-white/[0.07]
              "
            />

            {/* Chest stripe */}
            <motion.div
              className="
                absolute
                left-1/2
                top-[31%]
                h-[2px]
                w-[58%]
                -translate-x-1/2
                bg-[#FF0000]/70
              "
              whileHover={{
                width: "78%",
              }}
              transition={{
                duration: 0.4,
              }}
            />

            {/* Vertical brand line */}
            <div
              className="
                absolute
                left-1/2
                top-[31%]
                h-[29%]
                w-px
                -translate-x-1/2
                bg-[#FF0000]/30
              "
            />

            {/* Brand */}
            <div
              className="
                absolute
                left-1/2
                top-[40%]
                -translate-x-1/2
                text-[7px]
                font-black
                tracking-[0.25em]
                text-black/25
                dark:text-white/25
              "
            >
              VIRAT
            </div>
          </div>

          {/* Left arm */}
          <div
            className="
              absolute
              left-[8%]
              top-[11%]
              h-[43%]
              w-[13%]
              -rotate-[16deg]
              rounded-full
              bg-black/[0.065]
              dark:bg-white/[0.065]
            "
          />

          {/* Right arm */}
          <div
            className="
              absolute
              right-[8%]
              top-[11%]
              h-[43%]
              w-[13%]
              rotate-[16deg]
              rounded-full
              bg-black/[0.065]
              dark:bg-white/[0.065]
            "
          />

          {/* Lower shadow */}
          <div
            className="
              absolute
              bottom-[6%]
              left-1/2
              h-[8%]
              w-[60%]
              -translate-x-1/2
              rounded-full
              bg-black/10
              blur-xl
              dark:bg-black/40
            "
          />
        </div>
      )}

      {/* ======================================================
          SUBTLE BOTTOM ATMOSPHERE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[30%]
          bg-gradient-to-t
          from-black/[0.07]
          to-transparent
          sm:h-[35%]
          dark:from-black/20
        "
      />
    </motion.div>
  );
};

/* ============================================================
   FEATURED PRODUCTS
   ============================================================ */

const FeaturedProducts = () => {
  const featured = products[0];
  const secondary = products.slice(1);

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
        lg:py-32
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
        02
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
            gap-8
            sm:mb-14
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                mb-4
                text-[10px]
                font-bold
                uppercase
                tracking-[0.35em]
                text-[#FF0000]
              "
            >
              02 — The essentials
            </motion.p>

            <div className="overflow-hidden">
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
                  duration: 0.85,
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
                Featured
                <span className="text-[#FF0000]">.</span>
              </motion.h2>
            </div>
          </div>

          {/* Desktop / tablet view all */}

          <motion.a
            href="#"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              group
              hidden
              items-center
              gap-3
              border-b
              border-black/20
              pb-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              transition-colors
              hover:border-[#FF0000]
              dark:border-white/20
              sm:flex
            "
          >
            View all

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </motion.a>
        </div>

        {/* ======================================================
            FEATURED PRODUCT
        ====================================================== */}

        <motion.article
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group"
        >
          <div
            className={`
              relative
              min-h-[500px]
              overflow-hidden
              bg-gradient-to-br
              ${featured.gradient}
              sm:min-h-[580px]
              md:min-h-[620px]
              lg:min-h-[650px]
            `}
          >
            {/* ==================================================
                PRODUCT NUMBER
            ================================================== */}

            <div
              className="
                absolute
                left-4
                top-4
                z-30
                flex
                items-center
                gap-2
                sm:left-6
                sm:top-6
                sm:gap-3
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.25em]
                "
              >
                {featured.number}
              </span>

              <span
                className="
                  h-px
                  w-5
                  bg-black/20
                  sm:w-8
                  dark:bg-white/20
                "
              />

              <span
                className="
                  hidden
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-black/40
                  dark:text-white/40
                  xs:inline
                "
              >
                Featured product
              </span>
            </div>

            {/* ==================================================
                TAG
            ================================================== */}

            {featured.tag && (
              <div
                className="
                  absolute
                  right-4
                  top-4
                  z-30
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-black/50
                  sm:right-6
                  sm:top-6
                  dark:text-white/50
                "
              >
                {featured.tag}
              </div>
            )}

            {/* ==================================================
                PRODUCT IMAGE
            ================================================== */}

            <ProductVisual
              product={featured}
              large
            />

            {/* ==================================================
                HUGE VIRAT BACKGROUND
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-2%]
                left-1/2
                z-10
                -translate-x-1/2
                whitespace-nowrap
                text-[27vw]
                font-black
                uppercase
                leading-none
                tracking-[-0.09em]
                text-black/[0.035]
                sm:text-[22vw]
                lg:text-[18vw]
                dark:text-white/[0.035]
              "
            >
              VIRAT
            </div>

            {/* ==================================================
                PRODUCT INFORMATION
            ================================================== */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-40
                flex
                flex-col
                gap-5
                p-5
                sm:gap-8
                sm:p-6
                lg:flex-row
                lg:items-end
                lg:justify-between
                lg:p-10
              "
            >
              <div>
                <p
                  className="
                    mb-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-black/40
                    dark:text-white/40
                  "
                >
                  {featured.category} / Performance
                </p>

                <h3
                  className="
                    max-w-[80vw]
                    text-2xl
                    font-black
                    uppercase
                    leading-none
                    tracking-[-0.04em]
                    sm:text-4xl
                    md:text-5xl
                  "
                >
                  {featured.name}
                </h3>
              </div>

              <div
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-5
                  sm:w-auto
                  sm:justify-start
                  sm:gap-6
                "
              >
                <span
                  className="
                    text-sm
                    font-bold
                    sm:text-base
                  "
                >
                  {featured.price}
                </span>

                <button
                  className="
                    group/shop
                    flex
                    items-center
                    gap-2
                    border-b
                    border-black/40
                    pb-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    transition-colors
                    hover:border-[#FF0000]
                    hover:text-[#FF0000]
                    sm:gap-3
                    sm:text-[10px]
                    dark:border-white/40
                  "
                >
                  Shop product

                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover/shop:-translate-y-1
                      group-hover/shop:translate-x-1
                    "
                  />
                </button>
              </div>
            </div>

            {/* ==================================================
                BOTTOM FADE
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                z-20
                h-[42%]
                bg-gradient-to-t
                from-black/[0.14]
                to-transparent
                sm:h-[38%]
                dark:from-black/30
              "
            />

            {/* ==================================================
                RED HOVER LINE
            ================================================== */}

            <div
              className="
                absolute
                bottom-0
                left-0
                z-50
                h-[3px]
                w-full
                origin-left
                scale-x-0
                bg-[#FF0000]
                transition-transform
                duration-700
                group-hover:scale-x-100
              "
            />
          </div>
        </motion.article>

        {/* ======================================================
            SECONDARY PRODUCTS
        ====================================================== */}

        <div className="mt-12 sm:mt-14">

          {/* Section label */}

          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              gap-4
              border-b
              border-black/10
              pb-4
              dark:border-white/10
            "
          >
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-black/40
                dark:text-white/40
              "
            >
              More from Virat
            </span>

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-black/30
                dark:text-white/30
              "
            >
              02 — 04
            </span>
          </div>

          {/* Product grid */}

          <div
            className="
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {secondary.map((product, index) => (
              <motion.article
                key={product.name}
                initial={{
                  opacity: 0,
                  y: 30,
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
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                {/* ==================================================
                    PRODUCT IMAGE CONTAINER
                ================================================== */}

                <div
                  className={`
                    relative
                    aspect-[4/5]
                    overflow-hidden
                    bg-gradient-to-br
                    ${product.gradient}
                  `}
                >
                  {/* Number */}

                  <span
                    className="
                      absolute
                      left-4
                      top-4
                      z-30
                      text-[9px]
                      font-bold
                      tracking-[0.2em]
                      text-black/35
                      sm:left-5
                      sm:top-5
                      dark:text-white/35
                    "
                  >
                    {product.number}
                  </span>

                  {/* Product */}

                  <ProductVisual
                    product={product}
                  />

                  {/* Hover shop */}

                  <div
                    className="
                      absolute
                      bottom-4
                      right-4
                      z-40
                      flex
                      items-center
                      gap-2
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      opacity-0
                      translate-y-2
                      transition-all
                      duration-300
                      group-hover:translate-y-0
                      group-hover:opacity-100
                      sm:bottom-5
                      sm:right-5
                    "
                  >
                    Shop

                    <ArrowUpRight
                      size={13}
                    />
                  </div>

                  {/* Red bottom line */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      z-50
                      h-[2px]
                      w-full
                      origin-left
                      scale-x-0
                      bg-[#FF0000]
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    "
                  />
                </div>

                {/* ==================================================
                    PRODUCT INFO
                ================================================== */}

                <div className="mt-4">
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div className="min-w-0">
                      <p
                        className="
                          mb-1.5
                          text-[9px]
                          uppercase
                          tracking-[0.2em]
                          text-black/35
                          dark:text-white/35
                        "
                      >
                        {product.category}
                      </p>

                      <h3
                        className="
                          text-sm
                          font-bold
                          uppercase
                          tracking-tight
                        "
                      >
                        {product.name}
                      </h3>
                    </div>

                    <span
                      className="
                        shrink-0
                        text-sm
                        font-semibold
                      "
                    >
                      {product.price}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ======================================================
            FOOTER LINE
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-16
            flex
            flex-col
            items-start
            gap-3
            border-t
            border-black/10
            pt-6
            sm:mt-20
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/10
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-black/35
              dark:text-white/35
            "
          >
            Built for the game. Designed for everywhere.
          </p>

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#FF0000]
            "
          >
            Virat / 2026
          </span>
        </motion.div>

        {/* ======================================================
            MOBILE VIEW ALL
        ====================================================== */}

        <a
          href="#"
          className="
            mt-10
            flex
            w-fit
            items-center
            gap-2
            border-b
            border-black/20
            pb-2
            text-[10px]
            font-bold
            uppercase
            tracking-[0.2em]
            dark:border-white/20
            sm:hidden
          "
        >
          View all products

          <ArrowUpRight
            size={14}
          />
        </a>
      </div>
    </section>
  );
};

export default FeaturedProducts;