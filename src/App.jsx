import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { SupabaseAuthProvider } from './integrations/supabase/auth';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TechnoMart from "./pages/TechnoMart";
import Products from "./pages/Products";
import ProductPage from "./components/ProductPage";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import VerifyOTP from "./pages/VerifyOTP";
import Profile from "./pages/Profile";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import AdminProducts from "./pages/AdminProducts";
import AdminServices from "./pages/AdminServices";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SupabaseAuthProvider>
          <CartProvider>
            <BrowserRouter>
              <TooltipProvider>
                <Toaster />
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<TechnoMart />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:productId" element={<ProductPage />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/verify-otp" element={<VerifyOTP />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/admin/products" element={<AdminProducts />} />
                      <Route path="/admin/services" element={<AdminServices />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </TooltipProvider>
            </BrowserRouter>
          </CartProvider>
        </SupabaseAuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;