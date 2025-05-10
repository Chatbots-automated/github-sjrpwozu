import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Facebook, Instagram } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import TrackingButton from './TrackingButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, items } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-soft py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/beautybyellalogo.jpg" 
              alt="Beauty by Ella Logo" 
              className="h-12 w-auto rounded-full"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">Pagrindinis</Link>
            <Link to="/collections" className="text-sm font-medium hover:text-accent transition-colors">Kolekcijos</Link>
            <Link to="/about" className="text-sm font-medium hover:text-accent transition-colors">Apie mus</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-accent transition-colors">Kontaktai</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com/profile.php?id=100083485518751"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/beautybyella.lt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <TrackingButton />
            <button
              onClick={toggleCart}
              className="relative p-2 hover:text-accent transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              className="md:hidden text-text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              <Link to="/" className="block text-sm font-medium py-2 hover:text-accent transition-colors">Pagrindinis</Link>
              <Link to="/collections" className="block text-sm font-medium py-2 hover:text-accent transition-colors">Kolekcijos</Link>
              <Link to="/about" className="block text-sm font-medium py-2 hover:text-accent transition-colors">Apie mus</Link>
              <Link to="/contact" className="block text-sm font-medium py-2 hover:text-accent transition-colors">Kontaktai</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;