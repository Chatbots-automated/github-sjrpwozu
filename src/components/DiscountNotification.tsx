import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';

const DiscountNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset localStorage for testing
    localStorage.removeItem('discount-notification-shown');
    
    const hasSeenNotification = localStorage.getItem('discount-notification-shown');
    
    if (!hasSeenNotification) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('discount-notification-shown', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="bg-white rounded-t-xl md:rounded-xl shadow-luxe max-w-sm mx-auto overflow-hidden"
          >
            <div className="p-4">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
              
              <div className="flex flex-col items-center text-center gap-3">
                <div className="bg-accent/10 p-2 rounded-full">
                  <Tag className="w-5 h-5 text-accent" />
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">
                    Gaukite 5% nuolaidą nuo galutinės sumos!
                  </p>
                  <div className="bg-background p-2 rounded-lg">
                    <span className="font-mono text-base font-medium">Ella5</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full btn-primary text-sm py-2"
                >
                  Supratau
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DiscountNotification;