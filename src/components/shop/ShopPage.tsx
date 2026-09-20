import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

type ShopPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  categories: string[];
};

const ShopPage = ({
  eyebrow,
  title,
  description,
  categories,
}: ShopPageProps) => {
  return (
    <main
      className="
        min-h-screen
        bg-[#F5F5F2]
        text-[#080808]
        transition-colors duration-300
        dark:bg-[#050505]
        dark:text-white
      "
    >
      {/* Hero */}
      <section
        className="
          relative
          flex min-h-[75svh]
          items-end
          overflow-hidden
          px-5 pb-16 pt-32
          sm:px-8 sm:pb-20
          lg:px-10 lg:pb-24
        "
      >
        {/* Background number */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute right-[-10px] top-1/2
            z-0
            -translate-y-1/2
            select-none
            text-[clamp(12rem,30vw,30rem)]
            font-black
            leading-none
            tracking-[-0.12em]
            text-black/[0.045]
            dark:text-white/[0.045]
          "
        >
          01
        </div>

        {/* Red glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-40
            top-1/3
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#FF0000]/10
            blur-[140px]
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              mb-6
              text-xs
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#FF0000]
            "
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.05,
              ease: "easeOut",
            }}
            className="
              max-w-6xl
              text-[clamp(4.5rem,15vw,11rem)]
              font-black
              uppercase
              leading-[0.76]
              tracking-[-0.09em]
            "
          >
            {title}
            <span className="text-[#FF0000]">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="
              mt-10
              grid
              gap-8
              lg:grid-cols-[1fr_0.45fr]
              lg:items-end
            "
          >
            <p
              className="
                max-w-2xl
                text-base
                leading-relaxed
                text-black/55
                sm:text-lg
                dark:text-white/55
              "
            >
              {description}
            </p>

            <div
              className="
                flex
                items-center
                gap-3
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-black/40
                dark:text-white/40
              "
            >
              <ArrowDown size={14} />
              Explore collection
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category navigation */}
      <section
        className="
          border-y
          border-black/10
          bg-[#ECECE8]
          dark:border-white/10
          dark:bg-[#090909]
        "
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {categories.map((category, index) => (
              <Link
                key={category}
                to="#"
                className="
                  group
                  flex
                  min-h-[120px]
                  items-center
                  justify-between
                  border-b
                  border-black/10
                  px-1
                  py-6
                  transition-colors
                  hover:bg-black
                  hover:text-white
                  dark:border-white/10
                  dark:hover:bg-white
                  dark:hover:text-black
                  sm:px-5
                  lg:border-b-0
                  lg:border-r
                  lg:first:border-l
                "
              >
                <div className="flex items-center gap-5">
                  <span
                    className="
                      text-[10px]
                      font-bold
                      tracking-[0.2em]
                      text-[#FF0000]
                    "
                  >
                    0{index + 1}
                  </span>

                  <span
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.15em]
                    "
                  >
                    {category}
                  </span>
                </div>

                <ArrowUpRight
                  size={16}
                  className="
                    opacity-40
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:opacity-100
                  "
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products placeholder */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="
                mb-4
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#FF0000]
              "
            >
              Collection
            </p>

            <h2
              className="
                text-[clamp(3rem,9vw,6rem)]
                font-black
                uppercase
                leading-[0.8]
                tracking-[-0.075em]
              "
            >
              Explore
              <br />
              the range<span className="text-[#FF0000]">.</span>
            </h2>
          </div>

          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-black/35
              dark:text-white/35
            "
          >
            00 Products
          </span>
        </div>

        <div
          className="
            flex
            min-h-[320px]
            items-center
            justify-center
            border
            border-dashed
            border-black/15
            dark:border-white/15
          "
        >
          <div className="text-center">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-black/30
                dark:text-white/30
              "
            >
              Product catalogue
            </p>

            <p
              className="
                mt-3
                text-sm
                text-black/40
                dark:text-white/40
              "
            >
              Products will appear here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage;
