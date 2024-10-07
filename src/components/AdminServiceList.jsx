import React from 'react';
import { useServices, useDeleteService } from '../integrations/supabase/hooks/useServices';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const AdminServiceList = () => {
  const { data: services, isLoading, isError } = useServices();
  const deleteService = useDeleteService();

  if (isLoading) return <div>Loading services...</div>;
  if (isError) return <div>Error loading services</div>;

  const handleDelete = async (id) => {
    try {
      await deleteService.mutateAsync(id);
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Service List</h2>
      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <div>
              <span className="font-semibold">{service.name}</span>
              <span className="ml-2 text-gray-500">({service.category})</span>
              <span className="ml-2">${service.price}</span>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(service.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminServiceList;