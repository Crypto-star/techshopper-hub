import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

const reviews = [
  { name: "John Doe", rating: 5, comment: "Great products and fast shipping!" },
  { name: "Jane Smith", rating: 4, comment: "Good selection of components." },
  { name: "Mike Johnson", rating: 5, comment: "Excellent customer service!" },
];

const GoogleReviews = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Google Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="mb-2">{review.comment}</p>
              <p className="font-bold">{review.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default GoogleReviews;