import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import img from "@/assets/thematic-women-2.png";
import aboutHero from "@/assets/about-hero.jpg";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";

export default function ObjVisionHero() {
  return (
    <SubpageHeroCarousel
      tag="ABOUT US • OBJECTIVES & VISION"
      title="Our Objectives & Vision"
      subtitle="Building an equitable, empowered and compassionate India where no one is left behind. Developing sustainable, long-term frameworks for community transformation."
      breadcrumbs={[
        { label: "About Us", href: "/about" },
        { label: "Our Objective & Vision" },
      ]}
      images={[img, aboutHero, slide1, slide2]}
    />
  );
}
