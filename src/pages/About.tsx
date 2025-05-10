import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
              Sužinokite daugiau
            </h6>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Apie mus</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <p className="text-lg leading-relaxed text-text-secondary mb-6">
                Beauty by Ella – tai daugiau nei tiesiog parduotuvė. Tai – mano asmeninis prekės ženklas, gimęs iš meilės grožio industrijai ir kasdienio darbo su nagų priežiūros profesionalais.
              </p>
              
              <p className="text-lg leading-relaxed text-text-secondary mb-6">
                Sukūriau Beauty by Ella tam, kad meistrai turėtų vietą, kur rastų kruopščiai atrinktas, stilingas ir kokybiškas priemones, pritaikytas jų poreikiams. Kiekvienas produktas čia – tai apgalvotas pasirinkimas, kuris padeda kurti ne tik gražius rezultatus, bet ir malonią darbo patirtį.
              </p>

              <p className="text-lg leading-relaxed text-text-secondary">
                Šis prekės ženklas – tai apie tikrumą, estetiką ir ryšį su tais, kurie dirba iš širdies. Jei ir tu vertini kokybę, aiškų stilių ir nuoširdų požiūrį – Beauty by Ella skirta būtent tau.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 mt-16">
              <div className="relative h-[600px] rounded-lg overflow-hidden">
                <img
                  src="https://i.imgur.com/kEsqUGD.png"
                  alt="Beauty by Ella workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;