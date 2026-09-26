import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import cricketImage from "../../assets/categories/cricket.jpg";
import accessoriesImage from "../../assets/categories/accessories.png";
import cricketfImage from "../../assets/categories/cricket-f.jpg";
import casualImage from "../../assets/categories/casual.jpg";
import TeamImage from "../../assets/categories/teamwear.png";

const categories = [
  {
    number: "01",
    title: "Men's",
    image: cricketImage,
    href: "/men",
    imageClass: "object-cover",
    width: "11%",
    x: 0,
    y: 2,
  },
  {
    number: "02",
    title: "Women",
    image: cricketfImage,
    href: "/women",
    imageClass: "object-cover",
    width: "115%",
    x: 0,
    y: 2,
  },
  {
    number: "03",
    title: "Youth",
    image: casualImage,
    href: "#",
    imageClass: "object-cover",
    width: "115%",
    x: 0,
    y: 2,
  },
  {
    number: "04",
    title: "Cap",
    image: accessoriesImage,
    href: "/accessories",
    imageClass: "object-cover",
    width: "115%",
    x: 0,
    y: 2,
  },
  {
    number: "05",
    title: "Bag & Kitbag Range",
    image: TeamImage,
    href: "/accessories",
    imageClass: "object-cover",
    width: "115%",
    x: 0,
    y: 2,
  },
  {
    number: "06",
    title: "Accessories",
    image: accessoriesImage,
    href: "/accessories",
    imageClass: "object-cover",
    width: "115%",
    x: 0,
    y: 2,
  },
];

const CategorySection = () => {
  return (
    <section className="bg-[#F5F5F2] text-[#080808] mt-10">
      {/* =====================================================
          FIND YOUR GAME
      ====================================================== */}

      <div className="grid border-y border-black/30 md:grid-cols-4">
        {/* FIND YOUR GAME */}

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="
            flex
            min-h-[150px]
            items-center
            justify-center
            border-b
            border-black/30
            px-6
            py-10
            text-center
            md:min-h-[185px]
            md:border-b-0
            md:border-r
          "
        >
          <h2
            className="
              text-[clamp(2rem,4vw,3.5rem)]
              font-black
              uppercase
              leading-[0.85]
              tracking-[-0.06em]
            "
          >
            Find Your
            <br />
            Game
          </h2>
        </motion.div>

        {/* CRICKET IMAGE */}

        <motion.a
          href="/cricket"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="
            group
            relative
            min-h-[185px]
            overflow-hidden
            border-b
            border-black/30
            md:border-b-0
            md:border-r
          "
        >
          <img
            src={cricketImage}
            alt="Cricket"
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

          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

          <div
            className="
              absolute
              bottom-4
              right-4
              flex
              h-9
              w-9
              items-center
              justify-center
              bg-white
              opacity-0
              transition-all
              duration-300
              group-hover:opacity-100
            "
          >
            <ArrowUpRight size={17} />
          </div>
        </motion.a>

        {/* CRICKET TITLE */}

        <motion.a
          href="/cricket"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="
            flex
            min-h-[120px]
            items-center
            justify-center
            border-b
            border-black/30
            px-6
            md:min-h-[185px]
            md:border-b-0
            md:border-r
          "
        >
          <h3
            className="
              text-[clamp(2rem,4vw,3.5rem)]
              font-black
              uppercase
              leading-none
              tracking-[-0.06em]
              transition-colors
              duration-300
              hover:text-[#FF0000]
            "
          >
            Cricket
          </h3>
        </motion.a>

        {/* CRICKET IMAGE 2 */}

        <motion.a
          href="/cricket"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="
            group
            relative
            min-h-[185px]
            overflow-hidden
          "
        >
          <img
            src={cricketfImage}
            alt="Cricket collection"
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

          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

          <div
            className="
              absolute
              bottom-4
              right-4
              flex
              h-9
              w-9
              items-center
              justify-center
              bg-white
              opacity-0
              transition-all
              duration-300
              group-hover:opacity-100
            "
          >
            <ArrowUpRight size={17} />
          </div>
        </motion.a>
      </div>

      {/* =====================================================
          SHOP BY CATEGORY HEADER
      ====================================================== */}

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
          Shop By Category
        </motion.h2>
      </div>

      {/* =====================================================
          CATEGORY GRID
      ====================================================== */}

      <div className="grid border-b border-black/30 md:grid-cols-3">
        {categories.map((category, index) => (
          <motion.a
            key={category.number}
            href={category.href}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`
              group
              relative
              h-[260px]
              overflow-hidden
              border-b
              border-black/30
              md:h-[300px]
              md:border-r
              md:[&:nth-child(3n)]:border-r-0
              md:[&:nth-child(n+4)]:border-b-0
            `}
          >
            {/* IMAGE */}

            <img
              src={category.image}
              alt={category.title}
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

            {/* IMAGE FADE */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-black/30
                via-transparent
                to-transparent
                opacity-70
              "
            />

            {/* TOP LABEL */}

            <div
              className="
                absolute
                left-5
                top-4
                right-5
                flex
                items-center
                justify-between
                sm:left-6
                sm:right-6
                sm:top-5
              "
            >
              <span
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[-0.02em]
                  text-white
                  drop-shadow-sm
                "
              >
                {category.title}
              </span>

              <span
                className="
                  text-[10px]
                  font-medium
                  tracking-[0.15em]
                  text-white/70
                "
              >
                {category.number}
              </span>
            </div>

            {/* HOVER ARROW */}

            <div
              className="
                absolute
                bottom-5
                right-5
                flex
                h-10
                w-10
                translate-y-3
                items-center
                justify-center
                bg-white
                opacity-0
                transition-all
                duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
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
        ))}
      </div>
    </section>
  );
};

export default CategorySection;