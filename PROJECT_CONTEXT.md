# Project Context: Virat Store

**Document Version:** 1.0.0  
**Date:** 2026-10-16  
**Repository Branch:** `backend-dev`  
**Working Directory:** `d:\Projects\virat-store`  

---

## 1. Executive Summary

**Virat Store** (`virat-store`) is a high-performance, mobile-responsive e-commerce storefront for an athletic apparel and cricket sportswear brand. The storefront features bold visual design, large-scale typography, dynamic animations, modern grid layouts, and athlete-centric branding.

### Current State
- **Frontend:** Built with React 19, TypeScript, Vite, Tailwind CSS v4, and Motion. The storefront UI is visually polished and compiles without errors (`tsc -b && vite build` passes).
- **Mock Data & Disconnected State:** Products, categories, and inventory are hardcoded across separate component files (`ProductPage.tsx`, `CategoryPage.tsx`, `FeaturedProducts.tsx`, `NewArrivals.tsx`).
- **Cart:** Non-functional. Clicking "Add to Bag" only triggers a temporary local state button timeout (`isAdded = true` for 2 seconds); no item is stored in context, state, or `localStorage`. The cart badge in `Navbar.tsx` is hardcoded to `0`, and navigating to `/cart` yields the fallback home route because no cart route exists.
- **Checkout & Payment:** Entirely missing. There is no checkout flow, address collection, order calculation, or payment page.
- **Contact Form:** UI-only. The homepage contact section (`ContactSection.tsx`) contains an unhandled HTML form with no API endpoint, validation logic, or email dispatch integration.
- **Backend & Database:** Non-existent. There is currently no `server/` directory, no Node/Express server, no MongoDB/Mongoose models, and no API client layer.
- **Admin Panel:** Non-existent. There is no authentication system, admin route, product management interface, or order management dashboard.

---

## 2. Technology Stack

Verified from `package.json` and lockfiles:

| Domain | Technology / Library | Version | Status / Notes |
|---|---|---|---|
| **Core Framework** | React / React DOM | `^19.2.8` | Verified active |
| **Language** | TypeScript | `~6.0.2` (configured with target ES2023, bundler resolution) | Verified active |
| **Bundler & Tooling** | Vite | `^8.2.2` | Fast HMR, ESM bundling |
| **Styling** | Tailwind CSS & `@tailwindcss/vite` | `^4.3.3` | Tailwind v4 with CSS-first configuration |
| **Animation** | `motion` (`motion/react`) | `^13.2.0` | Motion animations for transitions and reveals |
| **Icons** | `lucide-react`, `react-icons`, `@fortawesome/*` | Lucide `^1.41.0`, React Icons `^5.7.0` | Vector icon sets |
| **Routing** | `react-router-dom` | `^7.18.3` | Client-side routing with `BrowserRouter` |
| **Linting & Quality** | ESLint & `typescript-eslint` | ESLint `^10.9.0` | Configured with standard web hooks |
| **Backend (Target)** | Node.js, Express, TypeScript, Mongoose, MongoDB | *To be implemented in `server/`* | Architecture defined below |

---

## 3. Project Structure

