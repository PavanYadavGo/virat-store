import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const footerLinks = {
  Shop: [
    "New Arrivals",
    "Men",
    "Women",
    "Cricket",
    "Accessories",
  ],
  Sports: [
    "Cricket",
    "Football",
    "Shooting",
    "Training",
    "India Merchandise",
    "Shop Outlet",
  ],
  Categories: [
    "Tops",
    "Polos",
    "Sleeveless",
    "Long Sleeves",
    "Jackets & Hoodies",
    "Shorts",
    "Pants & Leggings",
    "Tracksuits",
  ],
  Support: [
    "Contact",
    "Shipping",
    "Returns",
    "Size Guide",
  ],
};

const Footer = () => {
  return (
    <footer
      className="
        relative overflow-hidden
        bg-[#F5F5F2]
        text-[#080808]
      "
    >
      {/* Top border */}
      <div className="h-px w-full bg-black/10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Main footer */}
        <div
          className="
            grid gap-x-8 gap-y-12
            py-16
            sm:grid-cols-2
            lg:grid-cols-[1.2fr_1fr_1fr_1fr_0.8fr]
            lg:py-20
          "
        >
          {/* Brand */}
          <div>
            <div
              className="
                text-4xl
                font-black
                tracking-[-0.08em]
              "
            >
              VIRAT<span className="text-[#FF0000]">.</span>
            </div>

            <p
              className="
                mt-5 max-w-xs
                text-xs leading-5
                text-black/30
              "
            >
              Performance wear for the game. Sportswear for everything after
              it.
            </p>

            {/* Socials */}
            <div className="mt-7 flex flex-wrap gap-2">
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
                      "
                    >
                      <span
                        className="
                          h-1.5 w-1.5
                          shrink-0
                          rounded-full
                          bg-[#FF0000]
                          opacity-40
                          transition-all duration-300
                          group-hover:scale-150
                          group-hover:opacity-100
                        "
                      />

                      <span>{link}</span>

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

        {/* Bottom bar */}
        <div
          className="
            flex flex-col gap-4
            py-6
            text-[8px]
            uppercase
            tracking-[0.2em]
            sm:flex-row
            sm:items-center
            sm:justify-between
            text-black/80
          "
        >
          <span>© 2026 Virat. All rights reserved.</span>

          <div className="flex gap-6">
            <a
              href="#"
              className="
                transition-colors
                hover:text-black
              "
            >
              Privacy
            </a>

            <a
              href="#"
              className="
                transition-colors
                hover:text-black/60
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