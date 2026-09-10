import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const footerLinks = {
  Shop: ["Cricket", "Sports", "Casual", "New Arrivals"],
  Help: ["Contact", "Shipping", "Returns", "Size Guide"],
  Company: ["About Virat", "Our Story", "Journal"],
};

const Footer = () => {
  return (
    <footer
      className="
        relative overflow-hidden
        bg-[#F5F5F2]
        text-[#080808]
        transition-colors duration-300
        dark:bg-[#050505]
        dark:text-white
      "
    >
      {/* Top border */}
      <div className="h-px w-full bg-black/10 dark:bg-white/10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Newsletter */}
        <div
          className="
            grid gap-10
            border-b border-black/10
            py-16
            dark:border-white/10
            lg:grid-cols-[1fr_0.8fr]
            lg:py-24
          "
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="
                mb-4 text-xs font-bold uppercase
                tracking-[0.3em]
                text-[#FF0000]
              "
            >
              Stay in the game
            </motion.p>

            <h2
              className="
                max-w-2xl
                text-4xl
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.06em]
                sm:text-5xl
                lg:text-7xl
              "
            >
              Get the latest
              <br />
              from Virat<span className="text-[#FF0000]">.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p
              className="
                mb-6 max-w-md
                text-sm leading-6
                text-black/40
                dark:text-white/40
              "
            >
              New drops, product launches and everything happening across the
              Virat collection. No noise. Just the good stuff.
            </p>

            <form
              className="
                flex
                border-b border-black/20
                pb-3
                focus-within:border-[#FF0000]
                dark:border-white/20
              "
            >
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="
                  min-w-0 flex-1
                  bg-transparent
                  text-xs font-medium
                  tracking-wider
                  text-black
                  outline-none
                  placeholder:text-black/25
                  dark:text-white
                  dark:placeholder:text-white/25
                "
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="
                  group flex items-center gap-2
                  text-xs font-bold uppercase
                  tracking-wider
                "
              >
                Join

                <ArrowRight
                  size={16}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                    group-hover:text-[#FF0000]
                  "
                />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer */}
        <div
          className="
            grid gap-12
            py-16
            sm:grid-cols-2
            lg:grid-cols-[1.3fr_1fr_1fr_1fr]
            lg:py-20
          "
        >
          {/* Brand */}
          <div>
            <div className="text-4xl font-black tracking-[-0.08em]">
              VIRAT<span className="text-[#FF0000]">.</span>
            </div>

            <p
              className="
                mt-5 max-w-xs
                text-xs leading-5
                text-black/30
                dark:text-white/30
              "
            >
              Performance wear for the game. Sportswear for everything after
              it.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-2">
              {["Instagram", "X", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="
                    flex h-9 min-w-9
                    items-center justify-center
                    border border-black/10
                    px-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-black/50
                    transition-all duration-300
                    hover:border-[#FF0000]
                    hover:bg-[#FF0000]
                    hover:text-white
                    dark:border-white/10
                    dark:text-white/50
                  "
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p
                className="
                  mb-6
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-black/25
                  dark:text-white/25
                "
              >
                {title}
              </p>

              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="
                        group flex w-fit
                        items-center gap-2
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-black/55
                        transition-colors
                        hover:text-black
                        dark:text-white/55
                        dark:hover:text-white
                      "
                    >
                      {link}

                      <ArrowUpRight
                        size={11}
                        className="
                          opacity-0
                          transition-all duration-200
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:opacity-100
                          group-hover:text-[#FF0000]
                        "
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant brand mark */}
        <div
          className="
            overflow-hidden
            border-t border-black/10
            dark:border-white/10
          "
        >
          <div
            className="
              translate-y-[12%]
              select-none
              text-[25vw]
              font-black
              leading-[0.7]
              tracking-[-0.12em]
              text-black/[0.055]
              dark:text-white/[0.055]
            "
          >
            VIRAT
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="
            flex flex-col gap-4
            border-t border-black/10
            py-6
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-black/20
            dark:border-white/10
            dark:text-white/20
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span>© 2026 Virat. All rights reserved.</span>

          <div className="flex gap-6">
            <a
              href="#"
              className="
                transition-colors
                hover:text-black/60
                dark:hover:text-white/60
              "
            >
              Privacy
            </a>

            <a
              href="#"
              className="
                transition-colors
                hover:text-black/60
                dark:hover:text-white/60
              "
            >
              Terms
            </a>
          </div>

          <span>Made for movement.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;