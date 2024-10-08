import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServices } from '../integrations/supabase/hooks/useServices';
import CustomServiceModal from '../components/CustomServiceModal';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const { data: services, isLoading, isError } = useServices();
  const [showCustomForm, setShowCustomForm] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching services</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-600 dark:text-blue-400">Our Services</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        At TechnoMart, we offer a wide range of services to support your projects, from concept to completion. 
        Whether you're a hobbyist, student, or professional, our expert team is here to help you succeed.
      </p>
      
      <div className="text-center mb-8">
        <Button onClick={() => setShowCustomForm(true)}>
          Request a Custom Service
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {showCustomForm && (
        <CustomServiceModal onClose={() => setShowCustomForm(false)} />
      )}
    </div>
  );
};

export default Services;