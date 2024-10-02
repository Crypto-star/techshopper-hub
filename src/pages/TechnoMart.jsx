import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import TestimonialSlider from '../components/TestimonialSlider';
import FeaturedProductSlider from '../components/FeaturedProductSlider';
import ProjectSlider from '../components/ProjectSlider';

const TechnoMart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to TechnoMart</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">Your one-stop shop for electronic components, cutting-edge gadgets, STEM toys, and hands-on engineering projects.</p>
        <Button asChild className="w-full md:w-auto">
          <Link to="/products">Explore Products</Link>
        </Button>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Featured Products</h2>
        <FeaturedProductSlider />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Latest Projects</h2>
        <ProjectSlider />
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Customer Testimonials</h2>
        <TestimonialSlider />
      </section>
    </div>
  );
};

export default TechnoMart;