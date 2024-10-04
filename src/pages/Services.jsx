import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServiceCard = ({ title, description, icon }) => (
  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <span className="text-3xl">{icon}</span>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col justify-between h-full pt-4">
      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      <Button className="w-full mt-auto">Learn More</Button>
    </CardContent>
  </Card>
);

const Services = () => {
  const services = [
    {
      title: "3D Printing Services",
      description: "Bring your designs to life with our high-quality 3D printing service. We offer a range of materials including PLA, ABS, and PETG, with options for different colors and finishes.",
      icon: "🖨️"
    },
    {
      title: "PCB Design & Printing",
      description: "From concept to finished product, our PCB design and printing service covers it all. We offer custom designs, prototyping, and full-scale manufacturing for your electronic projects.",
      icon: "🔌"
    },
    {
      title: "Laser Cutting & Engraving",
      description: "Precision cutting and engraving for a variety of materials including wood, acrylic, and metal. Perfect for creating custom enclosures, signage, or decorative elements for your projects.",
      icon: "✂️"
    },
    {
      title: "2D/3D Modeling",
      description: "Our expert designers can help you create detailed 2D and 3D models for your projects. Whether it's for product design, architectural models, or visualization, we've got you covered.",
      icon: "🎨"
    },
    {
      title: "Prototype Development",
      description: "Turn your ideas into reality with our prototype development service. We can help with both mechanical and electronic prototypes, from initial concept to functional models.",
      icon: "🛠️"
    },
    {
      title: "Software & Web Solutions",
      description: "Need a custom app or website for your project? Our team of developers can create tailored software solutions, from embedded systems to full-stack web applications.",
      icon: "💻"
    },
    {
      title: "Engineering & Diploma Projects",
      description: "Get expert guidance and support for your academic projects. We offer assistance with project planning, component selection, and implementation for a wide range of engineering disciplines.",
      icon: "🎓"
    },
    {
      title: "Startup Solutions",
      description: "From product design to MVP development, we provide comprehensive support for tech startups. Let us help you bring your innovative ideas to market quickly and efficiently.",
      icon: "🚀"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-600 dark:text-blue-400">Our Services</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        At TechnoMart, we offer a wide range of services to support your projects, from concept to completion. 
        Whether you're a hobbyist, student, or professional, our expert team is here to help you succeed.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} description={service.description} icon={service.icon} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
          Request a Custom Service
        </Button>
      </div>
    </div>
  );
};

export default Services;