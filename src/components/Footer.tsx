import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-background pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="/beautybyellalogo.jpg" 
                alt="Beauty by Ella Logo" 
                className="h-16 w-16 rounded-full"
              />
              <h2 className="text-2xl font-serif">Beauty by Ella</h2>
            </div>
            <p className="text-text-secondary mb-6 max-w-xs">
              Beauty by Ella - tai vieta,kur kokybė susitinka su estetika.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100083485518751" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-primary hover:text-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/estetine_kosmetologija_evelina/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-primary hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Greita navigacija</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-text-secondary hover:text-accent transition-colors">
                  Pagrindinis
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="text-text-secondary hover:text-accent transition-colors">
                  Apie Mus
                </Link>
              </li>
              <li>
                <Link to="/collections" onClick={scrollToTop} className="text-text-secondary hover:text-accent transition-colors">
                  Kategorijos
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="text-text-secondary hover:text-accent transition-colors">
                  Kontaktai
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Kategorijos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/collections?category=Manikiūrui / Pedikiūrui" 
                  onClick={scrollToTop}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Manikiūrui / Pedikiūrui
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections?category=Teri dulkių surinkėjai ir priedai" 
                  onClick={scrollToTop}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Dulkių ištraukėjai
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections?category=Rinkiniai PIGIAU!" 
                  onClick={scrollToTop}
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Rinkiniai pigiau
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Kontaktai</h3>
            <address className="not-italic text-text-secondary">
              <p className="mb-2">Giraitės g. 60A, Rubežius</p>
              <p className="mb-2">
                <a 
                  href="mailto:info@beautybyella.lt" 
                  className="hover:text-accent transition-colors"
                >
                  info@beautybyella.lt
                </a>
              </p>
              <p>
                <a 
                  href="tel:+37064027403" 
                  className="hover:text-accent transition-colors"
                >
                  +370 640 27403
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="w-full rounded-2xl overflow-hidden mb-8">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9237.63768729337!2d24.971937052077283!3d54.632008349380534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ddf28d67f16aad%3A0xa6599f5ebd3f5e7a!2sGirait%C4%97s%20g.%2060A%2C%20Rube%C5%BEius%2C%2021143%20Trak%C5%B3%20r.%20sav.%2C%20Lithuania!5e0!3m2!1sen!2sus!4v1746362476289!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Beauty by Ella location"
            className="w-full"
          />
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Beauty by Ella. Visos teisės saugomos.
          </p>
          <p className="text-sm text-text-secondary mt-2">
            Svetainę kūrė <a href="https://pagalvosiu.lt" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Pagalvosiu.lt</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;