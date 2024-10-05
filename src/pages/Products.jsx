import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ProductCategory = ({ title, items, searchTerm }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item && typeof item === 'object' && item.name &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Link to={`/products/${item.id}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                {item.name}
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
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

  const categories = [
    {
      title: "Electronics Items",
      items: [
        { id: "arduino-uno", name: "Arduino Uno Rev3 - The perfect board for your next project" },
        { id: "raspberry-pi-4", name: "Raspberry Pi 4 Model B - Powerful single-board computer" },
        { id: "dht22-sensor", name: "DHT22 Temperature and Humidity Sensor - Accurate and reliable" },
        { id: "hc-sr04-sensor", name: "HC-SR04 Ultrasonic Sensor - For distance measurement projects" },
        { id: "lm2596-converter", name: "LM2596 DC-DC Buck Converter - Efficient power supply solution" },
        { id: "nodemcu-esp8266", name: "NodeMCU ESP8266 - WiFi-enabled development board" }
      ]
    },
    {
      title: "DIY Kits",
      items: [
        { id: "smart-home-kit", name: "Smart Home Automation Kit - Control your home with ease" },
        { id: "robot-car-kit", name: "Arduino-based Robot Car Kit - Build your own programmable robot" },
        { id: "weather-station-kit", name: "IoT Weather Station Kit - Monitor local weather conditions" },
        { id: "solar-charging-kit", name: "Solar Power Charging Kit - Harness renewable energy" },
        { id: "electronic-piano-kit", name: "Electronic Piano Kit - Create your own musical instrument" },
        { id: "hydroponic-kit", name: "Hydroponic Garden System Kit - Grow plants without soil" }
      ]
    },
    {
      title: "STEM Kits & Toys",
      items: [
        { id: "snap-circuits", name: "Snap Circuits Pro SC-500 - Learn electronics through fun projects" },
        { id: "sphero-bolt", name: "Sphero BOLT - Programmable robotic ball for coding adventures" },
        { id: "makeblock-mbot", name: "Makeblock mBot - STEM educational robot kit" },
        { id: "ozobot-bit", name: "Ozobot Bit Coding Robot - Tiny but mighty coding companion" },
        { id: "lego-mindstorms", name: "LEGO Mindstorms Robot Inventor - Build and program advanced robots" },
        { id: "microbit-go", name: "Micro:bit Go Bundle - Pocket-sized computer for learning coding" }
      ]
    },
    {
      title: "Prototyping Tools",
      items: [
        { id: "solderless-breadboard", name: "Solderless Breadboard 830 Point - Perfect for circuit prototyping" },
        { id: "jumper-wire-kit", name: "Jumper Wire Kit - 120pcs Multicolored" },
        { id: "hakko-soldering-station", name: "Hakko FX888D-23BY Digital Soldering Station" },
        { id: "fluke-multimeter", name: "Fluke 117 Electricians True RMS Multimeter" },
        { id: "elegoo-3d-printer-filament", name: "ELEGOO 3D Printer Filament PLA 1.75mm" },
        { id: "pcb-prototype-board", name: "PCB Prototype Board Kit - Various sizes for different projects" }
      ]
    },
    {
      title: "Educational Resources",
      items: [
        { id: "arduino-fundamentals", name: "Arduino Programming Fundamentals - Comprehensive e-book" },
        { id: "iot-introduction", name: "Introduction to IoT - Online video course" },
        { id: "pcb-design-mastery", name: "PCB Design Mastery - Step-by-step tutorial series" },
        { id: "robotics-beginners", name: "Robotics for Beginners - Interactive learning platform" },
        { id: "advanced-sensor-applications", name: "Advanced Sensor Applications - Downloadable project guide" },
        { id: "machine-learning-raspberry-pi", name: "Machine Learning with Raspberry Pi - Hands-on course" }
      ]
    }
  ];

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredCategories = useMemo(() => {
    if (searchTerm === '') return categories;
    return categories.filter(category => 
      category.items.some(item => 
        item && typeof item === 'object' && item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
