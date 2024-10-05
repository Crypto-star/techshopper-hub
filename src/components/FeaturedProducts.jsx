import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  { id: "arduino-uno", name: "Arduino Uno", price: "$24.95", image: "/placeholder.svg" },
  { id: "raspberry-pi-4", name: "Raspberry Pi 4", price: "$35.00", image: "/placeholder.svg" },
  { id: "esp32-dev-board", name: "ESP32 Dev Board", price: "$10.99", image: "/placeholder.svg" },
  { id: "sensor-kit", name: "Sensor Kit", price: "$49.99", image: "/placeholder.svg" },
];

const FeaturedProducts = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {featuredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <Link to={`/products/${product.id}`}>
              <CardHeader>
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <p className="text-blue-600 font-bold mb-2">{product.price}</p>
                <Button className="w-full">View Product</Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;