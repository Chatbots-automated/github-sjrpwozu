import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { Search, X, Filter, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../store/cartStore';
import { useSearchParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  imageurl: string;
  category: string;
  stock: number;
  isNew?: boolean;
  isTopSeller?: boolean;
  hasDiscount?: boolean;
  oldPrice?: number;
}

interface ProductGridProps {
  initialCategory?: string | null;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageurl: string;
}

const ITEMS_PER_PAGE = 12;

// Product Badges Component
const ProductBadges: React.FC<{ product: Product }> = ({ product }) => {
  const { items } = useCartStore();
  const cartItem = items.find(item => item.id === product.id);
  const remainingStock = product.stock - (cartItem?.quantity || 0);

  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1">
      {product.isNew && (
        <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
          Naujas
        </span>
      )}
      {product.isTopSeller && (
        <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-medium">
          Top
        </span>
      )}
      {product.hasDiscount && (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Akcija
        </span>
      )}
      {remainingStock === 0 && (
        <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Išparduota
        </span>
      )}
      {remainingStock > 0 && remainingStock < 5 && (
        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Liko {remainingStock} vnt.
        </span>
      )}
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{
  product: Product;
  onQuickView: () => void;
  onAddToCart: () => void;
  cartItems: CartItem[];
}> = ({ product, onQuickView, onAddToCart, cartItems }) => {
  const cartItem = cartItems.find(item => item.id === product.id);
  const remainingStock = product.stock - (cartItem?.quantity || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-soft transition-all duration-300 group-hover:shadow-lg group-hover:translate-y-[-4px]">
        <div 
          className="aspect-[3/4] relative overflow-hidden cursor-pointer"
          onClick={onQuickView}
        >
          <img
            src={product.imageurl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <ProductBadges product={product} />
          
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
              Greita peržiūra
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <span className="text-xs font-medium text-accent uppercase tracking-wider mb-2 inline-block">
            {product.category}
          </span>
          <h3 className="font-serif text-lg mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              {product.hasDiscount && product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  €{product.oldPrice.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-serif">
                {product.price !== null
                  ? `€${product.price.toFixed(2)}`
                  : 'Kaina nenurodyta'}
              </span>
            </div>
            <button 
              onClick={onAddToCart}
              className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
                remainingStock > 0
                  ? 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={remainingStock === 0}
            >
              {remainingStock > 0 ? 'Į krepšelį' : 'Išparduota'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductGrid: React.FC<ProductGridProps> = ({ initialCategory }) => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || initialCategory || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product & { isOpen: boolean } | null>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  const { addItem, items } = useCartStore();

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else if (initialCategory !== undefined) {
      setSelectedCategory(initialCategory || '');
    }
  }, [initialCategory, categoryFromUrl]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (sortOrder) {
      filtered.sort((a, b) => {
        if (!a.price) return 1;
        if (!b.price) return -1;
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategory, sortOrder]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      if (data) {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Klaida gaunant produktus:', error);
      setError(error instanceof Error ? error.message : 'Nepavyko gauti produktų');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (product.price !== null && product.stock > 0) {
      const cartItem = items.find(item => item.id === product.id);
      const currentQuantity = cartItem?.quantity || 0;
      
      if (currentQuantity < product.stock) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageurl: product.imageurl,
        });
      }
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-soft animate-pulse"
          >
            <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Klaida kraunant produktus: {error}</p>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchProducts();
          }}
          className="btn-primary"
        >
          Bandyti dar kartą
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ieškoti produktų..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="hidden lg:block">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
                className="pl-4 pr-10 py-3 bg-background rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Rūšiuoti pagal kainą</option>
                <option value="asc">Nuo pigiausių</option>
                <option value="desc">Nuo brangiausių</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterMenuOpen(true)}
              className="lg:hidden flex items-center gap-2 px-6 py-3 bg-background rounded-xl"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtrai</span>
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-3 rounded-xl transition-all text-center ${
                selectedCategory === ''
                  ? 'bg-accent text-white shadow-soft'
                  : 'bg-background hover:bg-accent/10'
              }`}
            >
              Visos kategorijos
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl transition-all text-center ${
                  selectedCategory === category
                    ? 'bg-accent text-white shadow-soft'
                    : 'bg-background hover:bg-accent/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory || searchQuery || sortOrder) && (
        <div className="flex flex-wrap items-center gap-3">
          {selectedCategory && (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-xl text-sm">
              {selectedCategory}
              <button onClick={() => setSelectedCategory('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-xl text-sm">
              Paieška: {searchQuery}
              <button onClick={() => setSearchQuery('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
          {sortOrder && (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-xl text-sm">
              {sortOrder === 'asc' ? 'Nuo pigiausių' : 'Nuo brangiausių'}
              <button onClick={() => setSortOrder('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSelectedCategory('');
              setSearchQuery('');
              setSortOrder('');
            }}
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            Išvalyti visus
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-text-secondary">
          Rasta produktų: <span className="font-medium text-text-primary">{filteredProducts.length}</span>
        </p>
      </div>

      {/* Product Grid */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-soft">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="font-serif text-xl mb-2">Produktų nerasta</h3>
          <p className="text-text-secondary mb-6">
            Pabandykite pakeisti filtrus arba ieškoti kitų produktų
          </p>
          <button
            onClick={() => {
              setSelectedCategory('');
              setSearchQuery('');
              setSortOrder('');
            }}
            className="btn-secondary"
          >
            Rodyti visus produktus
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={() => setQuickViewProduct({ ...product, isOpen: true })}
              onAddToCart={() => handleAddToCart(product)}
              cartItems={items}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                currentPage === index + 1
                  ? 'bg-accent text-white shadow-soft'
                  : 'bg-white text-text-primary hover:bg-accent/10'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Filters Dialog */}
      <Dialog
        open={isFilterMenuOpen}
        onClose={() => setIsFilterMenuOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-end justify-center p-4 sm:items-center">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-2xl shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="text-lg font-serif">Filtrai</Dialog.Title>
                <button onClick={() => setIsFilterMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategorija</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-background rounded-xl"
                  >
                    <option value="">Visos kategorijos</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Rūšiuoti</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
                    className="w-full px-4 py-3 bg-background rounded-xl"
                  >
                    <option value="">Rūšiuoti pagal kainą</option>
                    <option value="asc">Nuo pigiausių</option>
                    <option value="desc">Nuo brangiausių</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={() => setIsFilterMenuOpen(false)}
                  className="w-full btn-primary"
                >
                  Pritaikyti filtrus
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Quick View Dialog */}
      <AnimatePresence>
        {quickViewProduct && (
          <Dialog
            open={quickViewProduct.isOpen}
            onClose={() => setQuickViewProduct(null)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl bg-white rounded-2xl shadow-xl">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <Dialog.Title className="text-2xl font-serif">
                      {quickViewProduct.name}
                    </Dialog.Title>
                    <button
                      onClick={() => setQuickViewProduct(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={quickViewProduct.imageurl}
                        alt={quickViewProduct.name}
                        className="w-full h-full object-cover"
                      />
                      <ProductBadges product={quickViewProduct} />
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-text-secondary">
                        {quickViewProduct.description}
                      </p>
                      
                      <div>
                        {quickViewProduct.hasDiscount && quickViewProduct.oldPrice && (
                          <span className="text-sm text-gray-400 line-through mr-2">
                            €{quickViewProduct.oldPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-2xl font-serif">
                          {quickViewProduct.price !== null
                            ? `€${quickViewProduct.price.toFixed(2)}`
                            : 'Kaina nenurodyta'}
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          handleAddToCart(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className={`w-full ${
                          quickViewProduct.stock > 0 
                            ? 'btn-primary' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed px-6 py-3 rounded-full'
                        }`}
                        disabled={quickViewProduct.stock === 0}
                      >
                        {quickViewProduct.stock > 0 ? 'Į krepšelį' : 'Išparduota'}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;