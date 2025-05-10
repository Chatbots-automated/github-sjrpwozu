import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={closeCart}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="pointer-events-auto w-screen max-w-md"
                >
                  <Dialog.Panel className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                      <Dialog.Title className="font-serif text-2xl">
                        {isCheckingOut ? 'Apmokėjimas' : 'Krepšelis'}
                      </Dialog.Title>
                      <button
                        onClick={closeCart}
                        className="p-2 hover:text-accent transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      {isCheckingOut ? (
                        <CheckoutForm />
                      ) : (
                        <>
                          <div className="py-6 px-6">
                            {items.length === 0 ? (
                              <div className="flex flex-col items-center justify-center h-full text-center">
                                <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                                <h3 className="font-serif text-xl mb-2">Jūsų krepšelis tuščias ✨</h3>
                                <p className="text-text-secondary">
                                  Atrodo, kad dar nepridėjote jokių produktų į krepšelį
                                </p>
                              </div>
                            ) : (
                              <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                  <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeItem}
                                  />
                                ))}
                              </AnimatePresence>
                            )}
                          </div>

                          {items.length > 0 && (
                            <div className="border-t border-gray-100 p-6">
                              <div className="flex justify-between mb-4">
                                <span className="font-serif text-lg">Viso suma:</span>
                                <span className="font-serif text-xl">€{total.toFixed(2)}</span>
                              </div>
                              <button 
                                className="w-full btn-primary"
                                onClick={() => setIsCheckingOut(true)}
                              >
                                Pereiti prie apmokėjimo
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Dialog.Panel>
                </motion.div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;