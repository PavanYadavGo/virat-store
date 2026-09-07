import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    number: "01",
    title: "Cricket",
    description: "Built for the game.",
    className: "md:col-span-2 md:row-span-2",
    gradient: "from-[#000045] via-[#111111] to-black",
  },
  {
    number: "02",
    title: "Casual",
    description: "Made for every day.",
    className: "",
    gradient: "from-[#222222] via-[#111111] to-black",
  },
  {
    number: "03",
    title: "Sports",
    description: "Move without limits.",
    className: "",
    gradient: "from-[#300000] via-[#111111] to-black",
  },
];

const CategorySection = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FF0000]"
            >
              Explore the collection
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
                className="text-5xl font-black uppercase tracking-[-0.05em] sm:text-6xl lg:text-8xl"
              >
                Shop by
                <br />
                category<span className="text-[#FF0000]">.</span>
              </motion.h2>
            </div>
          </div>

          <span className="hidden text-sm font-medium text-white/30 md:block">
            03 categories
          </span>
        </div>

        {/* Category grid */}
        <div className="grid auto-rows-[280px] gap-4 md:grid-cols-2 md:auto-rows-[260px]">
          {categories.map((category, index) => (
            <motion.a
              href="#"
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative overflow-hidden bg-gradient-to-br ${category.gradient} ${category.className}`}
            >
              {/* Decorative red glow */}
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FF0000] opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-20" />

              {/* Abstract visual */}
              <div className="absolute inset-0">
                <div className="absolute right-[12%] top-[12%] h-[65%] w-[42%] rotate-12 border border-white/10 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-105" />

                <div className="absolute bottom-[-20%] right-[-5%] h-[70%] w-[45%] rounded-full bg-white/[0.025] blur-2xl transition-transform duration-700 group-hover:scale-125" />

                <div className="absolute bottom-8 right-8 text-[8rem] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.035] transition-transform duration-700 group-hover:-translate-x-4">
                  {category.title.charAt(0)}
                </div>
              </div>

              {/* Top */}
              <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                <span className="text-xs font-medium tracking-widest text-white/40">
                  {category.number}
                </span>

                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  className="text-white/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FF0000]"
                />
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/40">
                  {category.description}
                </p>

                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
                    {category.title}
                    <span className="text-[#FF0000]">.</span>
                  </h3>

                  {/* Animated line */}
                  <span className="mb-2 hidden h-px w-16 origin-right bg-[#FF0000] transition-transform duration-500 group-hover:scale-x-[1.7] sm:block" />
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-[#FF0000]/40" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;