import React, { useState } from 'react';
import AdminProductForm from '../components/AdminProductForm';
import AdminProductList from '../components/AdminProductList';
import { Button } from "@/components/ui/button";

const AdminProducts = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin: Manage Products</h1>
      <div className="mb-6">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Add New Product'}
        </Button>
      </div>
      {showForm && <AdminProductForm />}
      <AdminProductList />
    </div>
  );
};

export default AdminProducts;