import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

interface ErrorToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-red-50 border border-red-100 rounded-lg shadow-lg px-6 py-4 flex items-center gap-3 min-w-[320px] max-w-md">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 flex-1">{message}</p>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorToast;