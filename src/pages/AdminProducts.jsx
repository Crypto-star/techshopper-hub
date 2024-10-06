import React from 'react';
import AdminProductForm from '../components/AdminProductForm';

const AdminProducts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin: Add New Product</h1>
      <AdminProductForm />
    </div>
  );
};

export default AdminProducts;