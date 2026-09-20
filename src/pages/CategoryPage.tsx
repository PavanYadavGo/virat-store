import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";

import performanceTee from "../assets/products/performance-tee.png";
import viratPolo from "../assets/products/virat-polo.png";
import matchDayShorts from "../assets/products/match-day-shorts.png";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: "performance-tee",
    name: "Core Performance Tee",
    category: "T-Shirts",
    price: 999,
    image: performanceTee,
    badge: "NEW",
  },
  {
    id: "virat-polo",
    name: "Virat Performance Polo",
    category: "Polos",
    price: 1299,
    image: viratPolo,
    badge: "POPULAR",
  },
  {
    id: "match-day-shorts",
    name: "Match Day Shorts",
    category: "Shorts",
    price: 899,
    image: matchDayShorts,
  },
  {
    id: "essential-tee",
    name: "Essential Training Tee",
    category: "T-Shirts",
    price: 899,
    image: performanceTee,
  },
  {
    id: "street-polo",
    name: "Street Polo",
    category: "Polos",
    price: 1299,
    image: viratPolo,
  },
  {
    id: "core-shorts",
    name: "Core Sports Shorts",
    category: "Shorts",
    price: 799,
    image: matchDayShorts,
  },
];

const getCategoryName = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return "Collection";

  const lastPart = parts[parts.length - 1];

  return lastPart
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getParentName = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length < 2) return "";

  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
};

const CategoryPage = () => {
  const location = useLocation();

  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const categoryName = getCategoryName(location.pathname);
  const parentName = getParentName(location.pathname);

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sort) {
      case "price-low":
        return items.sort((a, b) => a.price - b.price);

      case "price-high":
        return items.sort((a, b) => b.price - a.price);

      case "name":
        return items.sort((a, b) => a.name.localeCompare(b.name));

      default:
        return items;
    }
  }, [sort]);

  return (
    <main className="min-h-screen bg-[#F5F5F2] text-[#080808] transition-colors duration-300 dark:bg-[#050505] dark:text-white">
      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-black/10 pt-32 dark:border-white/10 sm:pt-36">
        {/* Background number */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute right-[-10px] top-1/2
            z-0 -translate-y-1/2
            select-none
            text-[12rem]
            font-black
            leading-none
            tracking-[-0.1em]
            text-black/[0.045]
            dark:text-white/[0.045]
            sm:text-[18rem]
            lg:text-[25rem]
          "
        >
          01
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-14 lg:px-10 lg:pb-20">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
            <Link
              to="/"
              className="transition-colors hover:text-[#FF0000]"
            >
              Home
            </Link>

            <span>/</span>

            {parentName && (
              <>
                <span>{parentName}</span>
                <span>/</span>
              </>
            )}

            <span className="text-black dark:text-white">
              {categoryName}
            </span>
          </div>

          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#FF0000]"
            >
              Virat Sportswear
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="
                text-[clamp(4rem,14vw,10rem)]
                font-black
                uppercase
                leading-[0.78]
                tracking-[-0.085em]
              "
            >
              {categoryName}
              <span className="text-[#FF0000]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 max-w-xl text-sm leading-relaxed text-black/55 dark:text-white/55 sm:text-base"
            >
              Performance-driven apparel designed for movement,
              training and everyday life.
            </motion.p>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="sticky top-0 z-30 border-b border-black/10 bg-[#F5F5F2]/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#050505]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
            {sortedProducts.length} Products
          </div>

          <div className="flex items-center gap-3">
            {/* Filter */}
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className="
                flex items-center gap-2
                border border-black/10
                px-4 py-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                transition-all
                hover:border-black/30
                dark:border-white/10
                dark:hover:border-white/30
              "
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Filter</span>
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="
                  appearance-none
                  border border-black/10
                  bg-transparent
                  py-3
                  pl-4
                  pr-10
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  outline-none
                  dark:border-white/10
                "
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
                <option value="name">Name</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>

        {/* FILTER PANEL */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-black/10 dark:border-white/10"
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:grid-cols-3 lg:px-10">
              <FilterGroup
                title="Category"
                items={["T-Shirts", "Polos", "Shorts", "Sleeveless"]}
              />

              <FilterGroup
                title="Size"
                items={["XS", "S", "M", "L", "XL", "XXL"]}
              />

              <FilterGroup
                title="Price"
                items={["Under ₹1,000", "₹1,000–₹1,500", "₹1,500+"]}
              />
            </div>
          </motion.div>
        )}
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-3">
          {sortedProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
              }}
              className="group"
            >
              {/* IMAGE */}
              <Link
                to={`/product/${product.id}`}
                className="
                  relative
                  block
                  aspect-[4/5]
                  overflow-hidden
                  bg-[#E8E8E5]
                  dark:bg-[#111111]
                "
              >
                {product.badge && (
                  <span
                    className="
                      absolute left-3 top-3
                      z-10
                      bg-[#FF0000]
                      px-2.5 py-1.5
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-white
                    "
                  >
                    {product.badge}
                  </span>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    h-full
                    w-full
                    object-contain
                    p-8
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                    sm:p-12
                  "
                />

                {/* Hover overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    transition-colors
                    duration-500
                    group-hover:bg-black/[0.04]
                    dark:group-hover:bg-white/[0.03]
                  "
                />

                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    flex
                    h-10
                    w-10
                    translate-y-3
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FF0000]
                    text-white
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <ArrowRight size={17} />
                </div>
              </Link>

              {/* INFO */}
              <div className="pt-4">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                  {product.category}
                </p>

                <div className="flex items-start justify-between gap-3">
                  <Link
                    to={`/product/${product.id}`}
                    className="
                      text-sm
                      font-bold
                      uppercase
                      leading-tight
                      transition-colors
                      hover:text-[#FF0000]
                      sm:text-base
                    "
                  >
                    {product.name}
                  </Link>

                  <span className="shrink-0 text-sm font-bold">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

type FilterGroupProps = {
  title: string;
  items: string[];
};

const FilterGroup = ({ title, items }: FilterGroupProps) => {
  return (
    <div>
      <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em]">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className="
              border
              border-black/10
              px-3
              py-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              transition-colors
              hover:border-[#FF0000]
              hover:text-[#FF0000]
              dark:border-white/10
            "
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;