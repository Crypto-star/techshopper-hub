import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TechnoMart</h3>
            <p className="text-sm">Your one-stop shop for electronic components, STEM toys, and engineering projects.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-blue-300">Products</Link></li>
              <li><Link to="/services" className="hover:text-blue-300">Services</Link></li>
              <li><Link to="/projects" className="hover:text-blue-300">Projects</Link></li>
              <li><Link to="/resources" className="hover:text-blue-300">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">123 Tech Street, Silicon Valley, CA 94000</p>
            <p className="text-sm">Email: info@technomart.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 TechnoMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;