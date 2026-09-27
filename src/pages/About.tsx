import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-[#F5F5F2] text-[#080808]">
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-20 lg:pb-32">
        {/* =====================================================
            BACKGROUND WATERMARK
        ====================================================== */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[-5%]
            top-[-5%]
            z-0
            select-none
            text-[clamp(15rem,35vw,35rem)]
            font-black
            leading-none
            tracking-[-0.1em]
            text-black/[0.035]
          "
        >
          08
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          {/* =====================================================
              TOP HEADER
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-16 flex items-center justify-between border-b border-black/10 pb-5 sm:mb-24"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em]">
              About Virat
            </span>

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-black/40">
              The brand
            </span>
          </motion.div>

          {/* =====================================================
              HERO STATEMENT
          ====================================================== */}
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9 }}
            >
              <p className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF0000] sm:text-xs">
                <span className="h-px w-10 bg-[#FF0000]" />
                Built for movement
              </p>

              <h1
                className="
                  text-[clamp(3.5rem,8vw,7rem)]
                  font-black
                  uppercase
                  leading-[0.8]
                  tracking-[-0.075em]
                "
              >
                Built for
                <br />
                the game.
              </h1>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex items-end"
            >
              <div className="border-l-2 border-[#FF0000] pl-6">
                <p className="text-xl font-medium leading-relaxed text-black/70 sm:text-2xl sm:leading-relaxed">
                  Virat was built around a simple idea — create sportswear
                  that moves with you, on the field and beyond it.
                </p>
              </div>
            </motion.div>
          </div>

          {/* =====================================================
              BRAND STORY
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mt-20 border-y border-black/10 py-16 lg:mt-28 lg:py-24"
          >
            <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:gap-20">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40">
                  01 — Our story
                </span>
              </div>

              <div className="max-w-4xl">
                <h2 className="text-3xl font-black uppercase leading-tight tracking-[-0.04em] sm:text-5xl">
                  Sport is where we start.
                  <br />
                  <span className="text-[#FF0000]">
                    Movement is where we go.
                  </span>
                </h2>

                <div className="mt-10 grid gap-8 text-sm leading-7 text-black/60 sm:grid-cols-2 sm:text-base">
                  <p>
                    Virat is a sportswear and cricket-focused brand built for
                    people who live around the game. From training sessions
                    and match days to everything that happens away from the
                    field, our products are designed to keep up with movement.
                  </p>

                  <p>
                    We believe sportswear should feel natural — functional
                    enough for performance, comfortable enough for everyday
                    life, and distinctive enough to feel like your own.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              THREE BRAND VALUES
          ====================================================== */}
          <div className="grid border-b border-black/10 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Built for cricket",
                text: "Designed around the demands of the game, from practice sessions to match day.",
              },
              {
                number: "02",
                title: "Made to move",
                text: "Comfort, flexibility and function come together in everything we create.",
              },
              {
                number: "03",
                title: "Beyond the field",
                text: "Sportswear that fits into everyday life just as naturally as it fits into sport.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  p-7
                  sm:p-8
                  lg:p-10
                  ${index !== 0 ? "border-t border-black/10 sm:border-l sm:border-t-0" : ""}
                `}
              >
                <span className="text-xs font-black text-[#FF0000]">
                  {item.number}
                </span>

                <h3 className="mt-10 text-lg font-black uppercase tracking-[-0.02em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-black/50">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* =====================================================
              FINAL STATEMENT
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="pt-20 lg:pt-28"
          >
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
                  Sport is the starting point.
                  <br />
                  <span className="text-[#FF0000]">
                    Movement is the mindset.
                  </span>
                </p>
              </div>

              <div className="shrink-0">
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em]">
                  Keep moving
                  <ArrowUpRight
                    size={18}
                    className="text-[#FF0000]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;