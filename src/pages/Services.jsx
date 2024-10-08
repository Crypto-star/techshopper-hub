import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useServices } from '../integrations/supabase/hooks/useServices';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';
import { X } from 'lucide-react';

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

const CustomServiceForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: JSON.stringify({ name, email, description }),
      });

      if (error) throw error;

      toast.success('Your custom service request has been submitted!');
      onClose();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Textarea
        placeholder="Describe your custom service request"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
      </Button>
    </form>
  );
};

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
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} title={service.name} description={service.description} icon={service.icon} />
        ))}
      </div>

      {showCustomForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md relative">
            <Button
              className="absolute top-2 right-2 p-1"
              variant="ghost"
              onClick={() => setShowCustomForm(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle>Request a Custom Service</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomServiceForm onClose={() => setShowCustomForm(false)} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Services;
