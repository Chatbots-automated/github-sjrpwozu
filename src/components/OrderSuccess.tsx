import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, MapPin } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import LoadingSpinner from './LoadingSpinner';

interface OrderDetails {
  id: string;
  customer_name: string;
  delivery_method: string;
  shipping_address?: {
    address: string;
    city: string;
    postal_code: string;
  };
  total_price: number;
  products: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  status: string;
}

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const paymentReference = searchParams.get('payment_reference');
        if (!paymentReference) {
          setError('Užsakymo informacija nerasta');
          return;
        }

        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('payment_reference', paymentReference)
          .single();

        if (orderError) throw orderError;
        setOrderDetails(order);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Nepavyko gauti užsakymo informacijos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-32 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen bg-background py-32">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-4">Užsakymo informacija nerasta</h1>
            <p className="text-text-secondary mb-8">{error}</p>
            <Link to="/" className="btn-primary">Grįžti į pagrindinį puslapį</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-32">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-soft p-8"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif mb-4">Ačiū už užsakymą!</h1>
            <p className="text-text-secondary">
              Jūsų užsakymas sėkmingai apmokėtas. Netrukus gausite patvirtinimo el. laišką.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-100 pb-8">
              <h2 className="font-serif text-xl mb-4">Užsakymo informacija</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-text-secondary mb-2">Užsakymo numeris</p>
                  <p className="font-medium">{orderDetails.id}</p>
                </div>
                <div>
                  <p className="text-text-secondary mb-2">Užsakovas</p>
                  <p className="font-medium">{orderDetails.customer_name}</p>
                </div>
                <div>
                  <p className="text-text-secondary mb-2">Pristatymo būdas</p>
                  <div className="flex items-center gap-2">
                    {orderDetails.delivery_method === 'shipping' ? (
                      <Truck className="w-5 h-5 text-accent" />
                    ) : (
                      <MapPin className="w-5 h-5 text-accent" />
                    )}
                    <span className="font-medium">
                      {orderDetails.delivery_method === 'shipping' 
                        ? 'Pristatymas į namus'
                        : 'Atsiėmimas salone'}
                    </span>
                  </div>
                </div>
                {orderDetails.shipping_address && (
                  <div>
                    <p className="text-text-secondary mb-2">Pristatymo adresas</p>
                    <p className="font-medium">
                      {orderDetails.shipping_address.address}<br />
                      {orderDetails.shipping_address.city}, {orderDetails.shipping_address.postal_code}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-b border-gray-100 pb-8">
              <h2 className="font-serif text-xl mb-4">Užsakyti produktai</h2>
              <div className="space-y-4">
                {orderDetails.products.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-text-secondary">Kiekis: {product.quantity}</p>
                    </div>
                    <p className="font-serif">€{(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-lg">
              <p className="font-serif">Bendra suma:</p>
              <p className="font-serif text-xl">€{orderDetails.total_price.toFixed(2)}</p>
            </div>

            <div className="text-center pt-8">
              <Link to="/collections" className="btn-primary">
                Tęsti apsipirkimą
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;