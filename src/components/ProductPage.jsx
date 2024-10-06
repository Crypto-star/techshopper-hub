import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useProduct } from '../integrations/supabase/hooks/useProducts';

const ProductPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(productId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Product added to cart');
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Categories:</h3>
            <p className="text-gray-700">{product.categories}</p>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <Truck className="h-6 w-6 text-green-500" />
            <span className="text-green-500 font-semibold">Free Shipping</span>
            <ShieldCheck className="h-6 w-6 text-blue-500" />
            <span className="text-blue-500 font-semibold">2-Year Warranty</span>
          </div>
          <div className="flex space-x-4 mb-6">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAddToCart}>Add to Cart</Button>
            <Button className="flex-1" variant="secondary" onClick={handleBuyNow}>Buy Now</Button>
          </div>
          <p className="text-gray-600">
            <span className="font-semibold">Availability:</span> {product.sku > 0 ? `In stock (${product.sku} units)` : 'Out of stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;