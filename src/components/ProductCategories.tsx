import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  imageurl: string;
  category: string;
}

const ProductCategories = () => {
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'Gelio sistema ir geliniai dažai',
    'Teri dulkių surinkėjai ir priedai'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products first
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;

        // Filter and group products by category
        const groupedProducts = categories.reduce((acc, category) => {
          const categoryProducts = data.filter(product => 
            (product.category || '').toLowerCase() === category.toLowerCase()
          );
          acc[category] = categoryProducts;
          return acc;
        }, {} as Record<string, Product[]>);

        setProducts(groupedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="animate-pulse space-y-8">
            {categories.map((category, index) => (
              <div key={index} className="space-y-4">
                <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="container-custom">
          <p className="text-red-500">Error loading products: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="space-y-16">
          {categories.map((category) => {
            const categoryProducts = products[category] || [];
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl md:text-3xl font-serif">{category}</h2>
                  <Link
                    to={`/collections?category=${encodeURIComponent(category)}`}
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    Peržiūrėti visus →
                  </Link>
                </div>

                {categoryProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProducts.slice(0, 3).map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        imageSrc={product.imageurl}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        category={product.category}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-text-secondary">No products found in this category.</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;