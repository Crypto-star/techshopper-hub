import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonial = ({ name, content }) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <p className="italic mb-2">"{content}"</p>
      <p className="font-semibold">- {name}</p>
    </CardContent>
  </Card>
);

const TestimonialSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials = [
    { name: "John Doe", content: "TechnoMart has everything I need for my electronics projects. Great quality and fast shipping!" },
    { name: "Jane Smith", content: "The STEM kits from TechnoMart have been a game-changer in my classroom. My students love them!" },
    { name: "Mike Johnson", content: "I've been a customer for years, and TechnoMart never disappoints. Their customer service is top-notch!" },
    { name: "Sarah Lee", content: "As a hobbyist, I appreciate the wide range of components available. It's my go-to store for all my DIY needs." },
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 pl-4">
              <Testimonial {...testimonial} />
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

export default TestimonialSlider;