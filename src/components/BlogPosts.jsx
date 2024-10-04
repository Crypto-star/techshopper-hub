import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const posts = [
  { title: "Getting Started with Arduino", image: "/placeholder.svg" },
  { title: "Introduction to IoT", image: "/placeholder.svg" },
  { title: "3D Printing Basics", image: "/placeholder.svg" },
  { title: "Robotics for Beginners", image: "/placeholder.svg" },
];

const BlogPosts = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
              <Button variant="outline" className="w-full">Read More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogPosts;