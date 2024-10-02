import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceCard = ({ title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
  </Card>
);

const Services = () => {
  const services = [
    {
      title: "3D Printing Services",
      description: "Bring your designs to life with our high-quality 3D printing service. We offer a range of materials including PLA, ABS, and PETG, with options for different colors and finishes."
    },
    {
      title: "PCB Design & Printing",
      description: "From concept to finished product, our PCB design and printing service covers it all. We offer custom designs, prototyping, and full-scale manufacturing for your electronic projects."
    },
    {
      title: "Laser Cutting & Engraving",
      description: "Precision cutting and engraving for a variety of materials including wood, acrylic, and metal. Perfect for creating custom enclosures, signage, or decorative elements for your projects."
    },
    {
      title: "2D/3D Modeling",
      description: "Our expert designers can help you create detailed 2D and 3D models for your projects. Whether it's for product design, architectural models, or visualization, we've got you covered."
    },
    {
      title: "Prototype Development",
      description: "Turn your ideas into reality with our prototype development service. We can help with both mechanical and electronic prototypes, from initial concept to functional models."
    },
    {
      title: "Software & Web Solutions",
      description: "Need a custom app or website for your project? Our team of developers can create tailored software solutions, from embedded systems to full-stack web applications."
    },
    {
      title: "Engineering & Diploma Projects",
      description: "Get expert guidance and support for your academic projects. We offer assistance with project planning, component selection, and implementation for a wide range of engineering disciplines."
    },
    {
      title: "Startup Solutions",
      description: "From product design to MVP development, we provide comprehensive support for tech startups. Let us help you bring your innovative ideas to market quickly and efficiently."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <p className="mb-8">At TechnoMart, we offer a wide range of services to support your projects, from concept to completion. Whether you're a hobbyist, student, or professional, our expert team is here to help you succeed.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} description={service.description} />
        ))}
      </div>
    </div>
  );
};

export default Services;