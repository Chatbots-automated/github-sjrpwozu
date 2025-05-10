import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-32 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h6 className="text-accent uppercase tracking-widest text-sm font-medium mb-3">
              Susisiekite su mumis
            </h6>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Kontaktai</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl mb-2">Adresas</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Giraitės g. 60A, Rubežius<br />
                    <span className="text-sm italic">(galimybė atsiimti Trakuose, siunčiame į kitus miestus)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl mb-2">El. paštas</h3>
                  <a href="mailto:info@beautybyella.lt" className="text-text-secondary hover:text-accent transition-colors">
                    info@beautybyella.lt
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl mb-2">Telefonas</h3>
                  <a href="tel:+37064027403" className="text-text-secondary hover:text-accent transition-colors">
                    +370 640 27403
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft p-8">
              <h3 className="font-serif text-2xl mb-6">Parašykite mums</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Vardas
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    El. paštas
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Žinutė
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-accent"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Siųsti
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;