import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturedProduct = ({ name, description, image }) => (
  <Card className="h-full">
    <CardHeader>
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button asChild>
        <Link to="/products">Learn More</Link>
      </Button>
    </CardContent>
  </Card>
);

const Testimonial = ({ name, content }) => (
  <Card className="h-full">
    <CardContent>
      <p className="italic mb-2">"{content}"</p>
      <p className="font-semibold">- {name}</p>
    </CardContent>
  </Card>
);

const Home = () => {
  const featuredProducts = [
    { name: "Arduino Starter Kit", description: "Perfect for beginners to learn electronics and programming.", image: "/placeholder.svg" },
    { name: "Raspberry Pi 4", description: "Powerful single-board computer for various projects.", image: "/placeholder.svg" },
    { name: "STEM Robot Kit", description: "Build and program your own robot with this educational kit.", image: "/placeholder.svg" },
  ];

  const testimonials = [
    { name: "John Doe", content: "TechnoMart has everything I need for my electronics projects. Great quality and fast shipping!" },
    { name: "Jane Smith", content: "The STEM kits from TechnoMart have been a game-changer in my classroom. My students love them!" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to TechnoMart</h1>
        <p className="text-xl text-gray-600 mb-8">Your one-stop shop for electronic components, cutting-edge gadgets, STEM toys, and hands-on engineering projects.</p>
        <Button asChild>
          <Link to="/products">Explore Products</Link>
        </Button>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <FeaturedProduct key={index} {...product} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Latest Projects</h2>
        <Card>
          <CardHeader>
            <CardTitle>Smart Home Automation System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Learn how to build a complete smart home system using our components and step-by-step guide.</p>
            <Button asChild>
              <Link to="/projects">View Project Details</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;