import { ArrowUpRight, Plus } from "lucide-react";
import { motion } from "motion/react";

const products = [
  {
    name: "Velocity Jersey",
    category: "Cricket",
    price: "₹1,499",
    tag: "Bestseller",
    gradient:
      "from-[#E6E8EF] via-[#F5F5F2] to-[#D9DBE3] dark:from-[#000045] dark:via-[#111111] dark:to-black",
  },
  {
    name: "Core Performance Tee",
    category: "Sportswear",
    price: "₹999",
    tag: "New",
    gradient:
      "from-[#E7E7E5] via-[#F5F5F2] to-[#D8D8D6] dark:from-[#181818] dark:via-[#101010] dark:to-black",
  },
  {
    name: "Match Day Shorts",
    category: "Cricket",
    price: "₹899",
    tag: "",
    gradient:
      "from-[#F0DEDE] via-[#F5F5F2] to-[#E5CECE] dark:from-[#250000] dark:via-[#111111] dark:to-black",
  },
  {
    name: "Virat Polo",
    category: "Casual",
    price: "₹1,299",
    tag: "Popular",
    gradient:
      "from-[#E4E4E2] via-[#F5F5F2] to-[#D5D5D3] dark:from-[#151515] dark:via-[#080808] dark:to-black",
  },
];

const FeaturedProducts = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[#F5F5F2]
        px-6 py-24
        text-[#080808]
        transition-colors duration-300
        dark:bg-[#050505]
        dark:text-white
        lg:px-10 lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex items-end justify-between gap-6 lg:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="
                mb-3 text-xs font-bold uppercase
                tracking-[0.3em] text-[#FF0000]
              "
            >
              The essentials
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-5xl font-black uppercase
                  tracking-[-0.05em]
                  sm:text-6xl lg:text-8xl
                "
              >
                Featured
                <br />
                products<span className="text-[#FF0000]">.</span>
              </motion.h2>
            </div>
          </div>

          {/* Desktop view all */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="
              group hidden items-center gap-2
              border-b border-black/20
              pb-2
              text-xs font-bold uppercase
              tracking-[0.2em]
              text-black/50
              transition-colors
              hover:border-[#FF0000]
              hover:text-black
              dark:border-white/20
              dark:text-white/60
              dark:hover:text-white
              sm:flex
            "
          >
            View all

            <ArrowUpRight
              size={15}
              className="
                transition-transform duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </motion.a>
        </div>

        {/* Products */}
        <div
          className="
            grid grid-cols-2
            gap-x-3 gap-y-10
            sm:gap-x-5
            lg:grid-cols-4
          "
        >
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >

              {/* Product image */}
              <div
                className={`
                  relative aspect-[4/5]
                  overflow-hidden
                  bg-gradient-to-br
                  ${product.gradient}
                `}
              >

                {/* Placeholder product silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="
                      relative h-[72%] w-[58%]
                      transition-transform duration-700
                      ease-out
                      group-hover:scale-105
                    "
                  >

                    {/* Head */}
                    <div
                      className="
                        absolute left-1/2 top-0
                        h-[18%] w-[25%]
                        -translate-x-1/2
                        rounded-full
                        bg-black/[0.06]
                        dark:bg-white/[0.06]
                      "
                    />

                    {/* Body */}
                    <div
                      className="
                        absolute left-1/2 top-[14%]
                        h-[62%] w-[65%]
                        -translate-x-1/2
                        rounded-t-[35%]
                        bg-black/[0.055]
                        dark:bg-white/[0.055]
                      "
                    />

                    {/* Arms */}
                    <div
                      className="
                        absolute left-[5%] top-[20%]
                        h-[50%] w-[15%]
                        -rotate-[8deg]
                        rounded-full
                        bg-black/[0.04]
                        dark:bg-white/[0.04]
                      "
                    />

                    <div
                      className="
                        absolute right-[5%] top-[20%]
                        h-[50%] w-[15%]
                        rotate-[8deg]
                        rounded-full
                        bg-black/[0.04]
                        dark:bg-white/[0.04]
                      "
                    />

                    {/* Accent */}
                    <div
                      className="
                        absolute left-1/2 top-[38%]
                        h-[2px] w-[75%]
                        -translate-x-1/2
                        bg-[#FF0000]/50
                        transition-all duration-500
                        group-hover:w-[90%]
                      "
                    />
                  </div>
                </div>

                {/* Top label */}
                {product.tag && (
                  <span
                    className="
                      absolute left-4 top-4
                      bg-black
                      px-2.5 py-1
                      text-[9px] font-bold uppercase
                      tracking-wider text-white
                      dark:bg-white
                      dark:text-black
                    "
                  >
                    {product.tag}
                  </span>
                )}

                {/* Quick add */}
                <button
                  aria-label={`Add ${product.name} to cart`}
                  className="
                    absolute bottom-4 right-4
                    flex h-10 w-10
                    translate-y-3
                    items-center justify-center
                    bg-black
                    text-white
                    opacity-0
                    transition-all duration-300
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    hover:bg-[#FF0000]
                    dark:bg-white
                    dark:text-black
                    dark:hover:bg-[#FF0000]
                    dark:hover:text-white
                  "
                >
                  <Plus size={18} strokeWidth={2} />
                </button>

                {/* Product image label */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className="
                      text-[8px] uppercase
                      tracking-[0.25em]
                      text-black/25
                      dark:text-white/25
                    "
                  >
                    Product image
                  </span>
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
              <div className="mt-4">
                <div className="flex items-start justify-between gap-3">

                  <div>
                    <p
                      className="
                        mb-1 text-[9px] font-medium uppercase
                        tracking-[0.2em]
                        text-black/35
                        dark:text-white/35
                      "
                    >
                      {product.category}
                    </p>

                    <h3
                      className="
                        text-sm font-bold uppercase
                        tracking-tight
                        text-[#080808]
                        sm:text-base
                        dark:text-white
                      "
                    >
                      {product.name}
                    </h3>
                  </div>

                  <p
                    className="
                      text-sm font-semibold
                      text-black/75
                      dark:text-white/80
                    "
                  >
                    {product.price}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile view all */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="
            mt-12 flex w-fit items-center gap-2
            border-b border-black/20
            pb-2
            text-xs font-bold uppercase
            tracking-[0.2em]
            text-black/50
            dark:border-white/20
            dark:text-white/60
            sm:hidden
          "
        >
          View all products
          <ArrowUpRight size={15} />
        </motion.a>
      </div>
    </section>
  );
};

export default FeaturedProducts;