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

    imageScale: 1.60,
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

    imageScale: 1.30,
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

    imageScale: 1.30,
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

    imageScale: 1.30,
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
          h-[45%]
          w-[45%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/50
          blur-[80px]
          transition-all
          duration-700
          group-hover:scale-125
          group-hover:bg-[#FF0000]/10
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
                ? "h-[92%] w-[92%] p-6 sm:p-8 lg:p-10"
                : "h-[88%] w-[88%] p-5 sm:p-6"
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

           This only appears if no image is supplied.
        ==================================================== */

        <div
          className={`
            relative
            ${
              large
                ? "h-[82%] w-[42%]"
                : "h-[76%] w-[55%]"
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
          h-[35%]
          bg-gradient-to-t
          from-black/[0.07]
          to-transparent
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
        px-6
        py-24
        text-[#080808]
        transition-colors
        duration-300
        dark:bg-[#050505]
        dark:text-white
        lg:px-10
        lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-14 flex items-end justify-between">
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
              01 — The essentials
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
                  text-[clamp(3.5rem,8vw,8rem)]
                  font-black
                  uppercase
                  leading-[0.78]
                  tracking-[-0.075em]
                "
              >
                Featured
                <span className="text-[#FF0000]">
                  .
                </span>
              </motion.h2>
            </div>
          </div>

          {/* Desktop view all */}
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
              min-h-[540px]
              overflow-hidden
              bg-gradient-to-br
              ${featured.gradient}
              lg:min-h-[650px]
            `}
          >
            {/* ==================================================
                NUMBER
            ================================================== */}

            <div
              className="
                absolute
                left-6
                top-6
                z-30
                flex
                items-center
                gap-3
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
                  w-8
                  bg-black/20
                  dark:bg-white/20
                "
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-black/40
                  dark:text-white/40
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
                  right-6
                  top-6
                  z-30
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-black/50
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
                bottom-[-4%]
                left-1/2
                z-10
                -translate-x-1/2
                whitespace-nowrap
                text-[18vw]
                font-black
                uppercase
                leading-none
                tracking-[-0.09em]
                text-black/[0.035]
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
                justify-between
                gap-8
                p-6
                lg:flex-row
                lg:items-end
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
                    text-3xl
                    font-black
                    uppercase
                    leading-none
                    tracking-[-0.04em]
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  {featured.name}
                </h3>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-6
                "
              >
                <span
                  className="
                    text-sm
                    font-bold
                  "
                >
                  {featured.price}
                </span>

                <button
                  className="
                    group/shop
                    flex
                    items-center
                    gap-3
                    border-b
                    border-black/40
                    pb-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    transition-colors
                    hover:border-[#FF0000]
                    hover:text-[#FF0000]
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
                h-[38%]
                bg-gradient-to-t
                from-black/[0.12]
                to-transparent
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

        <div className="mt-14">

          {/* Section label */}

          <div
            className="
              mb-6
              flex
              items-center
              justify-between
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
              sm:grid-cols-3
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
                      left-5
                      top-5
                      z-30
                      text-[9px]
                      font-bold
                      tracking-[0.2em]
                      text-black/35
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
                      bottom-5
                      right-5
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
                    <div>
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
            mt-20
            flex
            items-center
            justify-between
            border-t
            border-black/10
            pt-6
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