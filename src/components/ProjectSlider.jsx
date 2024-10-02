import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 768px)': { slidesToScroll: 3 },
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const projects = [
    {
      title: "Smart Home Automation System",
      description: "Learn how to build a complete smart home system using our components and step-by-step guide.",
      image: "/placeholder.svg"
    },
    {
      title: "DIY Weather Station",
      description: "Create your own weather monitoring system with real-time data logging and visualization.",
      image: "/placeholder.svg"
    },
    {
      title: "Robotic Arm Kit",
      description: "Build and program a fully functional robotic arm for various applications.",
      image: "/placeholder.svg"
    },
    {
      title: "Solar-Powered IoT Device",
      description: "Develop an eco-friendly IoT device powered by solar energy for sustainable projects.",
      image: "/placeholder.svg"
    },
    {
      title: "AI-Powered Security Camera",
      description: "Create an intelligent security camera system with machine learning capabilities.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project, index) => (
            <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] min-w-0 px-2">
              <Card className="m-4">
                <CardHeader>
                  <img src={project.image} alt={project.title} className="w-full h-48 md:h-64 object-cover rounded-md mb-4" />
                  <CardTitle className="text-lg md:text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-gray-600 mb-4">{project.description}</p>
                  <Button asChild className="w-full md:w-auto">
                    <Link to="/projects">View Project Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={scrollPrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200 hidden md:block">
        <ChevronLeft />
      </Button>
      <Button onClick={scrollNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200 hidden md:block">
        <ChevronRight />
      </Button>
    </div>
  );
};

export default ProjectSlider;