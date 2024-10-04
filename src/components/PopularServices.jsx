import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  { name: "3D Printing", icon: "🖨️" },
  { name: "PCB Design", icon: "🔌" },
  { name: "Laser Cutting", icon: "✂️" },
  { name: "Custom Projects", icon: "🛠️" },
];

const PopularServices = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Popular Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl text-center mb-2">{service.icon}</div>
              <CardTitle className="text-center">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PopularServices;