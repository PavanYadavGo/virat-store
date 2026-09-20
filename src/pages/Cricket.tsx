import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ShopPage from "../components/shop/ShopPage";

const Cricket = () => {
  return (
    <>
      <Navbar />

      <ShopPage
        eyebrow="Cricket — Virat"
        title="Cricket"
        description="Everything for the game. Cricket clothing, equipment, accessories and footwear built around performance."
        categories={[
          "Helmets",
          "Clothing",
          "Cricket Balls",
          "Bags",
          "Accessories",
          "Shoes",
          "Outlet",
        ]}
      />
    </>
  );
};

export default Cricket;