
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

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

        <Route path="*" element={<Home />} />
      </Routes>

      <GoToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;