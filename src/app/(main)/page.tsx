import AboutSection from "@/components/home/AboutSection";
import MyCarousel from "@/components/home/MyCarousel";
import ServicesSection from "@/components/home/ServicesSection";
import Slogan from "@/components/home/Slogan";

export default function HomePage() {
  return (
    <div className="bg-inherit">
      <MyCarousel />
      <AboutSection />
      <ServicesSection />
      <Slogan />
    </div>
  );
}
