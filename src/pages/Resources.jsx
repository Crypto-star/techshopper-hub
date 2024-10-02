import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { Button } from "@/components/ui/button";

const ResourceCard = ({ title, description, link }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-4">{description}</p>
      <Button asChild>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Resources</h1>
      <p className="mb-8">Explore our collection of educational resources, guides, and tutorials. Whether you're a beginner or an expert, these materials will help you expand your knowledge and skills in electronics, programming, and engineering.</p>
      
      <Grid className="gap-6">
        {resources.map((resource, index) => (
          <ResourceCard key={index} title={resource.title} description={resource.description} link={resource.link} />
        ))}
      </Grid>
    </div>
  );
};

export default Resources;