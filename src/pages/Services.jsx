import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServices } from '../integrations/supabase/hooks/useServices';

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
  const { data: services, isLoading, isError } = useServices();

  if (isLoading) return <div className="text-center py-8">Loading services...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error fetching services. Please try again later.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-600 dark:text-blue-400">Our Services</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        At TechnoMart, we offer a wide range of services to support your projects, from concept to completion. 
        Whether you're a hobbyist, student, or professional, our expert team is here to help you succeed.
      </p>
      
      {services && services.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} title={service.name} description={service.description} icon={service.icon} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-8">No services available at the moment.</p>
      )}

      <div className="mt-16 text-center">
        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
          Request a Custom Service
        </Button>
      </div>
    </div>
  );
};

export default Services;