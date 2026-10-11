import { motion } from "motion/react";

import TeamImage from "../../assets/categories/TEAM.png";
import TrendingImage from "../../assets/products/velocity-jersey.png";

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
        </motion.a>

        {/* TRENDING PRODUCTS CARD (20%) */}
        <motion.a
          href="/shop"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            group relative flex h-[240px] items-center justify-center
            overflow-hidden border-b border-black/30 p-0
            sm:h-[320px] md:h-[380px] lg:h-[440px]
          "
          aria-label="Explore Trending Products"
        >
          <img
            src={TrendingImage}
            alt="Trending products"
            loading="lazy"
            decoding="async"
            className="
              h-full w-full object-fill
              transition-transform duration-500
              group-hover:scale-[1.02]
            "
          />
        </motion.a>
      </div>
    </section>
  );
};

export default TeamwearSection;