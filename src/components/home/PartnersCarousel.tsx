import {
  faApple,
  faGithub,
  faGoogle,
  faMeta,
  faMicrosoft,
  faSpotify,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";

const partners = [
  { name: "Apple", icon: faApple },
  { name: "Google", icon: faGoogle },
  { name: "Microsoft", icon: faMicrosoft },
  { name: "Meta", icon: faMeta },
  { name: "Spotify", icon: faSpotify },
  { name: "Twitch", icon: faTwitch },
  { name: "YouTube", icon: faYoutube },
  { name: "GitHub", icon: faGithub },
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
    >

      {/* CAROUSEL */}

      <div className="relative z-10 overflow-hidden">
        <motion.div
          className="
            flex
            w-max
            items-center
            gap-20
            sm:gap-28
            lg:gap-40
          "
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* FIRST SET */}

          {partners.map((partner) => (
            <div
              key={`first-${partner.name}`}
              className="
                flex
                shrink-0
                items-center
                justify-center
                text-black/25
                transition-colors
                duration-300
                hover:text-black
              "
              aria-label={partner.name}
            >
              <FontAwesomeIcon
                icon={partner.icon}
                className="
                  text-[4.5rem]
                  sm:text-[5.5rem]
                  lg:text-[7rem]
                "
              />
            </div>
          ))}

          {/* DUPLICATE SET FOR SEAMLESS LOOP */}

          {partners.map((partner) => (
            <div
              key={`second-${partner.name}`}
              className="
                flex
                shrink-0
                items-center
                justify-center
                text-black/25
                transition-colors
                duration-300
                hover:text-black
              "
              aria-label={partner.name}
            >
              <FontAwesomeIcon
                icon={partner.icon}
                className="
                  text-[4.5rem]
                  sm:text-[5.5rem]
                  lg:text-[7rem]
                "
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersCarousel;