import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import CategoryGrid from '../components/CategoryGrid';
import FeaturedProducts from '../components/FeaturedProducts';
import GoogleReviews from '../components/GoogleReviews';
import PopularServices from '../components/PopularServices';
import FeaturedBrands from '../components/FeaturedBrands';
import BlogPosts from '../components/BlogPosts';

const TechnoMart = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to TechnoMart</h1>
              <p className="text-xl md:text-2xl mb-8">Your one-stop shop for electronic components and gadgets</p>
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
          </section>

          <CategoryGrid />
          <FeaturedProducts />
          <GoogleReviews />
          <PopularServices />
          <FeaturedBrands />
          <BlogPosts />
        </div>
      </main>
    </div>
  );
};

export default TechnoMart;