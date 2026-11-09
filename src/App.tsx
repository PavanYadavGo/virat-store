import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GoToTop from "./components/GoToTop";

import Home from "./pages/Home";

// Route-level code splitting for non-critical and administrative pages
const NewArrivals = lazy(() => import("./pages/NewArrivals"));
const Cricket = lazy(() => import("./pages/Cricket"));
const Accessories = lazy(() => import("./pages/Accessories"));
const DesignYourOwn = lazy(() => import("./pages/DesignYourOwn"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentPending = lazy(() => import("./pages/PaymentPending"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));

import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

function PageLoader() {
  return (
    <div className="min-h-[60vh] bg-[#F5F5F2] flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-[#FF0000]" />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/cricket" element={<Cricket />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/design-your-own" element={<DesignYourOwn />} />

          <Route path="/men" element={<CategoryPage />} />
          <Route path="/men/*" element={<CategoryPage />} />

          <Route path="/women" element={<CategoryPage />} />
          <Route path="/women/*" element={<CategoryPage />} />

          <Route path="/accessories/*" element={<Accessories />} />

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* E-Commerce Flow */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:orderId/payment" element={<PaymentPending />} />

          {/* Admin Flow */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && <GoToTop />}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;