import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
// import FeaturedProducts from "../components/home/FeaturedProducts";
import CricketCollection from "../components/home/CricketCollection";
// import OffTheField from "../components/home/OffTheField";
// import NewArrivals from "../components/home/NewArrivals";
// import FinalCTA from "../components/home/FinalCTA";
import AboutSection from "../components/home/AboutSection";
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
      <AboutSection />
      <PartnersCarousel />
      {/* <FeaturedProducts />
      <OffTheField />
      <NewArrivals />
      <FinalCTA /> */}
    </main>
  );
};

export default Home;