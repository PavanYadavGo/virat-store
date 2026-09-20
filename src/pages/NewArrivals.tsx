import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ShopPage from "../components/shop/ShopPage";

const NewArrivals = () => {
  return (
    <>
      <Navbar />

      <ShopPage
        eyebrow="05 — Fresh in"
        title="New Arrivals"
        description="The latest pieces from Virat. New silhouettes, fresh colours and performance-ready essentials."
        categories={[
          "Men",
          "Women",
          "Cricket",
          "Sports",
        ]}
      />

      <Footer />
    </>
  );
};

export default NewArrivals;