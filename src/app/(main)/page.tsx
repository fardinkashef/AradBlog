import AboutSection from "@/components/home/AboutSection";
import MyCarousel from "@/components/home/MyCarousel";
import RecentPostsSection from "@/components/home/RecentPostsSection";
import ServicesSection from "@/components/home/ServicesSection";
import Slogan from "@/components/home/Slogan";
import { generateSlug } from "@/lib/utils/posts";

export default function HomePage() {
  console.log(
    "React 19 Memoization: No More useMemo & useCallback??",
    generateSlug("React 19 Memoization: No More useMemo & useCallback??")
  );
  console.log(
    "",
    generateSlug("Express.js Secrets That Senior Developers Don’t Share")
  );

  return (
    <div className="bg-inherit">
      <MyCarousel />
      <AboutSection />
      <ServicesSection />
      <RecentPostsSection />
      <Slogan />
    </div>
  );
}
