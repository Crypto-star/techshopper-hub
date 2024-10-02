import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProduct = ({ name, description, image }) => (
  <Card className="h-full">
    <CardHeader>
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button asChild>
        <Link to="/products">Learn More</Link>
      </Button>
    </CardContent>
  </Card>
);

const FeaturedProductSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const featuredProducts = [
    { name: "Arduino Starter Kit", description: "Perfect for beginners to learn electronics and programming.", image: "/placeholder.svg" },
    { name: "Raspberry Pi 4", description: "Powerful single-board computer for various projects.", image: "/placeholder.svg" },
    { name: "STEM Robot Kit", description: "Build and program your own robot with this educational kit.", image: "/placeholder.svg" },
    { name: "IoT Sensor Pack", description: "A collection of sensors for your Internet of Things projects.", image: "/placeholder.svg" },
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {featuredProducts.map((product, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 pl-4">
              <FeaturedProduct {...product} />
            </div>
          ))}
        </div>
      </div>
      <Button onClick={scrollPrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200">
        <ChevronLeft />
      </Button>
      <Button onClick={scrollNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200">
        <ChevronRight />
      </Button>
    </div>
  );
};

export default FeaturedProductSlider;