import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: 'Development Boards', icon: '🖥️' },
  { name: 'Sensors', icon: '🔍' },
  { name: 'Robotics', icon: '🤖' },
  { name: 'IoT', icon: '📡' },
  { name: '3D Printing', icon: '🖨️' },
  { name: 'Tools', icon: '🔧' },
  { name: 'Components', icon: '🔌' },
  { name: 'Kits', icon: '📦' },
];

const CategoryGrid = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Product Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Link to={`/category/${category.name.toLowerCase().replace(' ', '-')}`} key={index}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <span className="text-4xl mb-2">{category.icon}</span>
                <h3 className="text-center">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;