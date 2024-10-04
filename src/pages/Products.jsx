import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductCategory = ({ title, items }) => (
  <Card className="mb-8 card-hover">
    <CardHeader className="bg-gray-50 dark:bg-gray-800">
      <CardTitle className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-5 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const Products = () => {
  const categories = [
    {
      title: "Electronics Items",
      items: [
        "Arduino Uno Rev3 - The perfect board for your next project",
        "Raspberry Pi 4 Model B - Powerful single-board computer",
        "DHT22 Temperature and Humidity Sensor - Accurate and reliable",
        "HC-SR04 Ultrasonic Sensor - For distance measurement projects",
        "LM2596 DC-DC Buck Converter - Efficient power supply solution"
      ]
    },
    {
      title: "DIY Kits",
      items: [
        "Smart Home Automation Kit - Control your home with ease",
        "Arduino-based Robot Car Kit - Build your own programmable robot",
        "IoT Weather Station Kit - Monitor local weather conditions",
        "Solar Power Charging Kit - Harness renewable energy",
        "Electronic Piano Kit - Create your own musical instrument"
      ]
    },
    {
      title: "STEM Kits & Toys",
      items: [
        "Snap Circuits Pro SC-500 - Learn electronics through fun projects",
        "Sphero BOLT - Programmable robotic ball for coding adventures",
        "Makeblock mBot - STEM educational robot kit",
        "Ozobot Bit Coding Robot - Tiny but mighty coding companion",
        "LEGO Mindstorms Robot Inventor - Build and program advanced robots"
      ]
    },
    {
      title: "Prototyping Tools",
      items: [
        "Solderless Breadboard 830 Point - Perfect for circuit prototyping",
        "Jumper Wire Kit - 120pcs Multicolored",
        "Hakko FX888D-23BY Digital Soldering Station",
        "Fluke 117 Electricians True RMS Multimeter",
        "ELEGOO 3D Printer Filament PLA 1.75mm"
      ]
    },
    {
      title: "Educational Resources",
      items: [
        "Arduino Programming Fundamentals - Comprehensive e-book",
        "Introduction to IoT - Online video course",
        "PCB Design Mastery - Step-by-step tutorial series",
        "Robotics for Beginners - Interactive learning platform",
        "Advanced Sensor Applications - Downloadable project guide"
      ]
    }
  ];

  return (
    <div className="page-container">
      <h1 className="section-title">Our Products</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Discover our wide range of electronic components, DIY kits, STEM toys, and educational resources. Whether you're a beginner or an expert, we have everything you need to bring your ideas to life!</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <ProductCategory key={index} title={category.title} items={category.items} />
        ))}
      </div>
    </div>
  );
};

export default Products;