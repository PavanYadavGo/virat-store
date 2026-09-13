import {
  ShoppingBag,
  Search,
  Menu,
  Sun,
  Moon,
  X,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import logo from "../../assets/virat logo.png";
import whiteLogo from "../../assets/Logo_white.png";

/* =========================================================
   TYPES
========================================================= */

type DropdownItem = {
  label: string;
  href: string;
};

type DropdownColumn = {
  title: string;
  items: DropdownItem[];
};

type NavItem = {
  label: string;
  href: string;
  dropdownColumns?: DropdownColumn[];
};

/* =========================================================
   NAVIGATION DATA
   Based directly on the original HTML navbar
========================================================= */

const navItems: NavItem[] = [
  {
    label: "New Arrivals",
    href: "#",
  },

  /* =========================
     MEN
  ========================= */

  {
    label: "Men",
    href: "#",
    dropdownColumns: [
      {
        title: "Shop by Category",
        items: [
          { label: "Tops", href: "#" },
          { label: "Polos", href: "#" },
          { label: "Sleeveless", href: "#" },
          { label: "Long Sleeves", href: "#" },
          { label: "Jacket and Hoodies", href: "#" },
          { label: "Shorts", href: "#" },
          { label: "Pants and Leggings", href: "#" },
          { label: "Tracksuits", href: "#" },
        ],
      },

      {
        title: "Shop by Sport",
        items: [
          { label: "Cricket", href: "#" },
          { label: "Football", href: "#" },
          { label: "Shooting", href: "#" },
          { label: "Training", href: "#" },
          { label: "India Merchandise", href: "#" },
          { label: "Shop Outlet", href: "#" },
        ],
      },

      {
        title: "Accessories",
        items: [
          {
            label: "Compression and Baselayers",
            href: "#",
          },
        ],
      },
    ],
  },

  /* =========================
     WOMEN
  ========================= */

  {
    label: "Women",
    href: "#",
    dropdownColumns: [
      {
        title: "Shop by Category",
        items: [
          { label: "Tops", href: "#" },
          { label: "Polos", href: "#" },
          { label: "Sleeveless", href: "#" },
          { label: "Long Sleeves", href: "#" },
          { label: "Jacket and Hoodies", href: "#" },
          { label: "Shorts", href: "#" },
          { label: "Pants and Leggings", href: "#" },
          { label: "Tracksuits", href: "#" },
        ],
      },

      {
        title: "Shop by Sport",
        items: [
          { label: "Cricket", href: "#" },
          { label: "Football", href: "#" },
          { label: "Shooting", href: "#" },
          { label: "Training", href: "#" },
          { label: "India Merchandise", href: "#" },
          { label: "Shop Outlet", href: "#" },
        ],
      },

      {
        title: "Accessories",
        items: [
          {
            label: "Compression and Baselayers",
            href: "#",
          },
        ],
      },
    ],
  },

  /* =========================
     CRICKET
  ========================= */

  {
    label: "Cricket",
    href: "#",
    dropdownColumns: [
      {
        title: "Shop Cricket",
        items: [
          { label: "Cricket Helmets", href: "#" },
          { label: "Clothing", href: "#" },
          { label: "Cricket Balls", href: "#" },
          { label: "Bags and Duffles", href: "#" },
          { label: "Accessories", href: "#" },
          { label: "Shoes", href: "#" },
          { label: "Shop Outlet", href: "#" },
        ],
      },
    ],
  },

  /* =========================
     ACCESSORIES
  ========================= */

  {
    label: "Accessories",
    href: "#",
    dropdownColumns: [
      {
        title: "Shop Accessories",
        items: [
          { label: "Bags and Duffles", href: "#" },
          { label: "Hats and Caps", href: "#" },
          { label: "Socks", href: "#" },
          { label: "Supporters", href: "#" },
          {
            label: "Compression and Baselayers",
            href: "#",
          },
          { label: "Shoes", href: "#" },
          {
            label: "RECOVERY Foam Rollers",
            href: "#",
          },
          {
            label: "Loop Bands and Support",
            href: "#",
          },
        ],
      },
    ],
  },

  /* =========================
     DESIGN YOUR OWN
  ========================= */

  {
    label: "Design Your Own",
    href: "#",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop dropdown
  const [activeDropdown, setActiveDropdown] =
    useState<string | null>(null);

  // Mobile accordion
  const [mobileDropdown, setMobileDropdown] =
    useState<string | null>(null);

  /* =======================================================
     LOAD SAVED THEME
  ======================================================== */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("virat-theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add(
        "dark",
      );
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove(
        "dark",
      );
    }
  }, []);

  /* =======================================================
     THEME TOGGLE
  ======================================================== */

  const toggleTheme = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    if (nextTheme) {
      document.documentElement.classList.add(
        "dark",
      );

      localStorage.setItem(
        "virat-theme",
        "dark",
      );
    } else {
      document.documentElement.classList.remove(
        "dark",
      );

      localStorage.setItem(
        "virat-theme",
        "light",
      );
    }
  };

  /* =======================================================
     CLOSE MENUS
  ======================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileDropdown(null);
    setActiveDropdown(null);
  };

  /* =======================================================
     MOBILE ACCORDION
  ======================================================== */

  const toggleMobileDropdown = (
    label: string,
  ) => {
    setMobileDropdown((current) =>
      current === label ? null : label,
    );
  };

  /* =======================================================
     GET ACTIVE NAV ITEM
  ======================================================== */

  const activeNavItem = navItems.find(
    (item) =>
      item.label === activeDropdown,
  );

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <motion.header
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
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
      onMouseLeave={() =>
        setActiveDropdown(null)
      }
    >
      {/* ===================================================
          MAIN NAVBAR
      ==================================================== */}

      <nav
        className="
          mx-auto flex
          h-[68px]
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:h-20 sm:px-6
          lg:px-10
        "
      >
        {/* =================================================
            LOGO
        ================================================== */}

        <motion.a
          href="/"
          whileHover={{
            x: 2,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={closeMenu}
          className="
            flex shrink-0
            items-center
          "
        >
          <img
            src={
              darkMode
                ? whiteLogo
                : logo
            }
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

        {/* =================================================
            DESKTOP NAV
        ================================================== */}

        <div
          className="
            hidden
            items-center
            gap-5
            lg:flex
            xl:gap-8
          "
        >
          {navItems.map((item) => {
            const hasDropdown =
              Boolean(
                item.dropdownColumns?.length,
              );

            return (
              <div
                key={item.label}
                className="
                  relative h-full
                "
                onMouseEnter={() => {
                  if (hasDropdown) {
                    setActiveDropdown(
                      item.label,
                    );
                  } else {
                    setActiveDropdown(
                      null,
                    );
                  }
                }}
              >
                <a
                  href={item.href}
                  className="
                    group
                    relative
                    flex h-20
                    items-center
                    gap-1.5
                    whitespace-nowrap
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.08em]
                    text-black/65
                    transition-colors
                    duration-300
                    hover:text-black
                    dark:text-white/65
                    dark:hover:text-white
                  "
                >
                  {item.label}

                  {hasDropdown && (
                    <ChevronDown
                      size={13}
                      strokeWidth={1.8}
                      className="
                        transition-transform
                        duration-300
                        group-hover:rotate-180
                      "
                    />
                  )}

                  {/* Red underline */}
                  <span
                    className="
                      absolute
                      bottom-4
                      left-0
                      h-px
                      w-0
                      bg-[#FF0000]
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </a>
              </div>
            );
          })}
        </div>

        {/* =================================================
            ACTIONS
        ================================================== */}

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
          {/* Search */}
          <button
            aria-label="Search"
            className="
              hidden
              transition-all
              duration-200
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

          {/* Theme */}
          <motion.button
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            onClick={toggleTheme}
            whileTap={{
              scale: 0.9,
            }}
            className="
              relative flex
              h-9 w-9
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border border-black/10
              bg-black/[0.03]
              text-black
              transition-all
              duration-300
              hover:border-[#FF0000]/50
              hover:text-[#FF0000]
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-white
            "
          >
            <motion.div
              key={
                darkMode
                  ? "sun"
                  : "moon"
              }
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
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
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

          {/* Shopping Bag */}
          <button
            aria-label="Shopping bag"
            className="
              relative shrink-0
              transition-all
              duration-200
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
                absolute
                -right-2
                -top-2
                flex
                h-4 w-4
                items-center
                justify-center
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

          {/* Mobile Menu */}
          <button
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(
                (prev) => !prev,
              )
            }
            className="
              flex
              h-9 w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              transition-all
              duration-200
              hover:text-[#FF0000]
              lg:hidden
            "
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={
                  menuOpen
                    ? "close"
                    : "menu"
                }
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

      {/* ===================================================
          DESKTOP MEGA MENU
      ==================================================== */}

      <AnimatePresence>
        {activeDropdown &&
          activeNavItem?.dropdownColumns && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                absolute
                left-0
                right-0
                top-full
                z-50
                border-t
                border-black/[0.08]
                bg-[#F5F5F2]/95
                backdrop-blur-xl
                dark:border-white/[0.08]
                dark:bg-[#050505]/95
              "
              onMouseEnter={() =>
                setActiveDropdown(
                  activeDropdown,
                )
              }
              onMouseLeave={() =>
                setActiveDropdown(null)
              }
            >
              <div
                className="
                  mx-auto
                  max-w-7xl
                  px-6
                  py-8
                  lg:px-10
                "
              >
                <div
                  className="
                    grid
                    gap-10
                    lg:grid-cols-[0.65fr_1.35fr]
                  "
                >
                  {/* =========================================
                      LEFT SIDE
                  ========================================== */}

                  <div
                    className="
                      border-r
                      border-black/[0.08]
                      pr-10
                      dark:border-white/[0.08]
                    "
                  >
                    <p
                      className="
                        mb-3
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-[#FF0000]
                      "
                    >
                      Explore
                    </p>

                    <h3
                      className="
                        text-4xl
                        font-black
                        uppercase
                        leading-none
                        tracking-[-0.06em]
                        text-[#080808]
                        dark:text-white
                      "
                    >
                      {
                        activeNavItem.label
                      }
                    </h3>

                    <a
                      href={
                        activeNavItem.href
                      }
                      className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-black/50
                        transition-colors
                        hover:text-[#FF0000]
                        dark:text-white/50
                      "
                    >
                      Shop collection

                      <ArrowUpRight
                        size={14}
                      />
                    </a>
                  </div>

                  {/* =========================================
                      RIGHT SIDE — COLUMNS
                  ========================================== */}

                  <div
                    className="
                      grid
                      gap-8
                      sm:grid-cols-2
                      lg:grid-cols-3
                    "
                  >
                    {activeNavItem.dropdownColumns.map(
                      (
                        column,
                        columnIndex,
                      ) => (
                        <div
                          key={
                            column.title
                          }
                          className="
                            min-w-0
                          "
                        >
                          {/* Column title */}
                          <div
                            className="
                              mb-3
                              flex
                              items-center
                              gap-2
                            "
                          >
                            <span
                              className="
                                h-1
                                w-1
                                rounded-full
                                bg-[#FF0000]
                              "
                            />

                            <p
                              className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-[#080808]
                                dark:text-white
                              "
                            >
                              {
                                column.title
                              }
                            </p>
                          </div>

                          {/* Column items */}
                          <div>
                            {column.items.map(
                              (
                                dropdownItem,
                                itemIndex,
                              ) => (
                                <motion.a
                                  key={
                                    dropdownItem.label
                                  }
                                  href={
                                    dropdownItem.href
                                  }
                                  initial={{
                                    opacity: 0,
                                    y: 8,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  transition={{
                                    duration: 0.25,
                                    delay:
                                      (columnIndex *
                                        0.08) +
                                      (itemIndex *
                                        0.035),
                                  }}
                                  className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    border-b
                                    border-black/[0.08]
                                    py-3
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.06em]
                                    text-black/60
                                    transition-colors
                                    hover:text-[#FF0000]
                                    dark:border-white/[0.08]
                                    dark:text-white/60
                                  "
                                >
                                  {/* 🔴 RED BULLET */}
                                  <span
                                    className="
                                      h-1.5
                                      w-1.5
                                      shrink-0
                                      rounded-full
                                      bg-[#FF0000]
                                      opacity-50
                                      transition-all
                                      duration-300
                                      group-hover:scale-150
                                      group-hover:opacity-100
                                    "
                                  />

                                  <span className="flex-1">
                                    {
                                      dropdownItem.label
                                    }
                                  </span>

                                  <ArrowUpRight
                                    size={12}
                                    className="
                                      shrink-0
                                      opacity-0
                                      transition-all
                                      duration-200
                                      group-hover:translate-x-0.5
                                      group-hover:-translate-y-0.5
                                      group-hover:opacity-100
                                    "
                                  />
                                </motion.a>
                              ),
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* ===================================================
          MOBILE MENU
      ==================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              max-h-[calc(100vh-68px)]
              overflow-y-auto
              border-t
              border-black/[0.08]
              bg-[#F5F5F2]
              dark:border-white/[0.08]
              dark:bg-[#050505]
              lg:hidden
            "
          >
            <div
              className="
                px-5
                py-6
              "
            >
              {navItems.map(
                (item) => {
                  const hasDropdown =
                    Boolean(
                      item.dropdownColumns?.length,
                    );

                  return (
                    <div
                      key={item.label}
                      className="
                        border-b
                        border-black/[0.08]
                        last:border-b-0
                        dark:border-white/[0.08]
                      "
                    >
                      {/* =================================
                          MAIN MOBILE ITEM
                      ================================== */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          py-5
                        "
                      >
                        <a
                          href={
                            item.href
                          }
                          onClick={
                            closeMenu
                          }
                          className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#080808]
                            dark:text-white
                          "
                        >
                          {
                            item.label
                          }
                        </a>

                        {hasDropdown && (
                          <button
                            type="button"
                            onClick={() =>
                              toggleMobileDropdown(
                                item.label,
                              )
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              text-black/50
                              dark:text-white/50
                            "
                            aria-label={`Toggle ${item.label} submenu`}
                          >
                            <ChevronDown
                              size={17}
                              className={`
                                transition-transform
                                duration-300
                                ${
                                  mobileDropdown ===
                                  item.label
                                    ? "rotate-180"
                                    : ""
                                }
                              `}
                            />
                          </button>
                        )}
                      </div>

                      {/* =================================
                          MOBILE COLUMNS
                      ================================== */}

                      <AnimatePresence>
                        {mobileDropdown ===
                          item.label &&
                          item.dropdownColumns && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                height: 0,
                              }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                              }}
                              exit={{
                                opacity: 0,
                                height: 0,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="
                                overflow-hidden
                              "
                            >
                              <div
                                className="
                                  space-y-6
                                  pb-5
                                  pl-2
                                "
                              >
                                {item.dropdownColumns.map(
                                  (
                                    column,
                                  ) => (
                                    <div
                                      key={
                                        column.title
                                      }
                                    >
                                      {/* Column title */}
                                      <div
                                        className="
                                          mb-2
                                          flex
                                          items-center
                                          gap-2
                                        "
                                      >
                                        <span
                                          className="
                                            h-1
                                            w-1
                                            rounded-full
                                            bg-[#FF0000]
                                          "
                                        />

                                        <p
                                          className="
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.2em]
                                            text-[#FF0000]
                                          "
                                        >
                                          {
                                            column.title
                                          }
                                        </p>
                                      </div>

                                      {/* Items */}
                                      <div>
                                        {column.items.map(
                                          (
                                            dropdownItem,
                                            itemIndex,
                                          ) => (
                                            <motion.a
                                              key={
                                                dropdownItem.label
                                              }
                                              href={
                                                dropdownItem.href
                                              }
                                              onClick={
                                                closeMenu
                                              }
                                              initial={{
                                                opacity: 0,
                                                x: -8,
                                              }}
                                              animate={{
                                                opacity: 1,
                                                x: 0,
                                              }}
                                              transition={{
                                                duration: 0.2,
                                                delay:
                                                  itemIndex *
                                                  0.035,
                                              }}
                                              className="
                                                group
                                                flex
                                                items-center
                                                gap-3
                                                border-b
                                                border-black/[0.05]
                                                py-3
                                                pr-2
                                                text-[11px]
                                                font-medium
                                                uppercase
                                                tracking-[0.1em]
                                                text-black/50
                                                transition-colors
                                                last:border-b-0
                                                hover:text-[#FF0000]
                                                dark:border-white/[0.05]
                                                dark:text-white/50
                                              "
                                            >
                                              {/* 🔴 RED BULLET */}
                                              <span
                                                className="
                                                  h-1.5
                                                  w-1.5
                                                  shrink-0
                                                  rounded-full
                                                  bg-[#FF0000]
                                                  opacity-50
                                                  transition-all
                                                  duration-300
                                                  group-hover:scale-150
                                                  group-hover:opacity-100
                                                "
                                              />

                                              <span className="flex-1">
                                                {
                                                  dropdownItem.label
                                                }
                                              </span>

                                              <ArrowUpRight
                                                size={13}
                                                className="
                                                  shrink-0
                                                  opacity-50
                                                  transition-all
                                                  duration-200
                                                  group-hover:translate-x-0.5
                                                  group-hover:-translate-y-0.5
                                                  group-hover:opacity-100
                                                "
                                              />
                                            </motion.a>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  );
                },
              )}

              {/* =========================================
                  MOBILE SEARCH
              ========================================== */}

              <div className="mt-6">
                <a
                  href="/search"
                  onClick={
                    closeMenu
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    border
                    border-black/[0.1]
                    px-4
                    py-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-black/60
                    transition-colors
                    hover:border-[#FF0000]
                    hover:text-[#FF0000]
                    dark:border-white/[0.1]
                    dark:text-white/60
                  "
                >
                  <Search
                    size={16}
                  />

                  Search
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;