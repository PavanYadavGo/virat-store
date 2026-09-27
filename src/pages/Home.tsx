import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
// import FeaturedProducts from "../components/home/FeaturedProducts";
import CricketCollection from "../components/home/CricketCollection";
// import OffTheField from "../components/home/OffTheField";
// import NewArrivals from "../components/home/NewArrivals";
// import FinalCTA from "../components/home/FinalCTA";
import ContactUs from "../components/home/ContactusSection";
import SeeItInAction from "../components/home/SeeItInAction";
import PartnersCarousel from "../components/home/PartnersCarousel";
import TeamWearSection from "../components/home/TeamwearSection";

const Home = () => {
  return (
    <main>
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