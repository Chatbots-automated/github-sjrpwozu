import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  imageurl: string;
  category: string;
}

interface CategorySectionProps {
  title: string;
  products: Product[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, products }) => {
  return (
    <div className="mb-16 last:mb-0">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-serif">{title}</h3>
        <Link 
          to={`/collections?category=${encodeURIComponent(title)}`}
          className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
        >
          Peržiūrėti visus
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
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
    </div>
  );
};

export default CategorySection;