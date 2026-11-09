import SEO from "../components/common/SEO";
import ShopPage from "../components/shop/ShopPage";

const Accessories = () => {
  return (
    <>
      <SEO
        title="Accessories"
        description="The extras that complete your cricket kit. Sports caps, duffles, kit bags, socks, support gear and recovery essentials."
        canonical="/accessories"
      />
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
    </>
  );
};

export default Accessories;
