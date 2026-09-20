import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const DesignYourOwn = () => {
  return (
    <>
      <Navbar />

      <main
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#F5F5F2]
          px-5
          pb-24
          pt-32
          text-[#080808]
          dark:bg-[#050505]
          dark:text-white
          sm:px-8
          lg:px-10
          lg:pb-32
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[-10px]
            top-1/2
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

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-40
            top-1/4
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#FF0000]/10
            blur-[140px]
          "
        />

        <div className="relative z-10 mx-auto flex min-h-[75svh] max-w-7xl flex-col justify-end">
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
            Personalise it
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              max-w-6xl
              text-[clamp(4.5rem,15vw,11rem)]
              font-black
              uppercase
              leading-[0.76]
              tracking-[-0.09em]
            "
          >
            Design
            <br />
            Your Own<span className="text-[#FF0000]">.</span>
          </motion.h1>

          <div className="mt-10 max-w-xl">
            <p className="text-base leading-relaxed text-black/55 dark:text-white/55 sm:text-lg">
              Create something that's yours. Personalise your Virat kit and
              make it your own.
            </p>

            <button
              type="button"
              className="
                group
                mt-8
                flex
                items-center
                gap-3
                bg-[#FF0000]
                px-6
                py-4
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-white
                transition-transform
                duration-300
                hover:translate-x-1
              "
            >
              Start designing

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default DesignYourOwn;
