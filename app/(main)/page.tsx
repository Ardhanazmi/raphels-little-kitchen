import HeroSection from "@/components/section/hero";
import HowToOrderSection from "@/components/section/how-to-order";
import MenuSection from "@/components/section/menu";
import LocationSection from "@/components/section/location";

export default async function Home() {
  return (
    <div className="container pt-16">
      <HeroSection />
      <HowToOrderSection />
      <MenuSection />
      <LocationSection />
    </div>
  );
}
