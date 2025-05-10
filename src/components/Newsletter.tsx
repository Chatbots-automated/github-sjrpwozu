import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Naujienlaiškis</h2>
          <p className="text-text-secondary mb-8">
            Gauk pirmoji išskirtinius pasiūlymus ir naujausias grožio naujienas
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <input
                type="email"
                placeholder="Tavo el. paštas"
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-secondary whitespace-nowrap">
              Prenumeruoti naujienlaiškį
            </button>
          </form>
          
          <p className="text-sm text-text-secondary mt-4">
            Gauk pirmoji išskirtinius pasiūlymus
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;