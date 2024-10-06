import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../integrations/supabase/hooks/useProducts';

const ProductList = ({ items, searchTerm }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item && typeof item === 'object' && item.name &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  if (filteredItems.length === 0) return null;

  return (
    <Card className="mb-8 card-hover">
      <CardContent>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <li key={item.id} className="flex items-center space-x-2">
              <img src={item.image_url || '/placeholder.svg'} alt={item.name} className="w-10 h-10 object-cover rounded" />
              <Link to={`/products/${item.id}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                {item.name} - ${item.price.toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products, isLoading, isError } = useProducts();

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.categories && product.categories.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="page-container">
      <h1 className="section-title">Our Products</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Discover our wide range of electronic components, DIY kits, STEM toys, and educational resources. Whether you're a beginner or an expert, we have everything you need to bring your ideas to life!</p>
      
      <div className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products or categories..."
            className="pl-10 pr-4 py-2 rounded-full w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <ProductList items={filteredProducts} searchTerm={searchTerm} />

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-8">No products found matching your search.</p>
      )}

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link to="/products" className="inline-flex items-center">
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Products;