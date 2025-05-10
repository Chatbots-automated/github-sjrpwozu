import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingCart, ChevronRight, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../store/cartStore';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  imageurl: string;
  category: string;
  stock: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, items } = useCartStore();

  // Calculate remaining stock considering items in cart
  const cartItemQuantity = items.find(item => item.id === id)?.quantity || 0;
  const remainingStock = product ? product.stock - cartItemQuantity : 0;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);
      // Ensure quantity doesn't exceed available stock
      setQuantity(Math.min(1, data.stock));
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product && product.price !== null && remainingStock >= quantity) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        imageurl: product.imageurl,
      });
      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="py-32 bg-background">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="h-8 bg-gray-200 w-1/2 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-32 bg-background">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-serif mb-4">Produktas nerastas</h2>
          <p className="text-text-secondary mb-8">{error}</p>
          <Link to="/collections" className="btn-primary">
            Grįžti į kolekciją
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-32 bg-background">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 mb-8 text-sm">
          <Link to="/" className="text-text-secondary hover:text-accent">
            Pagrindinis
          </Link>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
          <Link to="/collections" className="text-text-secondary hover:text-accent">
            Kolekcija
          </Link>
          <ChevronRight className="w-4 h-4 text-text-secondary" />
          <span className="text-text-primary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
              <img
                src={product.imageurl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-32">
              <span className="text-accent uppercase tracking-wider text-sm font-medium mb-2 inline-block">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-text-secondary">86 atsiliepimai</span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-serif">
                  {product.price ? `€${product.price.toFixed(2)}` : 'Kaina nenurodyta'}
                </span>
              </div>

              <p className="text-text-secondary mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-text-secondary">Kiekis:</span>
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:text-accent"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(remainingStock, quantity + 1))}
                      className="px-4 py-2 hover:text-accent"
                      disabled={quantity >= remainingStock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-text-secondary">Likutis:</span>
                  <span className={`font-medium ${remainingStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {remainingStock > 0 ? `${remainingStock} vnt.` : 'Išparduota'}
                  </span>
                  {cartItemQuantity > 0 && (
                    <span className="text-sm text-text-secondary">
                      ({cartItemQuantity} vnt. krepšelyje)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 btn-primary flex items-center justify-center gap-2 ${
                    remainingStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={remainingStock === 0}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{remainingStock === 0 ? 'Išparduota' : 'Į krepšelį'}</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-full hover:border-accent transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-4 border border-gray-200 rounded-full hover:border-accent transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="font-serif text-lg mb-4">Produkto informacija</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li>• Pagaminta Lietuvoje</li>
                  <li>• 100% natūralūs ingredientai</li>
                  <li>• Dermatologiškai testuota</li>
                  <li>• Tinka visų tipų odai</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;