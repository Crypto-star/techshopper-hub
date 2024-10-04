import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import TestimonialSlider from '../components/TestimonialSlider';
import FeaturedProductSlider from '../components/FeaturedProductSlider';
import ProjectSlider from '../components/ProjectSlider';

const TechnoMart = () => {
  return (
    <div className="page-container">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">Welcome to TechnoMart</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Your one-stop shop for electronic components, cutting-edge gadgets, STEM toys, and hands-on engineering projects.</p>
        <Button asChild size="lg" className="gradient-bg text-white">
          <Link to="/products">Explore Products</Link>
        </Button>
      </section>

      <section className="mb-12">
        <h2 className="section-title">Featured Products</h2>
        <FeaturedProductSlider />
      </section>

      <section className="mb-12">
        <h2 className="section-title">Latest Projects</h2>
        <ProjectSlider />
      </section>

      <section>
        <h2 className="section-title">Customer Testimonials</h2>
        <TestimonialSlider />
      </section>
    </div>
  );
};

export default TechnoMart;