import bcrypt from "bcryptjs";
import { config } from "./env.js";

export interface StoreProduct {
  id: string;
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

// Initial catalog seeded from existing frontend components
export const initialProducts: StoreProduct[] = [
  {
    id: "core-performance-tee",
    name: "Core Performance Tee",
    category: "Men",
    subcategory: "T-Shirts",
    price: 999,
    description: "Built for every move. The Core Performance Tee is engineered with sweat-wicking technology and a lightweight feel, keeping you focused on the game.",
    features: [
      "Moisture-wicking athletic fabric",
      "Athletic ergonomic fit",
      "Reflective performance details",
      "100% Recycled Technical Polyester",
    ],
    images: ["/src/assets/products/performance-tee.png"],
    badge: "NEW",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 75,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-performance-polo",
    name: "Virat Performance Polo",
    category: "Men",
    subcategory: "Polos",
    price: 1299,
    description: "Bring style to your game. The Virat Performance Polo blends classic aesthetics with modern activewear tech for ultimate comfort on and off the pitch.",
    features: [
      "Breathable pique knit construction",
      "Structured anti-curl ribbed collar",
      "Four-way performance stretch",
      "Premium breathable cotton-poly blend",
    ],
    images: ["/src/assets/products/virat-polo.png"],
    badge: "POPULAR",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "match-day-shorts",
    name: "Match Day Shorts",
    category: "Cricket",
    subcategory: "Shorts",
    price: 899,
    description: "Move freely. Our Match Day Shorts offer unparalleled mobility and active ventilation for intense training sessions or match day readiness.",
    features: [
      "Elastic waistband with drawcord adjustment",
      "Concealed side zipper pockets",
      "Ultra-lightweight woven moisture-release fabric",
      "7-inch athletic inseam",
    ],
    images: ["/src/assets/products/match-day-shorts.png"],
    badge: "BESTSELLER",
    sizes: ["S", "M", "L", "XL"],
    stock: 60,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "velocity-jersey",
    name: "Pro Velocity Cricket Jersey",
    category: "Cricket",
    subcategory: "Tops",
    price: 1499,
    description: "Lightweight match-day construction engineered for unrestricted batting and fielding performance in all conditions.",
    features: [
      "Engineered micro-mesh ventilation zones",
      "Reinforced seam durability",
      "Anti-odor antimicrobial treatment",
      "Lightweight athletic fit",
    ],
    images: ["/src/assets/products/velocity-jersey.png"],
    badge: "OFFICIAL",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 40,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "essential-training-tee",
    name: "Essential Training Tee",
    category: "Women",
    subcategory: "Tops",
    price: 899,
    description: "A clean performance essential designed for training, conditioning, and everyday movement.",
    features: [
      "Ultra-soft hand feel",
      "Flatlock seams prevent chafing",
      "Quick-dry yarn technology",
    ],
    images: ["/src/assets/products/performance-tee.png"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 65,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "street-lifestyle-polo",
    name: "Street Lifestyle Polo",
    category: "Men",
    subcategory: "Polos",
    price: 1299,
    description: "Sport-inspired styling tailored into an effortless everyday silhouette.",
    features: [
      "Classic 3-button placket",
      "Subtle Virat crest embroidery",
      "Comfort fit for all-day wear",
    ],
    images: ["/src/assets/products/virat-polo.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 45,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "sprint-training-shorts",
    name: "Sprint Training Shorts",
    category: "Women",
    subcategory: "Shorts",
    price: 799,
    description: "Lightweight sports shorts engineered to keep up with high-intensity interval workouts and track drills.",
    features: [
      "Built-in liner for maximum support",
      "Reflective night-training accents",
      "Internal key / card pocket",
    ],
    images: ["/src/assets/products/match-day-shorts.png"],
    sizes: ["XS", "S", "M", "L"],
    stock: 55,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "virat-pro-cap",
    name: "Virat Pro Athlete Cap",
    category: "Accessories",
    subcategory: "Hats & Caps",
    price: 699,
    description: "Structured athletic cap designed with sweat-absorbing headband and laser-perforated side panels for optimal breathability.",
    features: [
      "Laser-cut breathability perforations",
      "Pre-curved bill structure",
      "Custom metal buckle strap",
    ],
    images: ["/src/assets/categories/Category images/cap.png"],
    badge: "POPULAR",
    sizes: ["ONE SIZE"],
    stock: 100,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "pro-cricket-backpack",
    name: "Pro Cricket Kit Backpack",
    category: "Accessories",
    subcategory: "Bags",
    price: 2499,
    description: "Dedicated gear transport featuring external dual bat sleeves, shoe ventilation compartment, and reinforced weather-resistant shell.",
    features: [
      "Twin padded bat holding sleeves",
      "Isolated bottom cleat / shoe garage",
      "Padded air-mesh shoulder straps",
      "Heavy-duty water-repellent ballistic nylon",
    ],
    images: ["/src/assets/categories/Category images/bagpack.png"],
    badge: "PRO SERIES",
    sizes: ["ONE SIZE"],
    stock: 30,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// In-Memory state for graceful fallback
export const memoryStore = {
  products: [...initialProducts],
  orders: [] as StoreOrder[],
  admins: [] as StoreAdmin[],
  contacts: [] as StoreContact[],
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

