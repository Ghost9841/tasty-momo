import HeroSection from "./(home)/HeroSection";
import Footer from "@/components/ui/bar/Footer";
import SpecialDishes from "./(home)/SpecialDishes";
import WelcomeSection from "./(home)/WelcomeSection";
import ExpertChef from "./(home)/ExpertChef";
import Testimonials from "./(home)/Testimonials";
import Newsletter from "./(home)/Newsletter";
import { MotionProvider } from "@/lib/motion";

export default function Home() {
  return (
    // MotionProvider turns movement off for visitors who set "reduce motion"
    <MotionProvider>
      <div className="">
        <HeroSection/>
        <SpecialDishes/>
        <WelcomeSection/>
        <ExpertChef/>
        <Testimonials/>
        <Newsletter/>
        <Footer/>
      </div>
    </MotionProvider>
  );
}
