import { ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "motion/react";

const videos = [
  {
    id: "01",
    title: "Match Day",
    description: "Built for the pressure.",
    platform: "Instagram",
    url: "https://www.instagram.com/reels/DeY9WWXM0l_/",
    embedUrl: "https://www.instagram.com/reel/DeY9WWXM0l_/embed",
    Icon: FaInstagram,
  },
  {
    id: "02",
    title: "Train Hard",
    description: "Made to move.",
    platform: "Instagram",
    url: "https://www.instagram.com/reel/DeV8mbcqJ-L/?exln=eTY1czhidXBzamp5",
    embedUrl: "https://www.instagram.com/reel/DeV8mbcqJ-L/embed",
    Icon: FaInstagram,
  },
  {
    id: "03",
    title: "Game Ready",
    description: "Performance without compromise.",
    platform: "Facebook",
    url: "https://www.facebook.com/share/v/1MKc2ormHS/",
    embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      "https://www.facebook.com/share/v/1MKc2ormHS/"
    )}&show_text=false&width=500`,
    Icon: FaFacebookF,
  },
];

const SeeItInAction = () => {
  return (
    <section
      id="see-it-in-action"
      className="
        relative overflow-hidden bg-[#F5F5F2]
        px-5 py-16 text-[#080808]
        sm:px-8 sm:py-20 lg:px-10 lg:py-24
      "
    >
      {/* Background number */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-[-10px] top-1/2
          -translate-y-1/2 select-none
          text-[clamp(10rem,22vw,22rem)]
          font-black leading-none tracking-[-0.1em]
          text-black/[0.045]
        "
      >
        07
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="
                mb-4 flex items-center gap-3
                text-[11px] font-bold uppercase
                tracking-[0.35em] text-[#FF0000] sm:text-xs
              "
            >
              <span className="h-px w-10 bg-[#FF0000]" />
              VIRAT / IN MOTION
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  text-[clamp(3rem,9vw,6rem)]
                  font-black uppercase leading-[0.82]
                  tracking-[-0.075em] text-[#080808]
                "
              >
                See it
                <br />
                <span>
                  in action<span className="text-[#FF0000]">.</span>
                </span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm lg:ml-auto lg:pb-1"
          >
            <p className="text-sm leading-6 text-black/60 sm:text-base sm:leading-7">
              From the field to the streets, see Virat in motion.
              Real moments. Real energy. Made for the game.
            </p>

            <div
              className="
                mt-5 flex items-center gap-3
                text-[10px] font-bold uppercase
                tracking-[0.25em] text-black/40
              "
            >
              <span className="h-px w-8 bg-current" />
              03 Featured videos
            </div>
          </motion.div>
        </div>

        {/* Original platform video players */}
        <div
          className="
            mt-10 grid grid-cols-1 gap-5
            sm:mt-14 sm:grid-cols-2 lg:grid-cols-3
          "
        >
          {videos.map((video, index) => (
            <motion.article
              key={video.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group relative overflow-hidden
                border border-black/10 bg-white
                transition-colors duration-300
                hover:border-[#FF0000]/60
              "
            >
              {/* Video */}
              <div className="relative aspect-[9/13] overflow-hidden bg-black">
                <iframe
                  src={video.embedUrl}
                  title={`${video.title} — ${video.platform}`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Card information */}
              <div className="p-5 sm:p-6">
                <p
                  className="
                    mb-2 text-[9px] font-bold uppercase
                    tracking-[0.2em] text-[#FF0000]
                  "
                >
                  {video.description}
                </p>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3
                      className="
                        text-2xl font-black uppercase
                        leading-none tracking-[-0.05em]
                        text-[#080808] sm:text-3xl
                      "
                    >
                      {video.title}
                      <span className="text-[#FF0000]">.</span>
                    </h3>

                    <div
                      className="
                        mt-3 flex items-center gap-2
                        text-[9px] font-bold uppercase
                        tracking-[0.18em] text-black/50
                      "
                    >
                      <video.Icon size={13} />
                      Watch on {video.platform}
                    </div>
                  </div>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${video.title} on ${video.platform}`}
                    className="
                      flex h-10 w-10 shrink-0 items-center
                      justify-center border border-black/10
                      transition-all duration-300
                      hover:border-[#FF0000] hover:bg-[#FF0000]
                      hover:text-white
                    "
                  >
                    <ArrowUpRight
                      size={19}
                      strokeWidth={1.5}
                    />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="
            group mt-10 flex items-center justify-between
            border-t border-black/10 pt-5
          "
        >
          <div className="flex items-center gap-3">
            <FaInstagram size={16} />

            <span
              className="
                text-[10px] font-bold uppercase
                tracking-[0.25em] text-black/50
                transition-colors duration-300
                group-hover:text-[#FF0000]
              "
            >
              Follow Virat on Instagram
            </span>
          </div>

          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            className="
              text-black/40 transition-all duration-300
              group-hover:-translate-y-1 group-hover:translate-x-1
              group-hover:text-[#FF0000]
            "
          />
        </motion.a>
      </div>
    </section>
  );
};

export default SeeItInAction;