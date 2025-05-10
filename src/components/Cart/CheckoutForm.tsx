import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { createMontonioOrder } from '../../lib/montonio';
import { getTerminals } from '../../lib/lpexpress';
import { supabase } from '../../lib/supabase';
import ErrorToast from '../ErrorToast';
import LoadingSpinner from '../LoadingSpinner';
import { X } from 'lucide-react';

interface Terminal {
  id: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
}

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  deliveryMethod: 'shipping' | 'pickup';
  terminalId: string;
  pickupLocation: string;
}

const CheckoutForm = () => {
  const { items, clearCart, closeCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    deliveryMethod: 'shipping',
    terminalId: '',
    pickupLocation: 'trakai',
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount_value: number;
  } | null>(null);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTerminals() {
      try {
        const terminals = await getTerminals();
        setTerminals(terminals);
        if (terminals.length > 0) {
          setFormData(prev => ({ ...prev, terminalId: terminals[0].id }));
        }
      } catch (error) {
        console.error('Error fetching terminals:', error);
        setError('Failed to load terminals');
      }
    }

    if (formData.deliveryMethod === 'shipping') {
      fetchTerminals();
    }
  }, [formData.deliveryMethod]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount_value) / 100 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsCouponLoading(true);
    setCouponError(null);

    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('code, discount_value')
        .eq('code', couponCode.trim())
        .eq('is_active', true)
        .single();

      if (error) throw new Error('Neteisingas nuolaidos kodas');
      if (!data) throw new Error('Nuolaidos kodas nerastas');

      setAppliedCoupon(data);
      setCouponCode('');
    } catch (error) {
      setCouponError(error instanceof Error ? error.message : 'Klaida tikrinant nuolaidos kodą');
      setAppliedCoupon(null);
    } finally {
      setIsCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get selected terminal details if shipping method is selected
      let terminalAddress = null;
      if (formData.deliveryMethod === 'shipping') {
        const selectedTerminal = terminals.find(t => t.id === formData.terminalId);
        if (selectedTerminal) {
          terminalAddress = {
            name: selectedTerminal.name,
            city: selectedTerminal.city,
            address: selectedTerminal.address,
            postal_code: selectedTerminal.postalCode
          };
        }
      }

      // Create order in Supabase
      const { data: newOrder, error: supabaseError } = await supabase
        .from('orders')
        .insert([{
          customer_name: formData.fullName,
          customer_email: formData.email,
          phone: formData.phone,
          products: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total_price: total,
          subtotal: subtotal,
          discount: discountAmount,
          applied_coupon: appliedCoupon?.code,
          status: 'pending',
          delivery_method: formData.deliveryMethod,
          terminal_id: formData.deliveryMethod === 'shipping' ? formData.terminalId : null,
          terminal_address: terminalAddress
        }])
        .select()
        .single();

      if (supabaseError) {
        throw new Error('Failed to create order in database');
      }

      // Create Montonio order
      const montonioPayload = {
        merchantReference: newOrder.id,
        amount: total,
        currency: 'EUR',
        customerEmail: formData.email,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        returnUrl: `${window.location.origin}/order-success`,
        notificationUrl: `${window.location.origin}/api/webhook/montonio`,
      };

      const montonioOrder = await createMontonioOrder(montonioPayload);

      // Clear cart and redirect
      clearCart();
      closeCart();
      
      if (montonioOrder.paymentUrl) {
        window.location.href = montonioOrder.paymentUrl;
      } else {
        throw new Error('No payment URL received from Montonio');
      }

    } catch (error) {
      console.error('Error processing order:', error);
      setError(error instanceof Error ? error.message : 'Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-serif mb-6">Užsakymo informacija</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary mb-2">
              Vardas Pavardė *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              El. paštas *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
              Telefono numeris *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Pristatymo būdas *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative flex cursor-pointer rounded-lg border border-gray-200 p-4 focus:outline-none">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="shipping"
                  className="sr-only"
                  checked={formData.deliveryMethod === 'shipping'}
                  onChange={handleInputChange}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-text-primary">
                      LP Express paštomatas
                    </span>
                  </span>
                </span>
                <span 
                  className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                    formData.deliveryMethod === 'shipping' ? 'border-accent' : 'border-transparent'
                  }`} 
                  aria-hidden="true"
                />
              </label>
              <label className="relative flex cursor-pointer rounded-lg border border-gray-200 p-4 focus:outline-none">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  className="sr-only"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={handleInputChange}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-text-primary">
                      Atsiėmimas salone
                    </span>
                  </span>
                </span>
                <span 
                  className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                    formData.deliveryMethod === 'pickup' ? 'border-accent' : 'border-transparent'
                  }`} 
                  aria-hidden="true"
                />
              </label>
            </div>
          </div>

          {formData.deliveryMethod === 'shipping' ? (
            <div>
              <label htmlFor="terminalId" className="block text-sm font-medium text-text-secondary mb-2">
                Pasirinkite paštomatą *
              </label>
              <select
                id="terminalId"
                name="terminalId"
                required
                value={formData.terminalId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
              >
                {terminals.map((terminal) => (
                  <option key={terminal.id} value={terminal.id}>
                    {terminal.city}, {terminal.address}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-text-secondary mb-2">
                Atsiėmimo vieta *
              </label>
              <select
                id="pickupLocation"
                name="pickupLocation"
                required
                value={formData.pickupLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
              >
                <option value="trakai">Trakai - Giraitės g. 60A, Rubežius</option>
              </select>
            </div>
          )}

          {/* Coupon Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-serif mb-4">Nuolaidos kodas</h3>
            
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-accent/10 rounded-lg p-4">
                <div>
                  <p className="font-medium">Pritaikytas kodas: {appliedCoupon.code}</p>
                  <p className="text-sm text-text-secondary">
                    Nuolaida: {appliedCoupon.discount_value}%
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="p-2 hover:bg-accent/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Įveskite nuolaidos kodą"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isCouponLoading || !couponCode.trim()}
                  className="btn-secondary whitespace-nowrap"
                >
                  {isCouponLoading ? (
                    <div className="flex items-center">
                      <LoadingSpinner />
                      <span className="ml-2">Tikrinama...</span>
                    </div>
                  ) : (
                    'Pritaikyti'
                  )}
                </button>
              </div>
            )}
            
            {couponError && (
              <p className="mt-2 text-sm text-red-600">{couponError}</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-text-secondary">
              <span>Tarpinė suma:</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-accent">
                <span>Nuolaida ({appliedCoupon.discount_value}%):</span>
                <span>-€{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-serif">
              <span>Bendra suma:</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full btn-primary relative ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
                <span className="ml-2">Apdorojama...</span>
              </div>
            ) : (
              'Tęsti apmokėjimą'
            )}
          </button>
        </div>
      </form>

      <ErrorToast
        message={error || ''}
        isVisible={!!error}
        onClose={() => setError(null)}
      />
    </div>
  );
};

export default CheckoutForm;