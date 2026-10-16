import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { api, type ApiProduct } from "../services/api";

import defaultProductImg from "../assets/products/performance-tee.png";

export default function AllProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    let isMounted = true;
    api
      .getProducts()
      .then((items) => {
        if (isMounted) {
          setProducts(items);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed loading products");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["all", ...Array.from(set)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured: keep original order
        break;
    }

    return list;
  }, [products, selectedCategory, sort]);

  return (
    <main className="min-h-screen bg-[#F5F5F2] text-[#080808]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-black/10 px-6 pb-14 pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF0000]"
          >
            Official Virat Catalog
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.07em]"
          >
            All Products<span className="text-[#FF0000]">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-black/60 sm:text-base"
          >
            Engineered for high performance, maximum mobility, and elite cricket athletic training.
          </motion.p>
        </div>
      </section>

      {/* FILTER & SORT TOOLBAR */}
      <section className="sticky top-0 z-30 border-b border-black/10 bg-[#F5F5F2]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
          {/* CATEGORY TABS */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
                  selectedCategory === cat
                    ? "bg-[#080808] text-white"
                    : "border border-black/15 bg-white/50 text-black/60 hover:border-black/40 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ITEM COUNT & SORT */}
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
              {filteredAndSortedProducts.length} Item{filteredAndSortedProducts.length !== 1 ? "s" : ""}
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none border border-black/15 bg-white/50 py-2 pl-3 pr-8 text-[10px] font-bold uppercase tracking-[0.15em] outline-none hover:border-black/40"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-black/50">
            <Loader2 className="animate-spin text-[#FF0000]" size={36} />
            <p className="mt-4 text-xs font-bold uppercase tracking-widest">Loading catalog...</p>
          </div>
        ) : error ? (
          <div className="border border-red-500/30 bg-red-50 p-6 text-center text-xs font-bold text-red-700">
            {error}
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="border border-dashed border-black/20 p-16 text-center text-black/50">
            <p className="text-sm font-bold uppercase tracking-widest">No products found in this category.</p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="mt-4 bg-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#FF0000]"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
            {filteredAndSortedProducts.map((product, index) => {
              const imageSrc =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : defaultProductImg;

              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="group flex flex-col"
                >
                  {/* CARD IMAGE */}
                  <Link
                    to={`/product/${product.id}`}
                    className="relative block aspect-[4/5] overflow-hidden border border-black/5 bg-[#E8E8E5]"
                  >
                    {product.badge && (
                      <span className="absolute left-3 top-3 z-10 bg-[#FF0000] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.15em] text-white shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.03]" />
                  </Link>

                  {/* DETAILS */}
                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-black/45">
                        <span>{product.category || "Apparel"}</span>
                        {product.subcategory && <span>{product.subcategory}</span>}
                      </div>

                      <h3 className="mt-1 text-sm font-black uppercase tracking-tight text-black sm:text-base">
                        <Link to={`/product/${product.id}`} className="hover:text-[#FF0000] transition-colors">
                          {product.name}
                        </Link>
                      </h3>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
                      <span className="text-sm font-black text-black sm:text-base">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>

                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-black/60 group-hover:text-[#FF0000] transition-colors"
                      >
                        <span>View</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
