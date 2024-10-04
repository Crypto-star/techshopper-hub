import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ResourceCard = ({ title, description, link, type }) => (
  <Card className="h-full card-hover">
    <CardHeader className="bg-gray-50 dark:bg-gray-800">
      <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col justify-between h-full">
      <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">{type}</span>
        <Button asChild variant="outline">
          <a href={link} target="_blank" rel="noopener noreferrer">Learn More</a>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Resources = () => {
  const resources = [
    {
      title: "Getting Started with Arduino",
      description: "A comprehensive guide for beginners to start their journey with Arduino. Includes basic concepts, setup instructions, and simple projects.",
      link: "#",
      type: "Guide"
    },
    {
      title: "Introduction to IoT",
      description: "Learn about the Internet of Things (IoT) and how it's shaping our world. This guide covers key concepts, technologies, and practical applications.",
      link: "#",
      type: "Course"
    },
    {
      title: "PCB Design Best Practices",
      description: "Master the art of PCB design with our in-depth guide. Covers layout techniques, component selection, and common pitfalls to avoid.",
      link: "#",
      type: "Tutorial"
    },
    {
      title: "Robotics for Beginners",
      description: "Start your robotics journey with this beginner-friendly guide. Learn about robot components, programming basics, and build your first robot.",
      link: "#",
      type: "Workshop"
    },
    {
      title: "3D Printing Fundamentals",
      description: "Discover the world of 3D printing. This guide covers different printing technologies, material selection, and tips for successful prints.",
      link: "#",
      type: "Guide"
    },
    {
      title: "STEM Education Resources",
      description: "A collection of resources for educators to incorporate STEM concepts into their curriculum. Includes lesson plans, project ideas, and teaching tips.",
      link: "#",
      type: "Toolkit"
    },
    {
      title: "Machine Learning with Raspberry Pi",
      description: "Explore the possibilities of machine learning on the Raspberry Pi. This course covers the basics of ML and practical projects you can build.",
      link: "#",
      type: "Course"
    },
    {
      title: "Electronics Troubleshooting",
      description: "Learn how to diagnose and fix common issues in electronic circuits. This guide will help you become a more confident maker and repairer.",
      link: "#",
      type: "Tutorial"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="section-title">Resources</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Explore our collection of educational resources, guides, and tutorials. Whether you're a beginner or an expert, these materials will help you expand your knowledge and skills in electronics, programming, and engineering.</p>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="guides">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.filter(r => r.type === "Guide").map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.filter(r => r.type === "Course").map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tutorials">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.filter(r => r.type === "Tutorial").map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          Suggest a Resource
        </Button>
      </div>
    </div>
  );
};

export default Resources;