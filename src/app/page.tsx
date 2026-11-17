import HeroSection from "./(home)/HeroSection";
import Footer from "@/components/ui/bar/Footer";
import SpecialDishes from "./(home)/SpecialDishes";
import WelcomeSection from "./(home)/WelcomeSection";
import ExpertChef from "./(home)/ExpertChef";
import Testimonials from "./(home)/Testimonials";
import Newsletter from "./(home)/Newsletter";

export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      <SpecialDishes/>
      <WelcomeSection/>
      <ExpertChef/>
      <Testimonials/>
      <Newsletter/>
      <Footer/>
    </div>
  );
}
