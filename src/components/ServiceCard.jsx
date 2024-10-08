import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServiceCard = ({ service }) => (
  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
        <span className="text-3xl">{service.icon}</span>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col justify-between h-full pt-4">
      <p className="text-gray-700 dark:text-gray-300 mb-4">{service.description}</p>
      <Button className="w-full mt-auto">Learn More</Button>
    </CardContent>
  </Card>
);

export default ServiceCard;