import bcrypt from "bcryptjs";
import crypto from "crypto";
import { config } from "./env.js";

export const generateDeterministicObjectId = (seed: string): string => {
  return crypto.createHash("md5").update(seed).digest("hex").substring(0, 24);
};

export interface StoreProduct {
  id: string;
  _id?: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
  badge?: string;
  sizes: string[];
  stock: number;
  isActive: boolean;
  priceUnconfirmed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreOrder {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image?: string;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  orderStatus: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending_payment";
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreAdmin {
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  deliveryStatus: "sent" | "mock_logged" | "failed";
  errorDetails?: string;
  createdAt: Date;
}

// Verified client product catalog (15 products across 8 families)
export const initialProducts: StoreProduct[] = [
  {
    id: "virat-classic-cap-black",
    name: "VIRAT Classic Sports Cap - Black",
    category: "Accessories",
    subcategory: "Headwear",
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
    sizes: ["ONE SIZE"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-classic-cap-red",
    name: "VIRAT Classic Sports Cap - Red",
    category: "Accessories",
    subcategory: "Headwear",
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
    sizes: ["ONE SIZE"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-classic-cap-white",
    name: "VIRAT Classic Sports Cap - White",
    category: "Accessories",
    subcategory: "Headwear",
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
    sizes: ["ONE SIZE"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-camo-track-pant",
    name: "VIRAT Camo Performance Track Pant",
    category: "Men",
    subcategory: "Track Pants",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-camo-training-shorts",
    name: "VIRAT Camo Training Shorts",
    category: "Men",
    subcategory: "Shorts",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-pro-match-shorts",
    name: "VIRAT 'Never Give Up' Pro Match Shorts",
    category: "Men",
    subcategory: "Shorts",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-geometric-tee-navy",
    name: "VIRAT Geometric Graphic Tee - Navy Blue",
    category: "Men",
    subcategory: "T-Shirts",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-geometric-tee-green",
    name: "VIRAT Geometric Graphic Tee - Olive Green",
    category: "Men",
    subcategory: "T-Shirts",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-geometric-tee-grey",
    name: "VIRAT Geometric Graphic Tee - Heather Grey",
    category: "Men",
    subcategory: "T-Shirts",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-sleeveless-vest-maroon",
    name: "VIRAT Geometric Sleeveless Vest - Maroon",
    category: "Men",
    subcategory: "Sleeveless",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-sleeveless-vest-green",
    name: "VIRAT Geometric Sleeveless Vest - Sage Green",
    category: "Men",
    subcategory: "Sleeveless",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-performance-polo-mint",
    name: "VIRAT Performance Pique Polo - Mint Green",
    category: "Men",
    subcategory: "Polos",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-performance-polo-blue",
    name: "VIRAT Performance Pique Polo - Sky Blue",
    category: "Men",
    subcategory: "Polos",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-track-jacket-navy-red",
    name: "VIRAT Athletic Zip-Up Track Jacket - Navy/Red",
    category: "Men",
    subcategory: "Jackets",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-track-jacket-navy-gold",
    name: "VIRAT Athletic Zip-Up Track Jacket - Navy/Gold",
    category: "Men",
    subcategory: "Jackets",
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
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-geometric-tee-white",
    name: "VIRAT Geometric Graphic Tee - White",
    category: "Men",
    subcategory: "T-Shirts",
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
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-track-pant-white",
    name: "VIRAT Performance Track Pant - White",
    category: "Men",
    subcategory: "Bottoms",
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
    stock: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Populate deterministic 24-character hexadecimal _id for each product
initialProducts.forEach((product) => {
  if (!product._id) {
    product._id = generateDeterministicObjectId(product.id);
  }
});

// In-Memory state for graceful fallback
export const memoryStore = {
  products: initialProducts.map((p) => ({ ...p })),
  orders: [] as StoreOrder[],
  admins: [] as StoreAdmin[],
  contacts: [] as StoreContact[],
};

// Reset helper for test suites
export const resetMemoryStoreForTesting = () => {
  memoryStore.products = initialProducts.map((p) => ({ ...p }));
  memoryStore.orders = [];
  memoryStore.contacts = [];
};

// Initialize default admin in memory store
const initMemoryAdmin = async () => {
  const hash = await bcrypt.hash(config.INITIAL_ADMIN_PASSWORD, 10);
  memoryStore.admins.push({
    email: config.INITIAL_ADMIN_EMAIL.toLowerCase(),
    passwordHash: hash,
    name: "Store Administrator",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

initMemoryAdmin().catch((err) =>
  console.error("[MEMORY STORE] Failed initializing default admin:", err)
);

