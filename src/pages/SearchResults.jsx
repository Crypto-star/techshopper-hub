import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    if (query) {
      setIsLoading(true);
      // Simulating an API call to search across the app
      setTimeout(() => {
        const mockResults = [
          { title: 'Arduino Starter Kit', description: 'Perfect for beginners', type: 'Product', link: '/products' },
          { title: '3D Printing Services', description: 'High-quality 3D printing', type: 'Service', link: '/services' },
          { title: 'Smart Home Project', description: 'IoT-based home automation', type: 'Project', link: '/projects' },
          { title: 'Getting Started with Arduino', description: 'Beginner\'s guide', type: 'Resource', link: '/resources' },
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(mockResults);
        setIsLoading(false);
      }, 500);
    }
  }, [location.search]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      {results.length === 0 ? (
        <p>No results found. Try a different search term.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{result.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                <p className="text-xs text-blue-600 mb-4">Type: {result.type}</p>
                <Link 
                  to={result.link} 
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;