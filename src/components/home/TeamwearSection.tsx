import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import TeamImage from "../../assets/categories/TEAM.png";
import trendingImage from "../../assets/categories/trending.webp";

const TeamwearSection = () => {
  return (
    <section className="mb-10 bg-[#F5F5F2] text-[#080808]">
      {/* SECTION HEADER */}
      <div className="flex min-h-[74px] items-center justify-center border-b border-black/30 px-5 py-5 sm:min-h-[90px]">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="
            text-center text-[clamp(1.5rem,3vw,2.5rem)]
            font-black uppercase leading-none tracking-[-0.05em]
          "
        >
          Explore Collections
        </motion.h2>
      </div>

      {/* TEAMWEAR + TRENDING PRODUCTS (80:20 Ratio on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-[80%_20%]">
        {/* TEAMWEAR CARD (80%) */}
        <motion.a
          href="/teamwear"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="
            group relative flex h-[240px] items-center justify-center
            overflow-hidden border-b border-black/30 p-0
            sm:h-[320px] md:h-[380px] md:border-r lg:h-[440px]
          "
          aria-label="Explore Teamwear"
        >
          <img
            src={TeamImage}
            alt="Teamwear collection"
            loading="lazy"
            decoding="async"
            className="
              h-full w-full object-fill
              transition-transform duration-500
              group-hover:scale-[1.02]
            "
          />

          {/* RED HOVER ACCENT LINE */}
          <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#FF0000] transition-transform duration-500 group-hover:scale-x-100" />
        </motion.a>

        {/* TRENDING PRODUCTS CARD (20%) */}
        <motion.a
          href="/products"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            group relative flex h-[260px] items-center justify-center
            overflow-hidden border-b border-black/30 p-0
            transition-colors duration-300
            sm:h-[320px] md:h-[380px] lg:h-[440px]
          "
          aria-label="Explore Trending Products"
        >
          <img
            src={trendingImage}
            alt="Trending products collection"
            loading="lazy"
            decoding="async"
            className="
              h-full w-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-105
            "
          />

          {/* SUBTLE DARK TRANSLUCENT GRADIENT OVERLAY */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300" />

          {/* TOP FLOATING LABEL WITH TRENDING INDICATOR */}
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 shadow-sm backdrop-blur-md transition-colors duration-300 group-hover:border-[#FF0000]/60 group-hover:bg-black/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF0000] opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF0000]" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/90">
              Trending
            </span>
          </div>

          {/* BOTTOM OVERLAY CONTENT */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-4 sm:p-5 lg:p-6">
            <div>
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#FF0000]">
                Hot Picks
              </p>
              <h3 className="text-xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-2xl lg:text-[1.65rem]">
                Trending<br />Products<span className="text-[#FF0000]">.</span>
              </h3>
            </div>

            {/* INTERACTIVE HOVER ARROW BADGE */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white sm:h-10 sm:w-10">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>

          {/* RED HOVER ACCENT LINE */}
          <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#FF0000] transition-transform duration-500 group-hover:scale-x-100" />
        </motion.a>
      </div>
    </section>
  );
};

export default TeamwearSection;