import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

const ProductPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = {
    id: productId,
    name: "Arduino Uno Rev3",
    price: 24.95,
    description: "The Arduino Uno Rev3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins (of which 6 can be used as PWM outputs), 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button.",
    features: [
      "ATmega328P microcontroller",
      "Input voltage - 7-12V",
      "14 Digital I/O Pins (6 PWM outputs)",
      "6 Analog Inputs",
      "32k Flash Memory",
      "16Mhz Clock Speed"
    ],
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 120,
    stock: 50
  };

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
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current'}`} />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
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
            <span className="font-semibold">Availability:</span> {product.stock > 0 ? `In stock (${product.stock} units)` : 'Out of stock'}
          </p>
        </div>
      </div>
      <Card className="mt-12">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <p className="text-gray-700">
            The Arduino Uno is a versatile microcontroller board that's perfect for beginners and experienced makers alike. 
            Based on the ATmega328P, it provides a robust platform for creating interactive electronic projects. 
            With its user-friendly design and extensive documentation, the Arduino Uno is an excellent choice for learning 
            about electronics, programming, and prototyping your ideas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;