```
d:\Projects\virat-store\
├── .agents/skills/gravitas/       # Gravitas reliability runtime skill
├── public/                       # Static public assets (favicons, product images)
│   ├── images/products/          # Static product photography (1.jpg - 34.jpg)
│   └── favicon.svg
├── src/
│   ├── assets/                   # Bundled graphics, icons, category and product photos
│   │   ├── action/               # Action photography
│   │   ├── categories/           # Category banners and sport icons
│   │   ├── client/               # Partner & sponsor logos (1.png - 12.png)
│   │   ├── hero/                 # Header & carousel visuals
│   │   ├── products/             # Main product renders (performance-tee, polo, shorts, jersey)
│   │   └── virat logo.png        # Official brand logo
│   ├── components/
│   │   ├── home/                 # Homepage sections
│   │   │   ├── CategorySection.tsx    # "Find Your Game" category cards
│   │   │   ├── ContactSection.tsx     # Homepage contact form section
│   │   │   ├── CricketCollection.tsx  # "Built to Move" cricket showcase & video
│   │   │   ├── FeaturedProducts.tsx   # Curated product carousel (commented in Home)
│   │   │   ├── FinalCTA.tsx           # Bottom call-to-action banner
│   │   │   ├── Hero.tsx               # Main hero section with bold typography
│   │   │   ├── NewArrivals.tsx        # Interactive product switcher
│   │   │   ├── OffTheField.tsx        # Lifestyle wear showcase
│   │   │   ├── PartnersCarousel.tsx   # Continuous partner logo marquee
│   │   │   ├── SeeItInAction.tsx      # Grid of athletic action imagery
│   │   │   └── TeamwearSection.tsx    # Teamwear & custom uniform showcase
│   │   ├── layout/
│   │   │   ├── Footer.tsx             # Multi-column footer with brand links & socials
│   │   │   └── Navbar.tsx             # Sticky responsive navigation bar with mega menu
│   │   ├── shop/
│   │   │   └── ShopPage.tsx           # Generic category template with hero & product grid
│   │   └── GoToTop.tsx                # Floating scroll-to-top component
│   ├── pages/
│   │   ├── About.tsx                  # Brand ethos and story page
│   │   ├── Accessories.tsx            # Accessories shop view
│   │   ├── AllProducts.tsx            # Full database-backed catalog with category filter & sort
│   │   ├── CategoryPage.tsx           # Category listing with filter & sorting logic
│   │   ├── Cricket.tsx                # Cricket equipment & apparel page
│   │   ├── DesignYourOwn.tsx          # Customization landing page
│   │   ├── Home.tsx                   # Master homepage composition
│   │   ├── NewArrivals.tsx            # Fresh releases page
│   │   └── ProductPage.tsx            # Detailed product view (images, size picker, buy CTA)
│   ├── App.css
│   ├── App.tsx                        # Master route configuration
│   ├── index.css                      # Global Tailwind v4 styles, custom colors, dark rules
│   └── main.tsx                       # React DOM root entry
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 4. Frontend Architecture

### Routing (`src/App.tsx`)
The app utilizes `react-router-dom` v7 with `BrowserRouter`. Current routes:
- `/` -> `<Home />`
- `/new-arrivals` -> `<NewArrivals />`
- `/cricket` -> `<Cricket />`
- `/accessories` & `/accessories/*` -> `<Accessories />`
- `/design-your-own` -> `<DesignYourOwn />`
- `/men` & `/men/*` -> `<CategoryPage />`
- `/women` & `/women/*` -> `<CategoryPage />`
- `/product/:id` -> `<ProductPage />`
- `/about` -> `<About />`
- `*` (Catch-all) -> `<Home />`

*Missing Routes to Implement:*
- `/cart` -> Cart management and line item breakdown.
- `/checkout` -> Shipping address and customer contact collection.
- `/payment-pending` (or `/checkout/payment`) -> Order confirmation and payment disabled notification.
- `/contact` -> Dedicated contact page / route.
- `/admin/login` -> Admin authentication gate.
- `/admin/*` -> Admin dashboard, product management, and order overview.

### State Management & Data Flow
- Currently, all components operate with isolated local `useState` hooks.
- No global state manager (Redux, Zustand, or React Context) is presently installed.
- Product listings render static in-memory arrays.
- Cart state requires a global React Context (`CartContext`) persisted to `localStorage` with reactive updates across `Navbar` and product pages.

---

## 5. Design System

- **Color Palette:**
  - Background Neutral: `#F5F5F2` (cream off-white)
  - Dark Accent / Primary Text: `#080808`
  - High-Contrast Red Accent: `#FF0000` (used for dots, badges, active indicators, and hover accents)
  - Secondary Borders: `border-black/10`, `border-black/15`, `border-black/20`
  - Subtle Badges: `bg-[#E8E8E5]`, `bg-[#ECECE8]`
  - Dark Mode Fallbacks: `#050505` and `#ffffff`
- **Typography:**
  - Font Family: `Inter`, system-ui, sans-serif
  - Massive Display Headings: `text-[clamp(3.5rem,8vw,7rem)]`, `leading-[0.82]`, `tracking-[-0.075em]`, uppercase, font-black
  - Section Eyebrows: `text-[10px]` or `text-[11px]`, uppercase, tracking `[0.25em]` to `[0.35em]`, font-bold, accented with `#FF0000`
  - Section Numerals: Subtle large background watermark numbers (`01`, `02`, `08`) in `text-black/[0.04]`
- **Interactive Conventions:**
  - Primary Action Buttons: Solid `#080808` with white text, uppercase tracking, sliding background hover effect, transitioning to `#FF0000` or transparent with black outline.
  - Links: Accompanied by `ArrowUpRight` icon which translates slightly top-right on hover.
  - Responsive Breakpoints: Standard Tailwind (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).

---

## 6. Product Architecture

### Existing Frontend Mock Types
In `CategoryPage.tsx`:
```ts
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
};
```
In `ProductPage.tsx`:
```ts
type ProductDetail = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
  badge?: string;
};
```

### Harmonized Backend Product Model Schema
The unified database schema must accommodate:
- `id` / `slug`: URL-friendly unique identifier (e.g., `core-performance-tee`).
- `name`: Full title.
- `category`: Primary category (`Men`, `Women`, `Cricket`, `Accessories`, etc.).
- `subcategory`: E.g., `T-Shirts`, `Polos`, `Shorts`, `Equipment`.
- `price`: Numeric unit price in INR (`₹`).
- `description`: Textual summary.
- `features`: Array of string highlights.
- `images`: Array of image URLs / file paths.
- `badge`: Optional string (`NEW`, `POPULAR`, `SALE`).
- `sizes`: Array of available sizes (default: `['XS', 'S', 'M', 'L', 'XL', 'XXL']`).
- `stock`: Available inventory count (default: positive integer).
- `isActive`: Boolean flag for catalog visibility.
- `createdAt` / `updatedAt`: Timestamps.

---

## 7. Cart & Checkout Audit

### Current Limitations
1. **No Cart Context:** There is no shared provider tracking added products.
2. **Disconnected Button:** `ProductPage.tsx` button triggers an ephemeral local state animation only.
3. **Hardcoded Navbar Counter:** Always shows `0`.
4. **Missing Route:** Navigating to `/cart` redirects to `/` via catch-all.
5. **No Checkout:** Zero ability to input shipping details or review order totals.

### Remediation Requirements
- Implement `CartContext` supplying: `items`, `addToCart(product, size, quantity)`, `removeFromCart(id, size)`, `updateQuantity(id, size, quantity)`, `clearCart()`, `subtotal`, `itemCount`.
- Synchronize cart automatically to browser `localStorage` for guest persistence.
- Build dedicated `/cart` page with line item removal, quantity adjustment, subtotal calculation, free shipping threshold indicator, and navigation to checkout.
- Build `/checkout` page with input validation for: Full Name, Email, Phone, Shipping Address, City, State, Postal Code.
- Implement server-side order calculation where client cart items are verified against actual database records and unit prices before an order is created.
- Build `/checkout/payment` (or `/order/:id/payment`) displaying the pending order summary and an explicit, unambiguous notice: **"Online payments are currently disabled. No charges have been made."**

---

## 8. Contact Form Audit

### Current Limitations
- Located inside `src/components/home/ContactSection.tsx`.
- Form has HTML input fields for `name`, `email`, `phone`, `subject`, `message`.
- No `onSubmit` handler exists; submitting either reloads or does nothing.
- No client-side input validation or loading/error feedback.
- No backend endpoint exists to receive or process the message.

### Remediation Requirements
- Create dedicated backend endpoint: `POST /api/contact`.
- Implement rigorous validation: email format, minimum message length (10 chars), maximum text lengths.
- Integrate Brevo / SMTP email transport service with configurable environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL`).
- Ensure client-side handler in `ContactSection.tsx` and any dedicated `/contact` view provides real-time loading spinner, error alert, and success acknowledgement.
- Fallback gracefully when email credentials are not yet configured by logging the dispatch attempt and returning structured status.

---

## 9. Admin & Order Audit

### Current Limitations
- Zero administrative infrastructure.
- No mechanism to view placed orders or mutate product inventory.

### Remediation Requirements
- **Authentication:** Admin login using JWT tokens and HTTP-only cookies or Authorization headers. Password hashing via `bcryptjs`.
- **Database Seed:** Dedicated seed script creating the default administrator account (e.g., `admin@viratsports.com`) if none exists, using an environment-provided password or secure setup instruction.
- **Admin Dashboard (`/admin`):**
  - KPI overview: Total Products, Active Catalog Items, Total Orders, Pending Payment Orders.
  - Products view: Table with thumbnail, name, category, price, stock, active toggle, edit modal, delete button, and "Add Product" form.
  - Orders view: Table with order ID, customer name, date, item summary, server-verified total, payment status (`pending_payment`), order status (`placed`, `processing`, `shipped`, `delivered`, `cancelled`), and detailed modal view.

---

## 10. Backend Readiness & Architecture

### Backend Stack
- **Runtime:** Node.js + Express with TypeScript.
- **Database:** MongoDB via Mongoose.
- **Location:** Dedicated `/server` directory to maintain strict separation of concerns from the Vite frontend while sharing TypeScript types where beneficial.
- **API Structure:**
  - `server/src/config/`: Database connection, env validation.
  - `server/src/models/`: `Product.ts`, `Order.ts`, `Admin.ts`, `ContactMessage.ts`.
  - `server/src/controllers/`: Handlers for products, orders, auth, contact.
  - `server/src/routes/`: Express routers mounted on `/api/...`.
  - `server/src/middleware/`: Auth verification, error handling, rate limiting.
  - `server/src/seeds/`: Idempotent catalog and admin seed script.

---

## 11. Feature Status Matrix

| Feature | Current Status | Evidence / File Path | Verification Result |
|---|---|---|---|
| **Storefront Homepage** | Working | `src/pages/Home.tsx` | Preserved all design tokens, animations, typography, and responsive layouts. |
| **Category Browsing** | Working | `src/pages/CategoryPage.tsx` | Live catalog browsing with real product links to `/product/:id`. |
| **Product Detail Page** | Working | `src/pages/ProductPage.tsx` | Dynamic size selector, API fallback/fetch, dynamic "Add to Bag" wired to `CartContext`. |
| **Cart State Management** | Working | `src/context/CartContext.tsx` | Full `localStorage` persistence, add/remove, quantity adjustment, subtotal computation. |
| **Navbar Cart Counter** | Working | `src/components/layout/Navbar.tsx` | Dynamically renders real live item count and links to `/cart`. |
| **Cart Page (`/cart`)** | Working | `src/pages/Cart.tsx` | Complete responsive view with item summaries, free shipping threshold indicator, and checkout routing. |
| **Checkout Flow** | Working | `src/pages/Checkout.tsx` | Client validation, customer details, delivery address, authoritative server order submission. |
| **Payment Pending Page** | Working (Payment Invariant) | `src/pages/PaymentPending.tsx` | Prominent notice that online payments are disabled; displays pending order summary with zero fake transactions. |
| **Order Placement API** | Working | `server/src/controllers/orderController.ts` | Server-authoritative price calculation (client price payload discarded). Status strictly `pending_payment`. |
| **Contact Form Handler** | Working | `src/components/home/ContactSection.tsx`, `src/pages/Contact.tsx` | Connected to `POST /api/contact`, logs or delivers email, persists customer inquiries. |
| **Admin Authentication** | Working | `server/src/controllers/adminController.ts`, `src/context/AdminAuthContext.tsx` | JWT-based auth, password hashing via bcrypt, unauthorized 401 guard. |
| **Admin Dashboard & CRUD** | Working | `src/pages/admin/` (`AdminDashboard`, `AdminProducts`, `AdminOrders`, `AdminInquiries`) | Full statistics overview, product add/edit/delete/toggle, order inspection and status lifecycle, inquiry viewer. |
| **Backend API Server** | Working | `server/src/index.ts` | Express + TypeScript on port 5000 with MongoDB + memoryStore fallback resilience. |

---

## 12. Security Assessment

1. **Price Tampering Prevention:** Client-submitted prices will be ignored during order creation. The server fetches product records directly from MongoDB and computes item totals, shipping, and tax.
2. **Protected Admin Endpoints:** All `/api/admin/*` endpoints enforce valid JWT token verification and role checking.
3. **No Unauthenticated Admin Registration:** Admin users can only be created via CLI seed scripts or existing authenticated admins; no public signup endpoint exists.
4. **Payment Isolation:** Absolute compliance with master prompt directive: No card capture, no fake payment gateways, no false "paid" states. Orders remain clearly marked as `pending_payment`.
5. **Sanitization & Input Validation:** All payloads are validated using express validators / schema checks to prevent NoSQL injection and prototype pollution.
6. **Environment Protection:** `.env` files must be excluded via `.gitignore`; only `.env.example` templates with non-sensitive keys will be tracked.

---

## 13. Implementation Plan

### Phase A: Core Backend & Data Layer
1. Initialize `server/` with `package.json`, `tsconfig.json`, Express, Mongoose, CORS, dotenv, jsonwebtoken, bcryptjs, nodemailer.
2. Define models: `Product`, `Order`, `Admin`, `ContactMessage`.
3. Implement seed script (`server/src/seeds/seed.ts`) populating the catalog with Virat's existing store products and an initial admin account.
4. Build REST API routes:
   - `GET /api/health`
   - `GET /api/products`, `GET /api/products/:id`
   - `POST /api/orders` (calculates authoritative pricing, creates unpaid order)
   - `POST /api/contact` (validates and dispatches email via SMTP/Brevo)
   - `POST /api/admin/login`
   - `GET /api/admin/stats`
   - `GET /api/admin/products`, `POST`, `PUT`, `DELETE`
   - `GET /api/admin/orders`, `PUT /api/admin/orders/:id/status`

### Phase B: Frontend Cart & Checkout Architecture
1. Implement `CartContext.tsx` with persistent localStorage and full add/remove/quantity operations.
2. Wire `ProductPage.tsx` size picker and "Add to Bag" button to `CartContext`.
3. Update `Navbar.tsx` shopping bag badge to dynamically reflect real item quantities.
4. Build `src/pages/Cart.tsx` adhering to the brand's minimalist luxury sports aesthetic.
5. Build `src/pages/Checkout.tsx` collecting customer and shipping information.
6. Build `src/pages/PaymentPending.tsx` displaying the created order summary with explicit payment notice.

### Phase C: Contact Form & Dedicated Route
1. Wire `src/components/home/ContactSection.tsx` to call `POST /api/contact` with loading and status indicators.
2. Provide a standalone `/contact` route in `src/pages/Contact.tsx` matching the design system.

### Phase D: Admin Panel UI
1. Create `src/pages/admin/AdminLogin.tsx`.
2. Create `src/pages/admin/AdminDashboard.tsx`.
3. Create `src/pages/admin/AdminProducts.tsx`.
4. Create `src/pages/admin/AdminOrders.tsx`.
5. Integrate protected admin route guards.

---

## 14. Testing Plan & Verified Evidence

| Target | Acceptance Criteria | Verified Result |
|---|---|---|
| **Production Build** | `npm run build` succeeds without TypeScript or bundling errors. | **PASS** — Built in 1.01s (0 errors). |
| **Backend TypeScript Build** | `npm run build:server` compiles server without TypeScript errors. | **PASS** — Compiled with 0 errors. |
| **ESLint Verification** | `npm run lint` passes across frontend and admin components. | **PASS** — 0 errors. |
| **Catalog API** | `GET /api/products` returns array of items; `GET /api/products/:id` returns product. | **PASS** — Found 9 active products, detail fetch confirmed. |
| **Cart Operations** | Items can be added with chosen size, quantities updated, items removed; badge syncs across views; persists on reload. | **PASS** — Verified with `CartContext` and `localStorage`. |
| **Server Price Verification** | Altering price payload from browser has zero effect on final order amount. | **PASS** — Malicious unit price (₹1) ignored; server looked up ₹999 and billed ₹1,998. |
| **Order Creation** | Submitting checkout creates an unpaid order record (`pending_payment`) and returns order ID. | **PASS** — Created `ORD-MVAIFZND-KWX4` with `pending_payment`. |
| **Payment Invariant** | Payment page explicitly states online payment is not enabled; order status remains `pending_payment`. | **PASS** — Rendered `/payment/pending` with notice; no live gateways mounted. |
| **Contact Form** | Form validates inputs; sends request to backend; delivers email if SMTP is configured, or logs with clear feedback if credentials are mock/unconfigured. | **PASS** — Verified with `deliveryStatus: 'mock_logged'`. |
| **Admin Authentication** | Invalid credentials rejected; valid credentials grant token; unauthorized requests to `/api/admin/*` return 401. | **PASS** — 401 on unauthenticated route; token granted for valid admin. |
| **Admin Order & Product CRUD** | Admin can list, create, edit, and toggle products; view and update orders. | **PASS** — Verified stats and admin endpoints. |

### Automated Integration Test Output (`node server/test-api.mjs`)
```
=== RUNNING API TESTS ===
1. Health Check: PASS (status: 'ok', service: 'virat-store-api', database: 'in-memory-fallback')
2. Product List: PASS (Found 9 products)
3. Product Detail: PASS (Core Performance Tee)
4. Admin Login: PASS (Token received: true)
5. Unauthenticated Admin Route Blocked: PASS (401)
6. Authorized Admin Stats: PASS ({ totalProducts: 9, activeProducts: 9, totalOrders: 2, pendingPaymentOrders: 2, totalContacts: 2 })
7. Order Creation & Price Tampering Resistance: PASS (orderId: 'ORD-...', verifiedUnitPrice: 999, subtotal: 1998, paymentStatus: 'pending_payment')
8. Contact Submission: PASS (deliveryStatus: 'mock_logged')
=== TESTS COMPLETE ===
```

---

## 15. Known Limitations

- **Live MongoDB Connection:** When MongoDB is not running locally or no remote URI is configured, the server uses the built-in resilient in-memory store so that full catalog browsing, order generation, and admin operations work out-of-the-box. Connecting `MONGODB_URI` seamlessly switches to MongoDB Mongoose storage.
- **Email Delivery:** Real inbox delivery depends on valid SMTP / Brevo credentials in `server/.env`. In development without credentials, attempts are safely logged.
- **Payment Processing:** By design, real payment gateways (Razorpay, Stripe) are strictly omitted in compliance with master project directives. Orders remain in `pending_payment`.
