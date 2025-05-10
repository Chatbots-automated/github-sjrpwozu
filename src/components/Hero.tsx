import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 min-h-[100dvh] flex">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-32">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium">Profesionali kosmetika</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight mb-4 leading-[1.1]"
            >
              Atraskite savo naturalų grožį
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-text-secondary mb-8 leading-relaxed"
            >
              Beauty by Ella - profesionalams,kuriantiems grožį rankomis. Kruopščiai atrinkti nagų priežiūros produktai,skirti meistrams,kurie vertina kokybę,estetiką ir patikimumą.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/collections" className="btn-primary group">
                Peržiūrėti kolekciją
                <span className="ml-2 transition-transform duration-300 inline-block group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/about" className="btn-secondary">Sužinoti daugiau</Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              <Link 
                to="/collections?category=Gelio sistema ir geliniai dažai"
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl hover:bg-accent/10 transition-colors"
              >
                <h4 className="text-xl font-serif mb-1">Gelio sistema ir geliniai dažai</h4>
                <p className="text-text-secondary">Profesionalūs produktai</p>
              </Link>
              <Link 
                to="/collections?category=Teri dulkių surinkėjai ir priedai"
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl hover:bg-accent/10 transition-colors"
              >
                <h4 className="text-xl font-serif mb-1">Teri dulkių surinkėjai</h4>
                <p className="text-text-secondary">Aukštos kokybės įranga</p>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://i.imgur.com/tf8pHsZ.png"
                alt="Beauty by Ella product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Aukščiausia kokybė</p>
                  <p className="text-sm text-text-secondary">Profesionalams</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;