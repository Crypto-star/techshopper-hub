import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

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
    image: "/placeholder.svg"
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
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside mb-4">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
            <div className="flex space-x-4">
              <Button className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
              <Button className="flex-1" variant="secondary" onClick={handleBuyNow}>Buy Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
