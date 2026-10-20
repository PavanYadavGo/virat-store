import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { api } from "../services/api";
import { getImagePresentation } from "../utils/imagePresentation";
import performanceTee from "../assets/products/performance-tee.png";

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  priceUnconfirmed?: boolean;
  description: string;
  features: string[];
  images: string[];
  badge?: string;
  sizes?: string[];
  hasBackground?: boolean;
}

// Verified client products catalog (15 products across 8 families)
export const productsDatabase: ProductItem[] = [
  {
    id: "virat-classic-cap-black",
    name: "VIRAT Classic Sports Cap - Black",
    category: "Accessories",
    price: 0,
    priceUnconfirmed: true,
    description: "Structured athletic baseball cap featuring signature white embroidered VIRAT branding, curved visor, and breathable comfort design. Commercial details pending client confirmation.",
    features: [
      "Signature 3D embroidered VIRAT logo",
      "Structured six-panel crown",
      "Moisture-absorbing inner sweatband",
      "Adjustable rear buckle closure",
    ],
    images: [
      "/images/products/cap-black-front.webp",
      "/images/products/cap-black-side.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-classic-cap-red",
    name: "VIRAT Classic Sports Cap - Red",
    category: "Accessories",
    price: 0,
    priceUnconfirmed: true,
    description: "Bold crimson athletic cap engineered with high-contrast white VIRAT embroidery and premium structured fit. Commercial details pending client confirmation.",
    features: [
      "High-visibility crimson colorway",
      "Pre-curved performance brim",
      "Embroidered ventilation eyelets",
      "Durable twill construction",
    ],
    images: [
      "/images/products/cap-red-front.webp",
      "/images/products/cap-red-side.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-classic-cap-white",
    name: "VIRAT Classic Sports Cap - White",
    category: "Accessories",
    price: 0,
    priceUnconfirmed: true,
    description: "Clean optic white performance cap with contrasting black embroidered VIRAT emblem. Commercial details pending client confirmation.",
    features: [
      "Crisp optic white twill",
      "Contrasting black VIRAT embroidery",
      "Comfort inner taping",
      "Adjustable sizing",
    ],
    images: [
      "/images/products/cap-white-front.webp",
      "/images/products/cap-white-side.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-camo-track-pant",
    name: "VIRAT Camo Performance Track Pant",
    category: "Bottoms",
    price: 0,
    priceUnconfirmed: true,
    description: "Tapered athletic track pants finished in a subdued grey camo marble pattern with elasticated waistband and ankle cuffs. Commercial details pending client confirmation.",
    features: [
      "Tapered athletic silhouette",
      "Full elastic waistband with internal drawcord",
      "Zippered secure side pockets",
      "Subtle allover camo marble print",
    ],
    images: [
      "/images/products/camo-track-pant-duo.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-camo-training-shorts",
    name: "VIRAT Camo Training Shorts",
    category: "Shorts",
    price: 0,
    priceUnconfirmed: true,
    description: "Performance training shorts in matching grey camo marble texture with branded VIRAT lower-leg accent. Commercial details pending client confirmation.",
    features: [
      "Multi-angle athletic cut",
      "Rear welt pocket & deep hand pockets",
      "Four-way stretch mobility",
      "Reflective VIRAT hem insignia",
    ],
    images: [
      "/images/products/camo-training-shorts-front.webp",
      "/images/products/camo-training-shorts-back.webp",
      "/images/products/camo-training-shorts-duo.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-pro-match-shorts",
    name: "VIRAT 'Never Give Up' Pro Match Shorts",
    category: "Shorts",
    price: 0,
    priceUnconfirmed: true,
    description: "Intense workout and match shorts featuring lateral contrast side stripe and motivational 'NEVER GIVE UP' typography. Commercial details pending client confirmation.",
    features: [
      "'NEVER GIVE UP' side stripe typography",
      "Elastic waistband with quick-adjust cord",
      "Ventilated side splits for maximum stride",
      "Reinforced athletic seams",
    ],
    images: [
      "/images/products/pro-match-shorts-front.webp",
      "/images/products/pro-match-shorts-back.webp",
      "/images/products/pro-match-shorts-showcase-front.webp",
      "/images/products/pro-match-shorts-showcase-back.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-geometric-tee-navy",
    name: "VIRAT Geometric Graphic Tee - Navy Blue",
    category: "T-Shirts",
    price: 0,
    priceUnconfirmed: true,
    description: "Round neck training t-shirt in deep navy blue featuring modern geometric chest chevron artwork and back print. Commercial details pending client confirmation.",
    features: [
      "Modern geometric chest graphics",
      "Ergonomic round neck collar",
      "Quick-drying breathable yarn",
      "Rear shoulder VIRAT logo print",
    ],
    images: [
      "/images/products/training-tee-navy-front.webp",
      "/images/products/training-tee-navy-back.webp",
      "/images/products/training-tee-navy-duo.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-geometric-tee-green",
    name: "VIRAT Geometric Graphic Tee - Olive Green",
    category: "T-Shirts",
    price: 0,
    priceUnconfirmed: true,
    description: "Earth-toned olive green training t-shirt with signature angular chevron print on chest and back. Commercial details pending client confirmation.",
    features: [
      "Olive green colorway",
      "High-density chest print",
      "Athletic crewneck cut",
      "Lightweight moisture-wicking material",
    ],
    images: [
      "/images/products/training-tee-green-front.webp",
      "/images/products/training-tee-green-back.webp",
      "/images/products/training-tee-green-duo.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-geometric-tee-grey",
    name: "VIRAT Geometric Graphic Tee - Heather Grey",
    category: "T-Shirts",
    price: 0,
    priceUnconfirmed: true,
    description: "Versatile heather grey performance tee styled with geometric accents for training sessions or lifestyle wear. Commercial details pending client confirmation.",
    features: [
      "Heather grey marl base",
      "Geometric graphic chest overlay",
      "Soft-touch fabric feel",
      "Ribbed crewneck",
    ],
    images: [
      "/images/products/training-tee-grey-front.webp",
      "/images/products/training-tee-grey-back.webp",
      "/images/products/training-tee-grey-duo.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-sleeveless-vest-maroon",
    name: "VIRAT Geometric Sleeveless Vest - Maroon",
    category: "Sleeveless",
    price: 0,
    priceUnconfirmed: true,
    description: "Deep maroon / wine athletic sleeveless gym tank with angular geometric chest graphics for unrestricted arm mobility. Commercial details pending client confirmation.",
    features: [
      "Deep armholes for maximum range of motion",
      "Bold angular graphic print",
      "Reinforced neckline and arm bindings",
      "Breathable gym activewear cut",
    ],
    images: [
      "/images/products/sleeveless-vest-maroon-front.webp",
      "/images/products/sleeveless-vest-maroon-back.webp",
      "/images/products/sleeveless-vest-maroon-duo.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-sleeveless-vest-green",
    name: "VIRAT Geometric Sleeveless Vest - Sage Green",
    category: "Sleeveless",
    price: 0,
    priceUnconfirmed: true,
    description: "Light sage green training vest designed for intense gym sessions and warm-weather training. Commercial details pending client confirmation.",
    features: [
      "Sage green training colorway",
      "Sleeveless racer-style mobility",
      "Lightweight sweat-wicking knit",
      "Rear athletic logo placement",
    ],
    images: [
      "/images/products/sleeveless-vest-green-duo.webp",
      "/images/products/sleeveless-vest-green-back.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-performance-polo-mint",
    name: "VIRAT Performance Pique Polo - Mint Green",
    category: "Polos",
    price: 0,
    priceUnconfirmed: true,
    description: "Fresh mint green athletic polo shirt featuring contrasting white collar, dark sleeve cuffs, and 2-button placket. Commercial details pending client confirmation.",
    features: [
      "Contrast white structured collar",
      "Two-button front placket",
      "Ribbed sleeve cuff trim",
      "Breathable pique texture",
    ],
    images: [
      "/images/products/performance-polo-mint-front.webp",
      "/images/products/performance-polo-mint-back.webp",
      "/images/products/performance-polo-mint-duo.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-performance-polo-blue",
    name: "VIRAT Performance Pique Polo - Sky Blue",
    category: "Polos",
    price: 0,
    priceUnconfirmed: true,
    description: "Sky blue athletic polo shirt accented by navy collar and sleeve band details. Commercial details pending client confirmation.",
    features: [
      "Navy contrast collar & cuffs",
      "Buttoned sport placket",
      "Structured athletic drape",
      "Pique cotton-poly blend",
    ],
    images: [
      "/images/products/performance-polo-blue-front.webp",
      "/images/products/performance-polo-blue-back.webp",
      "/images/products/performance-polo-blue-duo.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-track-jacket-navy-red",
    name: "VIRAT Athletic Zip-Up Track Jacket - Navy/Red",
    category: "Jackets",
    price: 0,
    priceUnconfirmed: true,
    description: "Full-zip athletic track jacket in navy blue with high-neck stand collar, red interior collar lining, and zippered pockets. Commercial details pending client confirmation.",
    features: [
      "Full-length front zipper",
      "Stand-up collar with red accent lining",
      "Zippered hand warmer pockets",
      "Ribbed cuffs and hem",
    ],
    images: [
      "/images/products/track-jacket-navy-red-front.webp",
      "/images/products/track-jacket-navy-red-back.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-track-jacket-navy-gold",
    name: "VIRAT Athletic Zip-Up Track Jacket - Navy/Gold",
    category: "Jackets",
    price: 0,
    priceUnconfirmed: true,
    description: "Full-zip navy track jacket elevated with custom gold patterned shoulder panels and chest branding. Commercial details pending client confirmation.",
    features: [
      "Gold shoulder panel detailing",
      "Full-zip front closure with chin guard",
      "Side entry zip pockets",
      "Athletic comfort fit",
    ],
    images: [
      "/images/products/track-jacket-navy-gold-front.webp",
      "/images/products/track-jacket-navy-gold-back.webp",
    ],
    badge: "COMING SOON",
  },
  {
    id: "virat-geometric-tee-white",
    name: "VIRAT Geometric Graphic Tee - White",
    category: "T-Shirts",
    price: 0,
    priceUnconfirmed: true,
    description: "High-performance athletic training t-shirt in crisp white, featuring technical geometric graphic elements, breathable moisture-wicking fabrication, and athletic cut. Commercial details pending client confirmation.",
    features: [
      "Advanced moisture-wicking technical fabric",
      "Signature geometric graphic print",
      "Ergonomic athletic silhouette",
      "Reinforced crew collar and durable flatlock seams",
    ],
    images: [
      "/images/products/training-tee-white-front.webp",
      "/images/products/training-tee-white-back.webp",
    ],
    badge: "COMING SOON",
    sizes: [],
    hasBackground: true,
  },
  {
    id: "virat-track-pant-white",
    name: "VIRAT Performance Track Pant - White",
    category: "Bottoms",
    price: 0,
    priceUnconfirmed: true,
    description: "Engineered white athletic track pant with streamlined tapered fit, ribbed ankle cuffs, zippered secure pockets, and athletic performance stretch. Commercial details pending client confirmation.",
    features: [
      "Breathable four-way stretch technical fabric",
      "Elasticated waistband with adjustable internal drawcord",
      "Concealed zippered side storage pockets",
      "Tapered leg profile with ribbed cuffs",
    ],
    images: [
      "/images/products/track-pant-white-front.webp",
      "/images/products/track-pant-white-back.webp",
      "/images/products/track-pant-white-duo.webp",
      "/images/products/track-pant-white-showcase-front.webp",
      "/images/products/track-pant-white-showcase-back.webp",
    ],
    badge: "COMING SOON",
    sizes: [],
    hasBackground: true,
  },
  {
    id: "virat-geometric-tee-pink",
    name: "VIRAT Geometric Graphic Tee - Coral Pink",
    category: "T-Shirts",
    price: 0,
    priceUnconfirmed: true,
    description: "Athletic performance training t-shirt in energetic coral pink, featuring technical angular geometric graphics, breathable moisture-wicking fabrication, and athletic cut. Commercial details pending client confirmation.",
    features: [
      "Breathable moisture-wicking technical fabric",
      "Signature angular geometric graphic print",
      "Ergonomic athletic silhouette",
      "Reinforced crew collar and durable flatlock seams",
    ],
    images: [
      "/images/products/training-tee-pink-front.webp",
      "/images/products/training-tee-pink-back.webp",
      "/images/products/training-tee-pink-duo.webp",
    ],
    badge: "COMING SOON",
    sizes: [],
    hasBackground: true,
  },
  {
    id: "virat-geometric-tee-purple",
    name: "VIRAT Geometric Graphic Tee - Lavender Purple",
    category: "T-Shirts",
    price: 0,
    priceUnconfirmed: true,
    description: "Athletic performance training t-shirt in lavender purple, engineered with technical geometric graphics, sweat-wicking knit structure, and freedom-of-movement tailoring. Commercial details pending client confirmation.",
    features: [
      "Lightweight sweat-wicking performance knit",
      "Signature geometric chest and shoulder print",
      "Athletic comfort fit with ergonomic seams",
      "Shape-retention ribbed collar",
    ],
    images: [
      "/images/products/training-tee-purple-front.webp",
      "/images/products/training-tee-purple-back.webp",
      "/images/products/training-tee-purple-duo.webp",
    ],
    badge: "COMING SOON",
    sizes: [],
    hasBackground: true,
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [productData, setProductData] = useState<ProductItem>(() => {
    return productsDatabase.find((p) => p.id === id) || productsDatabase[0];
  });

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    api
      .getProductById(id)
      .then((fetched) => {
        if (isMounted && fetched) {
          setProductData({
            ...fetched,
            features: fetched.features || [],
            images:
              fetched.images && fetched.images.length > 0
                ? fetched.images
                : ["/images/products/training-tee-navy-front.webp"],
          });
        }
      })
      .catch(() => {
        // Fallback remains initial static productData
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const product = productData;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image:
          Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : performanceTee,
        category: product.category,
      },
      selectedSize,
      1
    );
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
          <Link
            to={
              product.category.toLowerCase() === "accessories"
                ? "/accessories"
                : "/men"
            }
            className="transition-colors hover:text-[#FF0000]"
          >
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
            {product.images.map((img: string, idx: number) => {
              const thumbPres = getImagePresentation(img, {
                context: "thumbnail",
                explicitMode: product.hasBackground ? "photographic" : undefined,
              });
              return (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  style={thumbPres.containerStyle}
                  className={`
                    relative aspect-[4/5] w-20 overflow-hidden ${thumbPres.containerClass} transition-all
                    md:w-full
                    ${
                      activeImage === idx
                        ? "border-2 border-[#FF0000]"
                        : "border border-transparent hover:border-black/20"
                    }
                  `}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className={thumbPres.imageClass}
                  />
                </button>
              );
            })}
          </div>

          {/* Main Image */}
          {(() => {
            const currentImages =
              product.images && product.images.length > 0
                ? product.images
                : ["/images/products/training-tee-white-front.webp"];
            const currentIdx =
              activeImage < currentImages.length ? activeImage : 0;
            const currentSrc = currentImages[currentIdx];
            const mainPres = getImagePresentation(currentSrc, {
              context: "detail",
              explicitMode: product.hasBackground ? "photographic" : undefined,
            });

            return (
              <div
                style={mainPres.containerStyle}
                className={`relative flex-1 ${mainPres.containerClass} overflow-hidden group flex items-center justify-center`}
              >
                {product.badge && (
                  <span className="absolute left-5 top-5 z-10 bg-[#FF0000] px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                    {product.badge}
                  </span>
                )}

                <motion.img
                  key={currentIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={currentSrc}
                  alt={product.name}
                  className={mainPres.imageClass}
                />
              </div>
            );
          })()}
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
              {product.name}
              <span className="text-[#FF0000]">.</span>
            </h1>

            {product.price > 0 && !product.priceUnconfirmed ? (
              <p className="mb-8 text-2xl font-bold">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            ) : (
              <div className="mb-8">
                <p className="text-xl font-bold text-[#FF0000]">
                  Price Unconfirmed / Coming Soon
                </p>
                <p className="mt-1 text-xs text-black/60">
                  Official retail pricing, size runs, and warehouse inventory
                  are currently being finalized by the client. Online ordering
                  is currently disabled.
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                Select Size
              </span>
              <button className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/50 underline transition-colors hover:text-black">
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      flex h-12 items-center justify-center border text-[11px] font-bold uppercase tracking-[0.1em] transition-all
                      ${
                        selectedSize === size
                          ? "border-[#FF0000] bg-[#FF0000] text-white"
                          : "border-black/10 bg-white/50 hover:border-black/40"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))
              ) : product.sizes && product.sizes.length === 0 ? (
                <div className="col-span-3 sm:col-span-6 border border-black/10 bg-black/5 px-4 py-3 text-xs text-black/60">
                  Official size run awaiting client confirmation.
                </div>
              ) : product.category.toLowerCase() === "accessories" ? (
                <div className="col-span-3 sm:col-span-6 border border-black/10 bg-white/50 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-black/70">
                  Standard Adjustable Fit (One Size)
                </div>
              ) : (
                SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      flex h-12 items-center justify-center border text-[11px] font-bold uppercase tracking-[0.1em] transition-all
                      ${
                        selectedSize === size
                          ? "border-[#FF0000] bg-[#FF0000] text-white"
                          : "border-black/10 bg-white/50 hover:border-black/40"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))
              )}
            </div>
          </motion.div>

          {product.price === 0 || product.priceUnconfirmed ? (
            <div className="w-full border border-black/20 bg-black/5 px-8 py-5 text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-black/50">
                Coming Soon — Price Pending Confirmation
              </span>
            </div>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`
                group relative flex w-full items-center justify-center overflow-hidden border px-8 py-5
                transition-all duration-300
                ${
                  isAdded
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-[#080808] bg-[#080808] text-white hover:bg-transparent hover:text-[#080808]"
                }
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
                    <ArrowRight
                      size={18}
                      strokeWidth={2}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </span>
            </motion.button>
          )}

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
              {product.features?.map((feature: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-black/70"
                >
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
