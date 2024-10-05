import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Wrench, Briefcase, BookOpen, Users, Mail, LogIn, Menu, X, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { cart } = useCart();

  const navItems = [
    { name: 'Products', path: '/products', icon: <ShoppingCart className="w-4 h-4" /> },
    { name: 'Services', path: '/services', icon: <Wrench className="w-4 h-4" /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Users className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
    { name: 'Sign In', path: '/signin', icon: <LogIn className="w-4 h-4" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  }, [searchTerm, navigate]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">TechnoMart</Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search entire site..."
                className="pl-10 pr-4 py-2 w-64 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 rounded-full">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Search entire site..."
                className="pl-10 pr-4 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 rounded-full">
                <Search className="w-4 h-4" />
              </Button>
            </form>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={toggleMenu}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={toggleMenu}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cartItemCount})</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;