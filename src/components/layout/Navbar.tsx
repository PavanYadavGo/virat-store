import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/virat logo.png";

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
========================================================= */

const navItems: NavItem[] = [
  {
    label: "NEW ARRIVALS",
    href: "/new-arrivals",
  },

  {
    label: "MEN",
    href: "/men",
    dropdownColumns: [
      {
        title: "Shop by Category",
        items: [
          { label: "Tops", href: "/men/tops" },
          { label: "Polos", href: "/men/polos" },
          { label: "Sleeveless", href: "/men/sleeveless" },
          { label: "Long Sleeves", href: "/men/long-sleeves" },
          {
            label: "Jacket and Hoodies",
            href: "/men/jackets-hoodies",
          },
          { label: "Shorts", href: "/men/shorts" },
          {
            label: "Pants and Leggings",
            href: "/men/pants-leggings",
          },
          { label: "Tracksuits", href: "/men/tracksuits" },
        ],
      },

      {
        title: "Shop by Sport",
        items: [
          { label: "Cricket", href: "/men/cricket" },
          { label: "Football", href: "/men/football" },
          { label: "Shooting", href: "/men/shooting" },
          { label: "Training", href: "/men/training" },
          {
            label: "India Merchandise",
            href: "/men/india-merchandise",
          },
          { label: "Shop Outlet", href: "/men/outlet" },
        ],
      },

      {
        title: "Accessories",
        items: [
          {
            label: "Compression and Baselayers",
            href: "/men/compression-baselayers",
          },
        ],
      },
    ],
  },

  {
    label: "WOMEN",
    href: "/women",
    dropdownColumns: [
      {
        title: "Shop by Category",
        items: [
          { label: "Tops", href: "/women/tops" },
          { label: "Polos", href: "/women/polos" },
          { label: "Sleeveless", href: "/women/sleeveless" },
          { label: "Long Sleeves", href: "/women/long-sleeves" },
          {
            label: "Jacket and Hoodies",
            href: "/women/jackets-hoodies",
          },
          { label: "Shorts", href: "/women/shorts" },
          {
            label: "Pants and Leggings",
            href: "/women/pants-leggings",
          },
          { label: "Tracksuits", href: "/women/tracksuits" },
        ],
      },

      {
        title: "Shop by Sport",
        items: [
          { label: "Cricket", href: "/women/cricket" },
          { label: "Football", href: "/women/football" },
          { label: "Shooting", href: "/women/shooting" },
          { label: "Training", href: "/women/training" },
          {
            label: "India Merchandise",
            href: "/women/india-merchandise",
          },
          { label: "Shop Outlet", href: "/women/outlet" },
        ],
      },

      {
        title: "Accessories",
        items: [
          {
            label: "Compression and Baselayers",
            href: "/women/compression-baselayers",
          },
        ],
      },
    ],
  },

  {
    label: "CRICKET",
    href: "/cricket",
    dropdownColumns: [
      {
        title: "Shop Cricket",
        items: [
          {
            label: "Cricket Helmets",
            href: "/cricket/helmets",
          },
          {
            label: "Clothing",
            href: "/cricket/clothing",
          },
          {
            label: "Cricket Balls",
            href: "/cricket/balls",
          },
          {
            label: "Bags and Duffles",
            href: "/cricket/bags",
          },
          {
            label: "Accessories",
            href: "/cricket/accessories",
          },
          {
            label: "Shoes",
            href: "/cricket/shoes",
          },
          {
            label: "Shop Outlet",
            href: "/cricket/outlet",
          },
        ],
      },
    ],
  },

  {
    label: "ACCESSORIES",
    href: "/accessories",
    dropdownColumns: [
      {
        title: "Shop Accessories",
        items: [
          {
            label: "Bags and Duffles",
            href: "/accessories/bags",
          },
          {
            label: "Hats and Caps",
            href: "/accessories/hats-caps",
          },
          {
            label: "Socks",
            href: "/accessories/socks",
          },
          {
            label: "Supporters",
            href: "/accessories/supporters",
          },
          {
            label: "Compression and Baselayers",
            href: "/accessories/compression-baselayers",
          },
          {
            label: "Shoes",
            href: "/accessories/shoes",
          },
          {
            label: "RECOVERY Foam Rollers",
            href: "/accessories/foam-rollers",
          },
          {
            label: "Loop Bands and Support",
            href: "/accessories/loop-bands",
          },
        ],
      },
    ],
  },

  {
    label: "DESIGN YOUR OWN",
    href: "/design-your-own",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] =
    useState<string | null>(null);

  const [mobileDropdown, setMobileDropdown] =
    useState<string | null>(null);

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

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown((current) =>
      current === label ? null : label,
    );
  };

  /* =======================================================
     ACTIVE NAV ITEM
  ======================================================== */

  const activeNavItem = navItems.find(
    (item) => item.label === activeDropdown,
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
      "
      onMouseLeave={() => setActiveDropdown(null)}
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

        <motion.div
          whileHover={{
            x: 2,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            flex shrink-0
            items-center
          "
        >
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="Virat home"
          >
            <img
              src={logo}
              alt="VIRAT"
              className="
                h-11
                w-auto
                object-contain
                sm:h-12
                lg:h-15
              "
            />
          </Link>
        </motion.div>

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
            const hasDropdown = Boolean(
              item.dropdownColumns?.length,
            );

            return (
              <div
                key={item.label}
                className="relative h-full"
                onMouseEnter={() => {
                  if (hasDropdown) {
                    setActiveDropdown(item.label);
                  } else {
                    setActiveDropdown(null);
                  }
                }}
              >
                <Link
                  to={item.href}
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
                </Link>
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
          "
        >
          {/* Search */}
          <Link
            to="/search"
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
          </Link>

          {/* Shopping Bag */}
          <Link
            to="/cart"
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
          </Link>

          {/* Mobile Menu */}
          <button
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((prev) => !prev)
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
              "
              onMouseEnter={() =>
                setActiveDropdown(activeDropdown)
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
                  {/* LEFT SIDE */}

                  <div
                    className="
                      border-r
                      border-black/[0.08]
                      pr-10
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
                      "
                    >
                      {activeNavItem.label}
                    </h3>

                    <Link
                      to={activeNavItem.href}
                      onClick={closeMenu}
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
                      "
                    >
                      Shop collection

                      <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  {/* RIGHT SIDE */}

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
                          key={column.title}
                          className="min-w-0"
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
                              "
                            >
                              {column.title}
                            </p>
                          </div>

                          {/* Column items */}

                          <div>
                            {column.items.map(
                              (
                                dropdownItem,
                                itemIndex,
                              ) => (
                                <motion.div
                                  key={
                                    dropdownItem.label
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
                                      columnIndex *
                                        0.08 +
                                      itemIndex *
                                        0.035,
                                  }}
                                >
                                  <Link
                                    to={
                                      dropdownItem.href
                                    }
                                    onClick={
                                      closeMenu
                                    }
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
                                    "
                                  >
                                    {/* Red bullet */}

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
                                  </Link>
                                </motion.div>
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
              lg:hidden
            "
          >
            <div className="px-5 py-6">
              {navItems.map((item) => {
                const hasDropdown = Boolean(
                  item.dropdownColumns?.length,
                );

                return (
                  <div
                    key={item.label}
                    className="
                      border-b
                      border-black/[0.08]
                      last:border-b-0
                    "
                  >
                    {/* MAIN MOBILE ITEM */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        py-5
                      "
                    >
                      <Link
                        to={item.href}
                        onClick={closeMenu}
                        className="
                          text-sm
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          text-[#080808]
                        "
                      >
                        {item.label}
                      </Link>

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

                    {/* MOBILE COLUMNS */}

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
                            className="overflow-hidden"
                          >
                            <div
                              className="
                                space-y-6
                                pb-5
                                pl-2
                              "
                            >
                              {item.dropdownColumns.map(
                                (column) => (
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
                                          <motion.div
                                            key={
                                              dropdownItem.label
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
                                          >
                                            <Link
                                              to={
                                                dropdownItem.href
                                              }
                                              onClick={
                                                closeMenu
                                              }
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
                                              "
                                            >
                                              {/* Red bullet */}

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
                                            </Link>
                                          </motion.div>
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
              })}

              {/* MOBILE SEARCH */}

              <div className="mt-6">
                <Link
                  to="/search"
                  onClick={closeMenu}
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
                  "
                >
                  <Search size={16} />
                  Search
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;