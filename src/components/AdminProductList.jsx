import React from 'react';
import { useProducts, useDeleteProduct } from '../integrations/supabase/hooks/useProducts';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const AdminProductList = () => {
  const { data: products, isLoading, isError } = useProducts();
  const deleteProduct = useDeleteProduct();

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error loading products</div>;

  const handleDelete = async (id) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <span>{product.name} - ${product.price} (SKU: {product.sku})</span>
            <Button variant="destructive" onClick={() => handleDelete(product.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductList;