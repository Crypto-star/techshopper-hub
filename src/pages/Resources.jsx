import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ResourceCard = ({ title, description, link }) => (
  <Card className="h-full card-hover">
    <CardHeader className="bg-gray-50 dark:bg-gray-800">
      <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col justify-between h-full">
      <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
      <Button asChild className="w-full mt-4">
        <a href={link} target="_blank" rel="noopener noreferrer">Learn More</a>
      </Button>
    </CardContent>
  </Card>
);

const Resources = () => {
  const resources = [
    {
      title: "Getting Started with Arduino",
      description: "A comprehensive guide for beginners to start their journey with Arduino. Includes basic concepts, setup instructions, and simple projects.",
      link: "#"
    },
    {
      title: "Introduction to IoT",
      description: "Learn about the Internet of Things (IoT) and how it's shaping our world. This guide covers key concepts, technologies, and practical applications.",
      link: "#"
    },
    {
      title: "PCB Design Best Practices",
      description: "Master the art of PCB design with our in-depth guide. Covers layout techniques, component selection, and common pitfalls to avoid.",
      link: "#"
    },
    {
      title: "Robotics for Beginners",
      description: "Start your robotics journey with this beginner-friendly guide. Learn about robot components, programming basics, and build your first robot.",
      link: "#"
    },
    {
      title: "3D Printing Fundamentals",
      description: "Discover the world of 3D printing. This guide covers different printing technologies, material selection, and tips for successful prints.",
      link: "#"
    },
    {
      title: "STEM Education Resources",
      description: "A collection of resources for educators to incorporate STEM concepts into their curriculum. Includes lesson plans, project ideas, and teaching tips.",
      link: "#"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="section-title">Resources</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Explore our collection of educational resources, guides, and tutorials. Whether you're a beginner or an expert, these materials will help you expand your knowledge and skills in electronics, programming, and engineering.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            description={resource.description}
            link={resource.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Resources;