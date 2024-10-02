import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const ProjectSlider = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

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
    }
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {projects.map((project, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0">
            <Card className="m-4">
              <CardHeader>
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-md mb-4" />
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <Button asChild>
                  <Link to="/projects">View Project Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;