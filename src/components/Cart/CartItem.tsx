import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 py-4 border-b border-gray-100"
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50">
        <img
          src={item.imageurl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="font-serif text-lg mb-1">{item.name}</h4>
        <div className="text-lg font-serif mb-2">€{(item.price * item.quantity).toFixed(2)}</div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-full">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="p-1 hover:text-accent transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:text-accent transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;