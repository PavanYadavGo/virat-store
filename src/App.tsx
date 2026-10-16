import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GoToTop from "./components/GoToTop";

import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import Cricket from "./pages/Cricket";
import Accessories from "./pages/Accessories";
import DesignYourOwn from "./pages/DesignYourOwn";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import AllProducts from "./pages/AllProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentPending from "./pages/PaymentPending";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminInquiries from "./pages/admin/AdminInquiries";

import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

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