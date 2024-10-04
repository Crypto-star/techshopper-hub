import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCategory = ({ title, items, searchTerm }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  if (filteredItems.length === 0) return null;

  return (
    <Card className="mb-8 card-hover">
      <CardHeader className="bg-gray-50 dark:bg-gray-800">
        <CardTitle className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-blue-500">•</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      title: "Electronics Items",
      items: [
        "Arduino Uno Rev3 - The perfect board for your next project",
        "Raspberry Pi 4 Model B - Powerful single-board computer",
        "DHT22 Temperature and Humidity Sensor - Accurate and reliable",
        "HC-SR04 Ultrasonic Sensor - For distance measurement projects",
        "LM2596 DC-DC Buck Converter - Efficient power supply solution",
        "NodeMCU ESP8266 - WiFi-enabled development board"
      ]
    },
    {
      title: "DIY Kits",
      items: [
        "Smart Home Automation Kit - Control your home with ease",
        "Arduino-based Robot Car Kit - Build your own programmable robot",
        "IoT Weather Station Kit - Monitor local weather conditions",
        "Solar Power Charging Kit - Harness renewable energy",
        "Electronic Piano Kit - Create your own musical instrument",
        "Hydroponic Garden System Kit - Grow plants without soil"
      ]
    },
    {
      title: "STEM Kits & Toys",
      items: [
        "Snap Circuits Pro SC-500 - Learn electronics through fun projects",
        "Sphero BOLT - Programmable robotic ball for coding adventures",
        "Makeblock mBot - STEM educational robot kit",
        "Ozobot Bit Coding Robot - Tiny but mighty coding companion",
        "LEGO Mindstorms Robot Inventor - Build and program advanced robots",
        "Micro:bit Go Bundle - Pocket-sized computer for learning coding"
      ]
    },
    {
      title: "Prototyping Tools",
      items: [
        "Solderless Breadboard 830 Point - Perfect for circuit prototyping",
        "Jumper Wire Kit - 120pcs Multicolored",
        "Hakko FX888D-23BY Digital Soldering Station",
        "Fluke 117 Electricians True RMS Multimeter",
        "ELEGOO 3D Printer Filament PLA 1.75mm",
        "PCB Prototype Board Kit - Various sizes for different projects"
      ]
    },
    {
      title: "Educational Resources",
      items: [
        "Arduino Programming Fundamentals - Comprehensive e-book",
        "Introduction to IoT - Online video course",
        "PCB Design Mastery - Step-by-step tutorial series",
        "Robotics for Beginners - Interactive learning platform",
        "Advanced Sensor Applications - Downloadable project guide",
        "Machine Learning with Raspberry Pi - Hands-on course"
      ]
    }
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = useMemo(() => {
    if (searchTerm === '') return categories;
    return categories.filter(category => 
      category.items.some(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [categories, searchTerm]);

  return (
    <div className="page-container">
      <h1 className="section-title">Our Products</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Discover our wide range of electronic components, DIY kits, STEM toys, and educational resources. Whether you're a beginner or an expert, we have everything you need to bring your ideas to life!</p>
      
      <div className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 rounded-full w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category, index) => (
          <ProductCategory key={index} title={category.title} items={category.items} searchTerm={searchTerm} />
        ))}
      </div>

      {filteredCategories.length === 0 && (
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