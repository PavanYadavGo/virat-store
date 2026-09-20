import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import Cricket from "./pages/Cricket";
import Accessories from "./pages/Accessories";
import DesignYourOwn from "./pages/DesignYourOwn";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/design-your-own" element={<DesignYourOwn />} />

        {/* Men categories */}
        <Route path="/men/*" element={<CategoryPage />} />

        {/* Women categories */}
        <Route path="/women/*" element={<CategoryPage />} />

        {/* Cricket categories */}
        <Route path="/cricket/*" element={<CategoryPage />} />

        {/* Accessories categories */}
        <Route path="/accessories/*" element={<CategoryPage />} />

        {/* Unknown route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;