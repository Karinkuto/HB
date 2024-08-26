import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const images = [
  "/product2.jpg",
  "/product3.jpg", // Add more image paths as needed
  "/product4.jpg",
  "/product1.jpg",
];

export default function TrendingCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="w-full my-[3em]">
      <div
        className="h-[30em] relative w-full rounded-xl my-6 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="absolute left- 5 top-[45%] w-full justify-between px-5 flex ">
          <Button variant="link" className="bg-black rounded-full bg-opacity-20 text-[17px]" onClick={goToPrev}>
            <ArrowLeft className="text-white" />
          </Button>
          <Button variant="link" className="bg-black rounded-full bg-opacity-20 text-[17px]" onClick={goToNext}>
            <ArrowRight className="text-white" />
          </Button>
        </div>
        <h1 className="absolute top-5 left-5 scroll-m-20 text-9xl font-extrabold tracking-tight text-stone-600 mix-blend-difference">
          Featured
        </h1>
      </div>
    </div>
  );
}
