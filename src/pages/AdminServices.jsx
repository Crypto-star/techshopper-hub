import React, { useState } from 'react';
import AdminServiceForm from '../components/AdminServiceForm';
import AdminServiceList from '../components/AdminServiceList';
import { Button } from "@/components/ui/button";

const AdminServices = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin: Manage Services</h1>
      <div className="mb-6">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Add New Service'}
        </Button>
      </div>
      {showForm && <AdminServiceForm />}
      <AdminServiceList />
    </div>
  );
};

export default AdminServices;