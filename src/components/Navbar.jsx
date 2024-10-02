import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Wrench, Briefcase, BookOpen, Users, Mail, LogIn } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Products', path: '/products', icon: <ShoppingCart className="w-4 h-4" /> },
    { name: 'Services', path: '/services', icon: <Wrench className="w-4 h-4" /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Users className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
    { name: 'Sign In', path: '/auth', icon: <LogIn className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">TechnoMart</Link>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;