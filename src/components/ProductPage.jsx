import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductPage = () => {
  const { productId } = useParams();

  // This is a mock product data. In a real application, you would fetch this data based on the productId.
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
            <Button className="w-full md:w-auto">Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;