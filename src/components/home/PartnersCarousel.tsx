
import { motion } from "motion/react";

import partner1 from "../../assets/client/1.png";
import partner2 from "../../assets/client/2.png";
import partner3 from "../../assets/client/3.png";
import partner4 from "../../assets/client/4.png";
import partner5 from "../../assets/client/5.png";
import partner6 from "../../assets/client/6.png";
import partner7 from "../../assets/client/7.png";
import partner8 from "../../assets/client/8.png";
import partner9 from "../../assets/client/9.png";
import partner10 from "../../assets/client/10.png";
import partner11 from "../../assets/client/11.png";
import partner12 from "../../assets/client/12.png";

const partners = [
  { name: "Partner 1", image: partner1 },
  { name: "Partner 2", image: partner2 },
  { name: "Partner 3", image: partner3 },
  { name: "Partner 4", image: partner4 },
  { name: "Partner 5", image: partner5 },
  { name: "Partner 6", image: partner6 },
  { name: "Partner 7", image: partner7 },
  { name: "Partner 8", image: partner8 },
  { name: "Partner 9", image: partner9 },
  { name: "Partner 10", image: partner10 },
  { name: "Partner 11", image: partner11 },
  { name: "Partner 12", image: partner12 },
];

const PartnersCarousel = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        border-y
        border-black/10
        bg-[#F5F5F2]
        py-10
        text-[#080808]
        sm:py-14
        lg:py-16
      "
      aria-label="Our partners"
    >
      <div className="relative z-10 overflow-hidden">
        <motion.div
          className="
            flex
            w-max
            items-center
            gap-16
            sm:gap-24
            lg:gap-32
          "
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="
                flex
                h-16
                w-28
                shrink-0
                items-center
                justify-center
                sm:h-20
                sm:w-36
                lg:h-24
                lg:w-44
              "
            >
              <img
                src={partner.image}
                alt={index < partners.length ? partner.name : ""}
                aria-hidden={index >= partners.length}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
