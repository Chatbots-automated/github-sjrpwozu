import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image column */}
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3373714/pexels-photo-3373714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Beauty product and skincare"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Text column */}
          <div className="max-w-lg">
            <h6 className="text-accent uppercase tracking-widest text-sm font-medium mb-3">
              Mūsų istorija
            </h6>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Apie mus</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Sveiki atvykę į Beauty by Ella – jūsų natūralios kosmetikos oazę. Mūsų istorija prasidėjo iš aistros grožiui ir tikėjimo, kad kiekviena oda nusipelno aukščiausios kokybės priežiūros.
            </p>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Naudojame tik natūralius ingredientus, kurie puoselėja odą ir suteikia jai švytėjimo. Kiekvienas produktas sukurtas su meile ir dėmesiu detalėms, užtikrinant, kad jūsų odos priežiūros ritualas būtų ne tik veiksmingas, bet ir malonus.
            </p>
            <Link to="/about" className="btn-primary">
              Sužinoti daugiau
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;