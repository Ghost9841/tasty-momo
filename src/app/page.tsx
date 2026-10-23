import Navbar from "@/components/ui/bar/Navbar";
import HeroSection from "./(home)/HeroSection";
import Footer from "@/components/ui/bar/Footer";
import SpecialDishes from "./(home)/SpecialDishes";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <HeroSection/>
      <SpecialDishes/>
      <Footer/>
    </div>
  );
}
