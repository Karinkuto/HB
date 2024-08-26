import BlurFade from "./magicui/blur-fade";
import { BentoCard, BentoGrid } from "./magicui/bento-grid";
import { RabbitIcon } from "lucide-react"; // Replace with an actual icon if needed

const features = [
  {
    Icon: RabbitIcon,
    name: "Product 4",
    description: "Description of product 4",
    href: "/product4",
    cta: "Learn More",
    background: (
      <img
        src="/product4.jpg"
        className="absolute h-full w-full object-cover transition-all duration-200 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        alt="product"
      />
    ),
    className: "lg:row-start-1 lg:col-span-2",
  },
  {
    Icon: RabbitIcon,
    name: "Product 2",
    description: "Description of product 2",
    href: "/product2",
    cta: "Learn More",
    background: (
      <img
        src="/product2.jpg"
        className="absolute h-full w-full object-cover transition-all duration-200 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        alt="product"
      />
    ),
    className: "lg:row-start-1 lg:col-span-1",
  },
  {
    Icon: RabbitIcon,
    name: "Product 1",
    description: "Description of product 1",
    href: "/product1",
    cta: "Learn More",
    background: (
      <img
        src="/product1.jpg"
        className="absolute h-full w-full object-cover transition-all duration-200 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        alt="product"
      />
    ),
    className: "lg:col-span-1",
  },
  {
    Icon: RabbitIcon,
    name: "Product 3",
    description: "Description of product 3",
    href: "/product3",
    cta: "Learn More",
    background: (
      <img
        src="/product3.jpg"
        className="absolute h-full w-full object-cover transition-all duration-200 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        alt="product"
      />
    ),
    className: "lg:col-span-2",
  },
];

export default function TrendingSection() {
  return (
    <BlurFade duration={0.6} blur="8px" inView>
      <BentoGrid className="lg:grid-cols-2 gap-4 my-12">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </BlurFade>
  );
}
