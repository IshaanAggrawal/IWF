import SubpageHeroCarousel from "@/components/common/SubpageHeroCarousel";
import v2047HeroBg from "@/assets/vision2047/hero.png";
import slide2 from "@/assets/hero-carousel/hero-slide-2.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import slide1 from "@/assets/hero-carousel/hero-slide-1.jpg";

export default function V2047Hero() {
  return (
    <SubpageHeroCarousel
      tag="ABOUT US • VISION 2047"
      title="Vision 2047 — Transforming Lives, Building a New India"
      subtitle="Together, let's build an empowered, equitable and self-reliant India where no one is left behind. Celebrating 100 years of independence through long-term grassroots empowerment."
      breadcrumbs={[
        { label: "About Us", href: "/about" },
        { label: "Vision 2047" },
      ]}
      images={[slide2, v2047HeroBg, aboutHero, slide1]}
    />
  );
}
