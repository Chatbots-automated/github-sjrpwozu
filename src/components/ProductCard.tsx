import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  imageSrc: string;
  name: string;
  description: string;
  price: number | null;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, imageSrc, name, description, price, category }) => {
  return (
    <Link to={`/product/${id}`} className="card group">
      <div className="relative overflow-hidden h-64">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      <div className="p-5">
        <span className="text-xs font-medium text-accent uppercase tracking-wider mb-2 inline-block">
          {category}
        </span>
        <h3 className="font-serif text-lg mb-2">{name}</h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="font-serif">
            {price !== null && price !== undefined
              ? `€${price.toFixed(2)}`
              : 'Kaina nenurodyta'}
          </span>
          <span className="text-sm font-medium text-accent group-hover:text-accent-dark transition-colors">
            Peržiūrėti
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;