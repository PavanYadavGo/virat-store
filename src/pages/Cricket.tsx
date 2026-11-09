import SEO from "../components/common/SEO";
import ShopPage from "../components/shop/ShopPage";

const Cricket = () => {
  return (
    <>
      <SEO
        title="Cricket Collection"
        description="Everything for the game. Cricket clothing, equipment, accessories and footwear built around athletic performance."
        canonical="/cricket"
      />
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
