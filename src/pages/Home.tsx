import { Container } from "@mui/material";

import FeaturedCard from "@/components/FeaturedCard";
import CategoryCard from "@/components/CategoryCard";
import TrendingSection from "@/components/TrendingSection";
import TestimonialSection from "@/components/TestimonialSection";
import BlurFade from "@/components/magicui/blur-fade";

export default function Home() {
  return (
    <Container>
      <BlurFade>
        <div className="flex justify-between mt-[3em]">
          <CategoryCard title="Women" imageUrl="/product4.jpg" />
          <CategoryCard title="Men" imageUrl="/product2.jpg" />
          <CategoryCard title="Kids" imageUrl="/product3.jpg" />
        </div>
        <FeaturedCard />
        <h1 className="text-6xl font-bold text-center mt-[3em]">Trending</h1>
        <TrendingSection />
        <h1 className="text-6xl font-bold text-center mt-[3em]">Testimonials</h1>
        <TestimonialSection />
      </BlurFade>
    </Container>
  );
}