import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import CartDrawer from './components/Cart/CartDrawer';
import OrderSuccess from './components/OrderSuccess';

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Beauty by Ella | Luxury Cosmetics</title>
        <meta name="description" content="Discover luxury cosmetics and skincare products at Beauty by Ella. Natural ingredients, professional quality, and exceptional results." />
        <meta name="keywords" content="cosmetics, luxury beauty, skincare, natural cosmetics, beauty products, professional cosmetics" />
        <meta property="og:title" content="Beauty by Ella | Luxury Cosmetics" />
        <meta property="og:description" content="Discover luxury cosmetics and skincare products at Beauty by Ella. Natural ingredients, professional quality, and exceptional results." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Beauty by Ella | Luxury Cosmetics" />
        <meta name="twitter:description" content="Discover luxury cosmetics and skincare products at Beauty by Ella. Natural ingredients, professional quality, and exceptional results." />
        <link rel="canonical" href="https://beautybyella.lt" />
      </Helmet>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="collections" element={<Collections />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="order-success" element={<OrderSuccess />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <CartDrawer />
    </BrowserRouter>
  );
}

export default App;