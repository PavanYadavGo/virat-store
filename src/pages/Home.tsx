import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CricketCollection from "../components/home/CricketCollection";
import OffTheField from "../components/home/OffTheField";
import NewArrivals from "../components/home/NewArrivals";
import FinalCTA from "../components/home/FinalCTA";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <CricketCollection />
      <OffTheField />
      <NewArrivals />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Home;