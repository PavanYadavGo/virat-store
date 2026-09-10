import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const products = [
  {
    number: "01",
    name: "Pro Match Jersey",
    category: "Cricket / Performance",
    price: "₹1,499",
    description:
      "Lightweight match-day construction built for unrestricted movement.",
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
        relative overflow-hidden
        bg-[#F5F5F2]
        px-6 py-24
        text-[#080808]
        transition-colors duration-300
        dark:bg-[#050505]
        dark:text-white
        lg:px-10 lg:py-36
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className="
            mb-12 flex items-end justify-between
            border-b border-black/10 pb-5
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
              className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FF0000]"
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
                className="text-5xl font-black uppercase tracking-[-0.06em] sm:text-6xl lg:text-8xl"
              >
                New
                <br />
                arrivals<span className="text-[#FF0000]">.</span>
              </motion.h2>
            </div>
          </div>

          <span
            className="
              hidden text-right text-[10px]
              uppercase tracking-[0.25em]
              text-black/25
              dark:text-white/25
              sm:block
            "
          >
            September
            <br />
            Drop / 2026
          </span>
        </div>

        {/* Main product */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
          <div
            className="
              relative min-h-[560px]
              overflow-hidden
              bg-[#E8E8E5]
              dark:bg-[#0B0B0B]
              sm:min-h-[650px]
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={product.number}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`}
              >
                {/* Abstract product placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ y: 30 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative h-[72%] w-[45%]"
                  >
                    {/* Head */}
                    <div
                      className="
                        absolute left-1/2 top-0
                        h-[15%] w-[18%]
                        -translate-x-1/2 rounded-full
                        bg-black/[0.07]
                        dark:bg-white/[0.07]
                      "
                    />

                    {/* Torso */}
                    <div
                      className="
                        absolute left-1/2 top-[12%]
                        h-[65%] w-[58%]
                        -translate-x-1/2
                        rounded-t-[35%]
                        bg-black/[0.055]
                        dark:bg-white/[0.055]
                      "
                    />

                    {/* Arms */}
                    <div
                      className="
                        absolute left-[5%] top-[17%]
                        h-[48%] w-[12%]
                        -rotate-[12deg]
                        rounded-full
                        bg-black/[0.04]
                        dark:bg-white/[0.04]
                      "
                    />

                    <div
                      className="
                        absolute right-[5%] top-[17%]
                        h-[48%] w-[12%]
                        rotate-[12deg]
                        rounded-full
                        bg-black/[0.04]
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

                    {/* Jersey detail */}
                    <div className="absolute left-1/2 top-[38%] h-[3px] w-[75%] -translate-x-1/2 bg-[#FF0000]/60" />

                    <div
                      className="
                        absolute left-1/2 top-[44%]
                        -translate-x-1/2
                        text-[clamp(2rem,5vw,5rem)]
                        font-black tracking-[-0.08em]
                        text-black/[0.045]
                        dark:text-white/[0.04]
                      "
                    >
                      V
                    </div>
                  </motion.div>
                </div>

                {/* Lighting */}
                <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#FF0000]/10 blur-[110px]" />

                <div
                  className="
                    absolute -bottom-20 right-0
                    h-96 w-96 rounded-full
                    bg-[#000045]/15
                    blur-[120px]
                    dark:bg-[#000045]/60
                  "
                />

                {/* Grid — light */}
                <div
                  className="
                    absolute inset-0
                    opacity-[0.035]
                    dark:hidden
                  "
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
                    backgroundSize: "55px 55px",
                  }}
                />

                {/* Grid — dark */}
                <div
                  className="
                    absolute inset-0
                    hidden opacity-[0.025]
                    dark:block
                  "
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                    backgroundSize: "55px 55px",
                  }}
                />

                {/* Product number */}
                <div className="absolute left-6 top-6">
                  <span
                    className="
                      text-[10px] uppercase tracking-[0.3em]
                      text-black/35
                      dark:text-white/35
                    "
                  >
                    {product.number} / {products.length}
                  </span>
                </div>

                {/* Product image label */}
                <div className="absolute bottom-6 left-6">
                  <span
                    className="
                      text-[8px] uppercase tracking-[0.3em]
                      text-black/25
                      dark:text-white/25
                    "
                  >
                    Product photography
                  </span>

                  <p
                    className="
                      mt-1 text-xs uppercase tracking-[0.2em]
                      text-black/50
                      dark:text-white/50
                    "
                  >
                    Coming soon
                  </p>
                </div>

                {/* Accent word */}
                <div
                  className="
                    absolute right-6 top-1/2
                    hidden -translate-y-1/2 rotate-90
                    text-[9px] font-bold uppercase
                    tracking-[0.5em]
                    text-black/20
                    dark:text-white/20
                    md:block
                  "
                >
                  {product.accent}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={previous}
                aria-label="Previous product"
                className="
                  flex h-11 w-11 items-center justify-center
                  border border-black/15
                  bg-white/50
                  text-black
                  backdrop-blur-sm
                  transition-all
                  hover:border-[#FF0000]
                  hover:bg-[#FF0000]
                  hover:text-white
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
                  flex h-11 w-11 items-center justify-center
                  border border-black/15
                  bg-white/50
                  text-black
                  backdrop-blur-sm
                  transition-all
                  hover:border-[#FF0000]
                  hover:bg-[#FF0000]
                  hover:text-white
                  dark:border-white/15
                  dark:bg-black/30
                  dark:text-white
                "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col justify-between">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-[#FF0000]">
                    {product.category}
                  </p>

                  <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-5xl">
                    {product.name}
                    <span className="text-[#FF0000]">.</span>
                  </h3>

                  <p
                    className="
                      mt-6 max-w-sm text-sm leading-6
                      text-black/40
                      dark:text-white/40
                    "
                  >
                    {product.description}
                  </p>

                  <p className="mt-7 text-lg font-bold">
                    {product.price}
                  </p>

                  <a
                    href="#"
                    className="
                      group mt-8 flex w-fit items-center gap-4
                      bg-black px-6 py-4
                      text-xs font-bold uppercase
                      tracking-[0.18em] text-white
                      transition-all
                      hover:bg-[#FF0000]
                      dark:bg-white dark:text-black
                      dark:hover:bg-[#FF0000]
                      dark:hover:text-white
                    "
                  >
                    Shop product

                    <ArrowUpRight
                      size={16}
                      className="
                        transition-transform duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                      "
                    />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Product selector */}
            <div className="mt-12 lg:mt-0">
              <p
                className="
                  mb-4 text-[9px] font-bold uppercase
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
                    className={`group flex w-full items-center justify-between border-b py-4 text-left transition-all ${
                      activeIndex === index
                        ? "border-[#FF0000]"
                        : "border-black/10 dark:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-[9px] ${
                          activeIndex === index
                            ? "text-[#FF0000]"
                            : "text-black/25 dark:text-white/25"
                        }`}
                      >
                        {item.number}
                      </span>

                      <span
                        className={`text-xs font-bold uppercase tracking-wide transition-colors ${
                          activeIndex === index
                            ? "text-black dark:text-white"
                            : "text-black/40 group-hover:text-black dark:text-white/40 dark:group-hover:text-white"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    <span
                      className="
                        text-xs
                        text-black/30
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

        {/* Bottom line */}
        <div
          className="
            mt-12 flex items-center justify-between
            border-t border-black/10
            pt-5
            dark:border-white/10
          "
        >
          <span
            className="
              text-[9px] uppercase tracking-[0.25em]
              text-black/25
              dark:text-white/25
            "
          >
            Designed to move
          </span>

          <span
            className="
              text-[9px] uppercase tracking-[0.25em]
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