import {
  ShoppingBag,
  Search,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import logo from "../../assets/virat logo.png";
import whiteLogo from "../../assets/Logo_white.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("virat-theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("virat-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("virat-theme", "light");
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="
        fixed left-0 top-0 z-50 w-full
        border-b border-black/[0.08]
        bg-[#F5F5F2]/95
        backdrop-blur-md
        transition-colors duration-300
        dark:border-white/[0.08]
        dark:bg-[#050505]/90
      "
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* LOGO */}
        <motion.a
          href="#"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <img
            src={darkMode ? whiteLogo : logo}
            alt="VIRAT"
            className="h-9 w-auto object-contain"
          />
        </motion.a>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          {[
            "Shop",
            "Cricket",
            "Sports",
            "Casual",
            "New Arrivals",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="
                group relative text-sm font-medium
                uppercase tracking-wide
                text-black/65
                transition-colors duration-300
                hover:text-black
                dark:text-white/65
                dark:hover:text-white
              "
            >
              {item}

              <span
                className="
                  absolute -bottom-2 left-0 h-px w-0
                  bg-[#FF0000]
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 text-[#080808] dark:text-white">

          {/* SEARCH */}
          <button
            aria-label="Search"
            className="
              transition-all duration-200
              hover:-translate-y-0.5
              hover:text-[#FF0000]
            "
          >
            <Search
              size={20}
              strokeWidth={1.8}
            />
          </button>

          {/* THEME TOGGLE */}
          <motion.button
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="
              relative flex h-9 w-9 items-center
              justify-center overflow-hidden
              rounded-full
              border border-black/10
              bg-black/[0.03]
              text-black
              transition-all duration-300
              hover:border-[#FF0000]/50
              hover:text-[#FF0000]
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-white
            "
          >
            <motion.div
              key={darkMode ? "sun" : "moon"}
              initial={{
                rotate: -90,
                opacity: 0,
                scale: 0.6,
              }}
              animate={{
                rotate: 0,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {darkMode ? (
                <Sun size={17} strokeWidth={1.8} />
              ) : (
                <Moon size={17} strokeWidth={1.8} />
              )}
            </motion.div>
          </motion.button>

          {/* SHOPPING BAG */}
          <button
            aria-label="Shopping bag"
            className="
              relative transition-all duration-200
              hover:-translate-y-0.5
              hover:text-[#FF0000]
            "
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.8}
            />

            <span
              className="
                absolute -right-2 -top-2
                flex h-4 w-4 items-center justify-center
                rounded-full
                bg-[#FF0000]
                text-[9px] font-bold text-white
              "
            >
              0
            </span>
          </button>

          {/* MOBILE MENU */}
          <button
            aria-label="Open menu"
            className="
              transition-all duration-200
              hover:text-[#FF0000]
              md:hidden
            "
          >
            <Menu
              size={22}
              strokeWidth={1.8}
            />
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;