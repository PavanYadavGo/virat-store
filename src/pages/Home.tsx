import SEO from "../components/common/SEO";
import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
// import FeaturedProducts from "../components/home/FeaturedProducts";
import CricketCollection from "../components/home/CricketCollection";
// import OffTheField from "../components/home/OffTheField";
// import NewArrivals from "../components/home/NewArrivals";
// import FinalCTA from "../components/home/FinalCTA";
import SeeItInAction from "../components/home/SeeItInAction";
import ContactUs from "../components/home/ContactSection";
import PartnersCarousel from "../components/home/PartnersCarousel";
import TeamWearSection from "../components/home/TeamwearSection";

const Home = () => {
  return (
    <main>
      <SEO
        title="Cricket & Performance Sportswear"
        description="Shop cricket-inspired sportswear at Virat. Explore cricket jerseys, sports T-shirts, shorts and tracksuits designed for everyday comfort and performance."
        canonical="/"
      />
      <Hero />
      <CategorySection />
      <CricketCollection />
      <TeamWearSection />
      <SeeItInAction />
      <PartnersCarousel />
      <ContactUs /> 
      {/* <FeaturedProducts />
      <OffTheField />
      <NewArrivals />
      <FinalCTA /> */}
    </main>
  );
};

export default Home;