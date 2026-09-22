import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Check } from "lucide-react";

import performanceTee from "../assets/products/performance-tee.png";
import viratPolo from "../assets/products/virat-polo.png";
import matchDayShorts from "../assets/products/match-day-shorts.png";

// Mock database to simulate fetching product by ID
const productsDatabase = [
  {
    id: "performance-tee",
    name: "Core Performance Tee",
    category: "T-Shirts",
    price: 999,
    description: "Built for every move. The Core Performance Tee is engineered with sweat-wicking technology and a lightweight feel, keeping you focused on the game.",
    features: ["Moisture-wicking fabric", "Athletic fit", "Reflective details", "100% Recycled Polyester"],
    images: [performanceTee, performanceTee, performanceTee],
    badge: "NEW",
  },
  {
    id: "virat-polo",
    name: "Virat Performance Polo",
    category: "Polos",
    price: 1299,
    description: "Bring style to your game. The Virat Performance Polo blends classic aesthetics with modern activewear tech for ultimate comfort.",
    features: ["Breathable knit", "Ribbed collar", "Four-way stretch", "Premium cotton blend"],
    images: [viratPolo, viratPolo, viratPolo],
    badge: "POPULAR",
  },
  {
    id: "match-day-shorts",
    name: "Match Day Shorts",
    category: "Shorts",
    price: 899,
    description: "Move freely. Our Match Day Shorts offer unparalleled mobility and ventilation for intense training sessions or casual wear.",
    features: ["Elastic waistband with drawcord", "Side zip pockets", "Lightweight woven fabric", "7-inch inseam"],
    images: [matchDayShorts, matchDayShorts, matchDayShorts],
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find product or fallback to a default one for demo purposes
  const product = productsDatabase.find((p) => p.id === id) || productsDatabase[0];

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F2] pt-24 text-[#080808]">
      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
          <Link to="/" className="transition-colors hover:text-[#FF0000]">
            Home
          </Link>
          <span>/</span>
          <Link to={`/${product.category.toLowerCase()}`} className="transition-colors hover:text-[#FF0000]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>
      </div>

      {/* PRODUCT LAYOUT */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-10 lg:pb-36">
        
        {/* LEFT: IMAGES */}
        <div className="flex flex-col-reverse gap-4 md:flex-row lg:h-[700px]">
          {/* Thumbnails */}
          <div className="flex gap-3 md:flex-col md:w-20 lg:w-24 shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`
                  relative aspect-[4/5] w-20 overflow-hidden bg-[#E8E8E5] transition-all
                  md:w-full
                  ${activeImage === idx ? "border-2 border-[#FF0000]" : "border border-transparent hover:border-black/20"}
                `}
              >
                <img src={img} alt={`${product.name} view ${idx + 1}`} className="h-full w-full object-contain p-2" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 bg-[#E8E8E5] overflow-hidden group">
            {product.badge && (
              <span className="absolute left-5 top-5 z-10 bg-[#FF0000] px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                {product.badge}
              </span>
            )}
            
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-contain p-10 lg:p-16"
            />
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col pt-4 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF0000]">
              Virat Sportswear
            </p>
            
            <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.85] tracking-[-0.05em]">
              {product.name}<span className="text-[#FF0000]">.</span>
            </h1>

            <p className="mb-8 text-2xl font-bold">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">Select Size</span>
              <button className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/50 underline transition-colors hover:text-black">
                Size Guide
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    flex h-12 items-center justify-center border text-[11px] font-bold uppercase tracking-[0.1em] transition-all
                    ${selectedSize === size 
                      ? "border-[#FF0000] bg-[#FF0000] text-white" 
                      : "border-black/10 bg-white/50 hover:border-black/40"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`
              group relative flex w-full items-center justify-center overflow-hidden border px-8 py-5
              transition-all duration-300
              ${isAdded ? "border-green-500 bg-green-500 text-white" : "border-[#080808] bg-[#080808] text-white hover:bg-transparent hover:text-[#080808]"}
            `}
          >
            {/* Hover fill effect */}
            <div className="absolute inset-0 -translate-y-full bg-transparent transition-transform duration-500 group-hover:translate-y-0" />
            
            <span className="relative z-10 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em]">
              {isAdded ? (
                <>
                  <Check size={18} strokeWidth={3} />
                  Added to Bag
                </>
              ) : (
                <>
                  Add to Bag
                  <ArrowRight size={18} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 border-t border-black/10 pt-8"
          >
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em]">
              Description
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-black/70">
              {product.description}
            </p>

            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em]">
              Features
            </h3>
            <ul className="flex flex-col gap-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-black/70">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF0000]" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;

