import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import TeamImage from "../../assets/categories/teamwear.png";

const TeamwearSection = () => {
  return (
    <section className="bg-[#F5F5F2] text-[#080808] mb-10">
      {/* TEAMWEAR HEADER */}
      <div
        className="
          flex
          min-h-[74px]
          items-center
          justify-center
          border-b
          border-black/30
          px-5
          py-5
          sm:min-h-[90px]
        "
      >
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="
            text-center
            text-[clamp(1.5rem,3vw,2.5rem)]
            font-black
            uppercase
            leading-none
            tracking-[-0.05em]
          "
        >
          Teamwear
        </motion.h2>
      </div>

      {/* TEAMWEAR IMAGE */}
      <motion.a
        href="/teamwear"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          group
          relative
          block
          h-[320px]
          overflow-hidden
          border-b
          border-black/30
          sm:h-[420px]
          md:h-[520px]
          lg:h-[600px]
        "
      >
        <img
          src={TeamImage}
          alt="Teamwear"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* IMAGE OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/30
            via-transparent
            to-black/30
          "
        />

        {/* CONTENT */}
        <div
          className="
            absolute
            inset-x-5
            bottom-5
            flex
            items-end
            justify-between
            sm:inset-x-8
            sm:bottom-8
            md:inset-x-10
            md:bottom-10
          "
        >
          <div>
            <p
              className="
                mb-2
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                text-white/80
              "
            >
              Built For The Team
            </p>

            <h3
              className="
                text-[clamp(2.5rem,7vw,6rem)]
                font-black
                uppercase
                leading-[0.8]
                tracking-[-0.07em]
                text-white
              "
            >
              Teamwear
            </h3>
          </div>

          {/* ARROW */}
          <div
            className="
              flex
              h-11
              w-11
              translate-y-3
              items-center
              justify-center
              bg-white
              opacity-0
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
              sm:h-14
              sm:w-14
            "
          >
            <ArrowUpRight
              size={22}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </div>
        </div>

        {/* RED HOVER LINE */}
        <div
          className="
            absolute
            bottom-0
            left-0
            h-1
            w-full
            origin-left
            scale-x-0
            bg-[#FF0000]
            transition-transform
            duration-500
            group-hover:scale-x-100
          "
        />
      </motion.a>
    </section>
  );
};

export default TeamwearSection;