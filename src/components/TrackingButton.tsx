import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

const TrackingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      setError('Įveskite siuntos numerį');
      return;
    }

    // Open LP Express tracking page in a new tab
    window.open(`https://www.lpexpress.lt/sekti-siunta?documentNumber=${trackingNumber}`, '_blank');
    setIsOpen(false);
    setTrackingNumber('');
    setError(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-accent transition-colors"
      >
        <Package className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                <Dialog.Title className="text-2xl font-serif mb-4">
                  Sekti siuntą
                </Dialog.Title>

                <p className="text-text-secondary mb-6">
                  Įveskite siuntos numerį, kad galėtumėte sekti jos būseną
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => {
                      setTrackingNumber(e.target.value);
                      setError(null);
                    }}
                    placeholder="Siuntos numeris"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                  />

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 btn-secondary"
                    >
                      Atšaukti
                    </button>
                    <button
                      onClick={handleTrack}
                      className="flex-1 btn-primary"
                    >
                      Sekti
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default TrackingButton;