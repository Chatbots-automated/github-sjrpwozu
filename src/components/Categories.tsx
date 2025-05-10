import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h6 className="text-accent uppercase tracking-widest text-sm font-medium mb-3">
            Kategorijos
          </h6>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Atraskite savo grožio ritualą</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Kokybė, kuria pasitiki grožio meistrai. Visa, ko reikia Jūsų manikiūro ir pedikiūro darbui - kokybė, kuria galite pasitikėti kasdien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/collections"
              className="group block"
            >
              <div className="relative h-[400px] overflow-hidden rounded-2xl mb-6">
                <img
                  src="https://i.imgur.com/SXpwuIc.png"
                  alt="Manikiūrui / Pedikiūrui"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-serif mb-2">Manikiūrui / Pedikiūrui</h3>
                  <p className="text-white/80 text-sm">Profesionalūs įrankiai ir priemonės nagų priežiūrai</p>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/collections?category=Teri dulkių surinkėjai ir priedai"
              className="group block"
            >
              <div className="relative h-[400px] overflow-hidden rounded-2xl mb-6">
                <img
                  src="https://i.imgur.com/5VbQBS4.png"
                  alt="Dulkių ištraukėjai"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-serif mb-2">Dulkių ištraukėjai</h3>
                  <p className="text-white/80 text-sm">Aukštos kokybės dulkių ištraukimo sistemos</p>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/collections?category=Rinkiniai PIGIAU!"
              className="group block"
            >
              <div className="relative h-[400px] overflow-hidden rounded-2xl mb-6">
                <img
                  src="https://i.imgur.com/s0PQmT6.png"
                  alt="Rinkiniai pigiau"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-serif mb-2">Rinkiniai pigiau</h3>
                  <p className="text-white/80 text-sm">Specialūs pasiūlymai ir rinkiniai</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/collections" 
            className="btn-primary inline-flex items-center group"
          >
            Visos kategorijos
            <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;