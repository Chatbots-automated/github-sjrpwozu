import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

const Collections = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-accent/10 to-background py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-8">
              <Sparkles className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium">Profesionali kosmetika</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Mūsų Kolekcija</h1>
            <p className="text-text-secondary max-w-2xl mx-auto mb-8">
              Kokybė, kuria pasitiki grožio meistrai. Visa, ko reikia Jūsų manikiūro ir pedikiūro darbui - kokybė, kuria galite pasitikėti kasdien.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="py-16">
        <div className="container-custom">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default Collections;