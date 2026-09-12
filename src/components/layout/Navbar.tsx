import {
  ShoppingBag,
  Search,
  Menu,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import logo from "../../assets/virat logo.png";
import whiteLogo from "../../assets/Logo_white.png";

const navItems = [
  "Shop",
  "Cricket",
  "Sports",
  "Casual",
  "New Arrivals",
];

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
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
      <nav
        className="
          mx-auto flex
          h-[68px] sm:h-20
          max-w-7xl
          items-center
          justify-between
          px-4 sm:px-6 lg:px-10
        "
      >
        {/* LOGO */}
        <motion.a
          href="#"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
          onClick={closeMenu}
          className="
            flex shrink-0
            items-center
          "
        >
          <img
            src={darkMode ? whiteLogo : logo}
            alt="VIRAT"
            className="
              h-11
              w-auto
              object-contain
              sm:h-12
              lg:h-15
            "
          />
        </motion.a>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="
                group relative
                whitespace-nowrap
                text-xs font-medium
                uppercase tracking-[0.08em]
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
                  absolute -bottom-2 left-0
                  h-px w-0
                  bg-[#FF0000]
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div
          className="
            flex shrink-0
            items-center
            gap-3
            text-[#080808]
            sm:gap-4
            dark:text-white
          "
        >
          {/* SEARCH */}
          <button
            aria-label="Search"
            className="
              hidden
              transition-all duration-200
              hover:-translate-y-0.5
              hover:text-[#FF0000]
              sm:block
            "
          >
            <Search
              size={19}
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
              relative flex
              h-9 w-9
              shrink-0
              items-center justify-center
              overflow-hidden
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
                <Sun
                  size={17}
                  strokeWidth={1.8}
                />
              ) : (
                <Moon
                  size={17}
                  strokeWidth={1.8}
                />
              )}
            </motion.div>
          </motion.button>

          {/* SHOPPING BAG */}
          <button
            aria-label="Shopping bag"
            className="
              relative shrink-0
              transition-all duration-200
              hover:-translate-y-0.5
              hover:text-[#FF0000]
            "
          >
            <ShoppingBag
              size={19}
              strokeWidth={1.8}
            />

            <span
              className="
                absolute -right-2 -top-2
                flex h-4 w-4
                items-center justify-center
                rounded-full
                bg-[#FF0000]
                text-[9px]
                font-bold
                text-white
              "
            >
              0
            </span>
          </button>

          {/* MOBILE MENU */}
          <button
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              flex
              h-9 w-9
              shrink-0
              items-center justify-center
              rounded-full
              transition-all duration-200
              hover:text-[#FF0000]
              lg:hidden
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menuOpen ? "close" : "menu"}
                initial={{
                  opacity: 0,
                  rotate: -45,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 45,
                  scale: 0.7,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {menuOpen ? (
                  <X
                    size={22}
                    strokeWidth={1.8}
                  />
                ) : (
                  <Menu
                    size={22}
                    strokeWidth={1.8}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              overflow-hidden
              border-t border-black/[0.08]
              bg-[#F5F5F2]
              dark:border-white/[0.08]
              dark:bg-[#050505]
              lg:hidden
            "
          >
            <div className="px-5 pb-6 pt-3 sm:px-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  onClick={closeMenu}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  className="
                    flex items-center
                    justify-between
                    border-b border-black/[0.08]
                    py-4
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-black/75
                    transition-colors
                    hover:text-[#FF0000]
                    dark:border-white/[0.08]
                    dark:text-white/75
                  "
                >
                  {item}

                  <ArrowSmall />
                </motion.a>
              ))}

              {/* Mobile search */}
              <button
                className="
                  mt-5
                  flex w-full
                  items-center gap-3
                  rounded-full
                  border border-black/10
                  bg-black/[0.025]
                  px-4 py-3
                  text-left
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  text-black/50
                  dark:border-white/10
                  dark:bg-white/[0.03]
                  dark:text-white/50
                "
              >
                <Search
                  size={16}
                  strokeWidth={1.8}
                />

                Search products
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* Small arrow used by mobile navigation */
const ArrowSmall = () => {
  return (
    <span
      className="
        text-[#FF0000]
        transition-transform duration-300
        group-hover:translate-x-1
      "
    >
      →
    </span>
  );
};

export default Navbar;