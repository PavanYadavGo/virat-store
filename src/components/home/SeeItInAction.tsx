import React, { useState, useRef } from "react";
import { ArrowUpRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "motion/react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  url: string;
  videoUrl: string;
  posterUrl: string;
  Icon: typeof FaInstagram;
}

const videos: VideoItem[] = [
  {
    id: "01",
    title: "Match Day",
    description: "Built for the pressure.",
    platform: "Instagram",
    url: "https://www.instagram.com/reels/DeY9WWXM0l_/",
    videoUrl: "/videos/seeitinaction1.mp4",
    posterUrl: "/images/action/poster-1.webp",
    Icon: FaInstagram,
  },
  {
    id: "02",
    title: "Train Hard",
    description: "Made to move.",
    platform: "Instagram",
    url: "https://www.instagram.com/reel/DeV8mbcqJ-L/?exln=eTY1czhidXBzamp5",
    videoUrl: "/videos/seeitinaction2.mp4",
    posterUrl: "/images/action/poster-2.webp",
    Icon: FaInstagram,
  },
  {
    id: "03",
    title: "Game Ready",
    description: "Performance without compromise.",
    platform: "Facebook",
    url: "https://www.facebook.com/share/v/1MKc2ormHS/",
    videoUrl: "/videos/seeitinaction3.mp4",
    posterUrl: "/images/action/poster-3.webp",
    Icon: FaFacebookF,
  },
  {
    id: "04",
    title: "Relentless",
    description: "Built for every session.",
    platform: "Instagram",
    url: "https://www.instagram.com/",
    videoUrl: "/videos/seeitinaction4.mp4",
    posterUrl: "/images/action/poster-4.webp",
    Icon: FaInstagram,
  },
];

const ActionVideoCard = ({ video, index }: { video: VideoItem; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col overflow-hidden border border-black/10 bg-white transition-colors duration-300 hover:border-[#FF0000]/60"
    >
      {/* Video */}
      <div
        onClick={togglePlay}
        className="relative aspect-[9/14] w-full cursor-pointer overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.posterUrl}
          playsInline
          loop
          muted={isMuted}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Ambient subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Play/Pause overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-[#FF0000]">
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" className="ml-1" />
            )}
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-[#FF0000]"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Badge */}
        <div className="absolute left-3 top-3 z-10 bg-black/80 px-2 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          VIRAT REEL {video.id}
        </div>
      </div>

      {/* Card information */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF0000]">
            {video.description}
          </p>

          <h3 className="text-xl font-black uppercase leading-none tracking-[-0.05em] text-[#080808] sm:text-2xl">
            {video.title}
            <span className="text-[#FF0000]">.</span>
          </h3>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-black/50">
            <video.Icon size={12} />
            Watch on {video.platform}
          </div>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${video.title} on ${video.platform}`}
            className="flex h-8 w-8 items-center justify-center border border-black/10 transition-all duration-300 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white"
          >
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

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
              04 Featured videos
            </div>
          </motion.div>
        </div>

        {/* Responsive Video Grid */}
        <div
          className="
            mt-10 grid grid-cols-1 gap-5
            sm:mt-14 sm:grid-cols-2 lg:grid-cols-4
          "
        >
          {videos.map((video, index) => (
            <ActionVideoCard key={video.id} video={video} index={index} />
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
