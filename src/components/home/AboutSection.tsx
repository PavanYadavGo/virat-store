import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const highlights = [
  {
    number: "01",
    title: "Built for cricket",
    description:
      "Performance-inspired sportswear designed around the game and the people who play it.",
  },
  {
    number: "02",
    title: "Made to move",
    description:
      "From training sessions to everyday life, every piece is made to keep up.",
  },
  {
    number: "03",
    title: "Beyond the field",
    description:
      "A sports-first identity that fits just as naturally into everyday movement.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#F5F5F2]
        px-5
        py-20
        text-[#080808]
        sm:px-8
        lg:px-10
      "
    >
      {/* Background number */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-20px]
          top-1/2
          z-0
          -translate-y-1/2
          select-none
          text-[clamp(10rem,24vw,24rem)]
          font-black
          leading-none
          tracking-[-0.1em]
          text-black/[0.045]
        "
      >
        04
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="
            mb-12
            flex
            items-center
            justify-between
            border-b
            border-black/10
            pb-5
            sm:mb-16
          "
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em]">
            About Virat
          </span>

          <span className="text-xs font-medium uppercase tracking-[0.2em] text-black/40">
            The brand
          </span>
        </motion.div>

        {/* Main statement */}
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-6 max-w-xl text-sm font-semibold uppercase tracking-[0.18em] text-[#FF0000]">
              More than sportswear.
            </p>

            <h2
              className="
                max-w-5xl
                text-[clamp(3rem,9vw,6rem)]
                font-black
                uppercase
                leading-[0.82]
                tracking-[-0.075em]
              "
            >
              Built for the
              <br />
              <span className="text-[#FF0000]">game.</span>
              <br />
              Made for
              <br />
              everything
              <br />
              beyond it.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-end"
          >
            <div className="max-w-md border-l-2 border-[#FF0000] pl-6">
              <p className="text-lg font-medium leading-relaxed text-black/70 sm:text-xl">
                Virat is built around movement, competition and everyday
                confidence. A cricket-first sportswear identity designed for
                the moments that happen on the field — and everything that
                happens after.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em]">
                <span>Move with purpose</span>
                <ArrowUpRight className="h-4 w-4 text-[#FF0000]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="mt-20 grid border-t border-black/10 sm:mt-28 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="
                group
                border-b
                border-black/10
                py-8
                lg:border-b-0
                lg:border-r
                lg:px-8
                lg:py-10
                lg:first:pl-0
                lg:last:border-r-0
              "
            >
              <div className="mb-10 flex items-start justify-between">
                <span className="text-xs font-bold tracking-[0.2em] text-black/40">
                  {item.number}
                </span>

                <ArrowUpRight
                  className="
                    h-5
                    w-5
                    text-black/30
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-[#FF0000]
                  "
                />
              </div>

              <h3 className="text-2xl font-black uppercase tracking-[-0.04em] sm:text-3xl">
                {item.title}
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/55">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mt-16
            flex
            flex-col
            gap-6
            border-t
            border-black/10
            pt-8
            sm:mt-20
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <p className="max-w-2xl text-sm leading-relaxed text-black/50 sm:text-base">
            Sport is the starting point. Movement is the mindset.
          </p>

          <span className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-none tracking-[-0.07em]">
            Keep moving<span className="text-[#FF0000]">.</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}