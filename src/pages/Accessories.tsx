import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ShopPage from "../components/shop/ShopPage";

const Accessories = () => {
  return (
    <>
      <Navbar />

      <ShopPage
        eyebrow="Accessories — Virat"
        title="Accessories"
        description="The extras that complete your kit. Bags, headwear, socks, support gear and recovery essentials."
        categories={[
          "Bags",
          "Hats & Caps",
          "Socks",
          "Supporters",
          "Compression",
          "Shoes",
          "Recovery",
        ]}
      />

      <Footer />
    </>
  );
};

export default Accessories;