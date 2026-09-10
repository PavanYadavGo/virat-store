import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion } from "motion/react";

const products = [
  {
    name: "Essential Tee",
    category: "Everyday",
    price: "₹899",
    gradient:
      "from-[#E5E5E3] via-[#F5F5F2] to-[#D7D7D5] dark:from-[#191919] dark:via-[#0D0D0D] dark:to-black",
  },
  {
    name: "Street Polo",
    category: "Casual",
    price: "₹1,299",
    gradient:
      "from-[#E3E5ED] via-[#F5F5F2] to-[#D5D7E0] dark:from-[#000045] dark:via-[#111111] dark:to-black",
  },
  {
    name: "Core Shorts",
    category: "Everyday",
    price: "₹799",
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
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative block ${
        large ? "h-full" : "h-[300px] sm:h-[360px]"
      }`}
    >
      <div
        className={`
          relative h-full overflow-hidden
          bg-gradient-to-br
          ${product.gradient}
        `}
      >
        {/* Background glow */}
        <div
          className="
            absolute -bottom-24 -right-24
            h-72 w-72 rounded-full
            bg-[#FF0000]/10
            blur-[100px]
            transition-all duration-700
            group-hover:scale-150
            group-hover:bg-[#FF0000]/15
          "
        />

        {/* Giant product number */}
        <span
          className={`
            absolute right-5 top-4
            select-none font-black
            leading-none tracking-[-0.08em]
            text-black/[0.045]
            dark:text-white/[0.045]
            ${large ? "text-[12rem]" : "text-[8rem]"}
          `}
        >
          0{index + 1}
        </span>

        {/* Abstract clothing */}
        <motion.div
          initial={{ scale: 0.94 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`absolute inset-0 flex items-center justify-center ${
            large ? "pb-8" : ""
          }`}
        >
          <div
            className={`relative transition-transform duration-700 ease-out group-hover:scale-105 ${
              large ? "h-[68%] w-[48%]" : "h-[65%] w-[50%]"
            }`}
          >
            {/* Head */}
            <div
              className="
                absolute left-1/2 top-0
                h-[16%] w-[20%]
                -translate-x-1/2
                rounded-full
                bg-black/[0.07]
                dark:bg-white/[0.07]
              "
            />

            {/* Body */}
            <div
              className="
                absolute left-1/2 top-[13%]
                h-[62%] w-[62%]
                -translate-x-1/2
                rounded-t-[35%]
                bg-black/[0.055]
                dark:bg-white/[0.055]
              "
            />

            {/* Left arm */}
            <div
              className="
                absolute left-[2%] top-[18%]
                h-[50%] w-[13%]
                -rotate-[12deg]
                rounded-full
                bg-black/[0.04]
                transition-transform duration-700
                group-hover:-rotate-[16deg]
                dark:bg-white/[0.04]
              "
            />

            {/* Right arm */}
            <div
              className="
                absolute right-[2%] top-[18%]
                h-[50%] w-[13%]
                rotate-[12deg]
                rounded-full
                bg-black/[0.04]
                transition-transform duration-700
                group-hover:rotate-[16deg]
                dark:bg-white/[0.04]
              "
            />

            {/* Legs */}
            <div
              className="
                absolute bottom-0 left-[24%]
                h-[35%] w-[14%]
                bg-black/[0.035]
                dark:bg-white/[0.035]
              "
            />

            <div
              className="
                absolute bottom-0 right-[24%]
                h-[35%] w-[14%]
                bg-black/[0.035]
                dark:bg-white/[0.035]
              "
            />

            {/* Signature red line */}
            <div
              className="
                absolute left-1/2 top-[40%]
                h-[3px] w-[72%]
                -translate-x-1/2
                bg-[#FF0000]/60
                transition-all duration-500
                group-hover:w-[88%]
              "
            />

            {/* V mark */}
            <span
              className="
                absolute left-1/2 top-[45%]
                -translate-x-1/2
                text-7xl font-black
                tracking-[-0.1em]
                text-black/[0.035]
                dark:text-white/[0.035]
              "
            >
              V
            </span>
          </div>
        </motion.div>

        {/* Grid texture */}
        <div
          className="
            absolute inset-0
            opacity-[0.025]
            dark:opacity-[0.025]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        {/* Dark mode grid */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
            opacity: 0.025,
          }}
        />

        {/* Top information */}
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
          <span
            className="
              text-[9px] font-medium uppercase
              tracking-[0.25em]
              text-black/35
              dark:text-white/35
            "
          >
            {product.category}
          </span>

          <div
            className="
              flex h-9 w-9 items-center justify-center
              border border-black/10
              transition-all duration-300
              group-hover:border-[#FF0000]
              group-hover:bg-[#FF0000]
              dark:border-white/10
            "
          >
            <ArrowUpRight
              size={16}
              className="
                transition-transform duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </div>
        </div>

        {/* Photography placeholder */}
        <div className="absolute bottom-5 left-5">
          <span
            className="
              text-[8px] uppercase
              tracking-[0.3em]
              text-black/25
              dark:text-white/25
            "
          >
            Product photography
          </span>

          <p
            className="
              mt-1 text-[9px] uppercase
              tracking-[0.2em]
              text-black/40
              dark:text-white/40
            "
          >
            Coming soon
          </p>
        </div>

        {/* Hover border */}
        <div
          className="
            absolute inset-0
            border border-transparent
            transition-colors duration-500
            group-hover:border-[#FF0000]/40
          "
        />
      </div>

      {/* Product information */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h3
            className={`font-black uppercase tracking-[-0.03em] ${
              large ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            {product.name}
            <span className="text-[#FF0000]">.</span>
          </h3>
        </div>

        <span
          className="
            text-sm font-semibold
            text-black/65
            dark:text-white/65
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
        relative overflow-hidden
        bg-[#F5F5F2]
        px-6 py-24
        text-[#080808]
        transition-colors duration-300
        dark:bg-[#0B0B0B]
        dark:text-white
        lg:px-10 lg:py-36
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* TOP BAR */}
        <div
          className="
            mb-16 flex items-center justify-between
            border-b border-black/10
            pb-5
            lg:mb-20
            dark:border-white/10
          "
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              text-xs font-bold uppercase
              tracking-[0.3em]
              text-[#FF0000]
            "
          >
            Beyond the boundary
          </motion.p>

          <span
            className="
              text-[10px] uppercase
              tracking-[0.25em]
              text-black/35
              dark:text-white/35
            "
          >
            Everyday collection / 2026
          </span>
        </div>

        {/* HERO STATEMENT */}
        <div
          className="
            grid gap-10
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-end
          "
        >
          <div className="relative">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(4.5rem,10.5vw,11rem)]
                  font-black uppercase
                  leading-[0.76]
                  tracking-[-0.09em]
                "
              >
                Off the
              </motion.h2>
            </div>

            <div className="flex items-end gap-4">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    text-[clamp(4.5rem,10.5vw,11rem)]
                    font-black uppercase
                    leading-[0.76]
                    tracking-[-0.09em]
                  "
                >
                  field<span className="text-[#FF0000]">.</span>
                </motion.h2>
              </div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 180,
                }}
                className="
                  mb-3 flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-[#FF0000]
                  lg:mb-5
                  lg:h-14 lg:w-14
                "
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="max-w-md pb-2 lg:pb-5"
          >
            <span
              className="
                mb-5 block text-[9px] font-bold
                uppercase tracking-[0.3em]
                text-black/25
                dark:text-white/25
              "
            >
              After the final whistle
            </span>

            <p
              className="
                text-sm leading-7
                text-black/65
                sm:text-base
                dark:text-white/65
              "
            >
              The game doesn't stop when you leave the pitch. Clean
              silhouettes, everyday comfort and sports-inspired design made
              for everything after the final whistle.
            </p>
          </motion.div>
        </div>

        {/* PRODUCT GRID */}
        <div
          className="
            mt-16 grid gap-5
            lg:mt-24
            lg:grid-cols-[1.25fr_0.75fr]
          "
        >
          {/* Large feature */}
          <ProductVisual
            product={products[0]}
            index={0}
            large
          />

          {/* Smaller products */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
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

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mt-16 flex flex-col gap-6
            border-t border-black/10
            pt-7
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
                text-xs font-bold uppercase
                tracking-[0.2em]
                text-black/60
                dark:text-white/60
              "
            >
              Performance meets everyday.
            </p>

            <p
              className="
                mt-2 text-[9px] uppercase
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
              group flex w-fit
              items-center gap-4
              text-xs font-bold uppercase
              tracking-[0.2em]
            "
          >
            Shop everyday

            <MoveRight
              size={17}
              className="
                transition-transform duration-300
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