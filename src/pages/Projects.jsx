import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectCard = ({ title, description, outcome }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-4">{description}</p>
      <p className="font-semibold">Outcome: {outcome}</p>
    </CardContent>
  </Card>
);

const Projects = () => {
  const projects = [
    {
      title: "Smart Agriculture Monitoring System",
      description: "Developed an IoT-based system for a local farm to monitor soil moisture, temperature, and sunlight levels. The system used Arduino boards with various sensors and a custom web interface for data visualization.",
      outcome: "Increased crop yield by 20% and reduced water usage by 30%."
    },
    {
      title: "Automated Pill Dispenser for Elderly Care",
      description: "Created a prototype for an automated pill dispenser using Raspberry Pi and 3D printed components. The device includes a user-friendly interface and sends reminders to caregivers.",
      outcome: "Improved medication adherence by 40% in a pilot study with 50 elderly patients."
    },
    {
      title: "Educational Robotics Kit for Schools",
      description: "Designed and manufactured a cost-effective robotics kit for high school students. The kit includes custom PCBs, 3D printed parts, and a comprehensive curriculum covering electronics and programming basics.",
      outcome: "Adopted by 50+ schools, reaching over 5000 students in the first year."
    },
    {
      title: "Energy-Efficient Smart Home System",
      description: "Developed a complete smart home solution using ESP32 microcontrollers and custom-designed PCBs. The system integrates lighting control, climate management, and energy monitoring with a mobile app interface.",
      outcome: "Reduced energy consumption by 25% in test homes and won a local innovation award."
    },
    {
      title: "Wearable Air Quality Monitor",
      description: "Created a compact, wearable device for real-time air quality monitoring. The project involved custom PCB design, 3D printed enclosure, and development of a companion mobile app for data logging and alerts.",
      outcome: "Successfully crowdfunded and shipped 1000 units to backers."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Projects & Case Studies</h1>
      <p className="mb-8">Explore our successful projects and collaborations. These case studies showcase how we've helped our clients and partners bring their ideas to life, solve complex problems, and achieve impressive results.</p>
      
      {projects.map((project, index) => (
        <ProjectCard key={index} title={project.title} description={project.description} outcome={project.outcome} />
      ))}
    </div>
  );
};

export default Projects;