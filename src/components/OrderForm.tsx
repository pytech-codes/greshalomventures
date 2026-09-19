'use client';

import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { IconSend, IconTrash, IconShoppingCart, IconMessage, IconPlus, IconMinus } from '@tabler/icons-react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '2348000000000';

interface FormData {
  name: string;
  phone: string;
  address: string;
  notes: string;
  deliveryType: 'standard' | 'express';
}

interface ValidationError {
  name?: boolean;
  phone?: boolean;
  address?: boolean;
  cart?: boolean;
}

const OrderForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    notes: '',
    deliveryType: 'standard',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError>({});
  const { items, getTotal, updateQuantity, removeItem, clearCart } = useCartStore();
  const orderSectionRef = useRef<HTMLElement>(null);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotal();

  useEffect(() => {
    // Smooth scroll to order section when cart has items
    if (items.length > 0 && orderSectionRef.current) {
      const rect = orderSectionRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isVisible) {
        orderSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [items.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof ValidationError]) {
      setValidationErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationError = {};
    
    if (!formData.name.trim()) errors.name = true;
    if (!formData.phone.trim()) errors.phone = true;
    if (!formData.address.trim()) errors.address = true;
    if (totalQuantity === 0) errors.cart = true;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    // Format WhatsApp message
    let message = `*🌊 New Order - Greshalom Ventures*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}\n`;
    message += `Delivery Type: ${formData.deliveryType === 'express' ? '⚡ Express' : '📦 Standard'}\n\n`;
    
    if (formData.notes.trim()) {
      message += `📝 *Special Notes:*\n${formData.notes}\n\n`;
    }

    message += `🛒 *Order Items:*\n`;
    items.forEach((item) => {
      if (item.quantity > 0) {
        message += `• ${item.name}\n`;
        message += `  ${item.volume}\n`;
        message += `  ${item.quantity}x ₦${item.price.toLocaleString()} = ₦${(item.price * item.quantity).toLocaleString()}\n`;
      }
    });

    message += `\n💰 *Total: ₦${totalPrice.toLocaleString()}*`;
    message += `\n\nThank you for choosing Greshalom Ventures! 💧`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear form and cart after submission
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        address: '',
        notes: '',
        deliveryType: 'standard',
      });
      clearCart();
      setValidationErrors({});
      setIsSubmitting(false);
    }, 1000);
  };

  const handleGeneralInquiry = () => {
    const message = 'Hello Greshalom Ventures, I have a general enquiry about your water supply and delivery services.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + delta);
      updateQuantity(id, newQuantity);
      
      // Clear cart validation error if cart becomes non-empty
      if (newQuantity > 0 && validationErrors.cart) {
        setValidationErrors(prev => ({ ...prev, cart: false }));
      }
    }
  };

  const getInputClassName = (fieldName: keyof ValidationError) => {
    const baseClassName = "w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 focus:outline-none";
    const errorClassName = validationErrors[fieldName] 
      ? "border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.4)]" 
      : "border-gray-200 focus:border-ocean-mist";
    
    return `${baseClassName} ${errorClassName}`;
  };

  if (items.length === 0) {
    return (
      <section
        id="order"
        ref={orderSectionRef}
        className="relative py-20 overflow-hidden"
      >
        <div className="watercolor-bg">
          <div className="watercolor-layer" />
          <div className="watercolor-layer" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <IconShoppingCart className="w-24 h-24 mx-auto text-ocean-mist mb-6 opacity-50" />
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-xl text-gray-600 font-light mb-8">
              Add some products to get started
            </p>
            <a
              href="#products"
              className="inline-block px-8 py-3 bg-ocean-mist text-white rounded-full hover:bg-ocean-mist-dark transition-all duration-300 font-light tracking-wide"
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="order"
      ref={orderSectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="watercolor-bg">
        <div className="watercolor-layer" />
        <div className="watercolor-layer" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Complete Your Order
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Fill in your details and we'll process your order
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="ink-bleed-border glassmorphism p-6 rounded-2xl">
            <h3 className="text-2xl font-medium text-gray-800 mb-6">
              Order Summary
            </h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 glassmorphism-dark rounded-xl transition-all duration-300 ${
                    validationErrors.cart && item.quantity === 0 ? 'shadow-[0_0_15px_rgba(248,113,113,0.4)] border-2 border-red-400' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.volume}</p>
                      <p className="text-sm text-ocean-mist">
                        ₦{item.price.toLocaleString()} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <IconTrash className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-8 h-8 rounded-full border-2 border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-white transition-all duration-300 flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <IconMinus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-medium text-gray-800 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-8 h-8 rounded-full border-2 border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-white transition-all duration-300 flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <IconPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-medium text-gray-800">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Running Total */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between items-center text-2xl font-medium">
                <span className="text-gray-800">Total</span>
                <span className="text-ocean-mist">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {totalQuantity} item{totalQuantity !== 1 ? 's' : ''} in cart
              </p>
            </div>

            {validationErrors.cart && (
              <p className="text-red-500 text-sm font-medium mt-2">
                Please add at least one item to your cart
              </p>
            )}
          </div>

          {/* Order Form */}
          <div className="ink-bleed-border glassmorphism p-6 rounded-2xl">
            <h3 className="text-2xl font-medium text-gray-800 mb-6">
              Delivery Details
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="water-ripple">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={getInputClassName('name')}
                  placeholder="Enter your full name"
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">Please enter your name</p>
                )}
              </div>

              <div className="water-ripple">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={getInputClassName('phone')}
                  placeholder="Enter your phone number"
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">Please enter your phone number</p>
                )}
              </div>

              <div className="water-ripple">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={getInputClassName('address')}
                  placeholder="Enter your delivery address"
                />
                {validationErrors.address && (
                  <p className="text-red-500 text-sm mt-1">Please enter your delivery address</p>
                )}
              </div>

              <div className="water-ripple">
                <label htmlFor="deliveryType" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Type
                </label>
                <select
                  id="deliveryType"
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ocean-mist focus:outline-none transition-colors duration-300 bg-white/50"
                >
                  <option value="standard">Standard Delivery</option>
                  <option value="express">Express Delivery</option>
                </select>
              </div>

              <div className="water-ripple">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ocean-mist focus:outline-none transition-colors duration-300 bg-white/50 resize-none"
                  placeholder="Any special instructions?"
                />
              </div>

              {/* Primary WhatsApp Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-ocean-mist to-seafoam text-white rounded-full hover:from-ocean-mist-dark hover:to-seafoam-dark transition-all duration-300 font-light tracking-wide flex items-center justify-center space-x-2 whatsapp-pulse disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <IconSend className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Order via WhatsApp'}</span>
              </button>

              {/* Secondary Inquiry Button */}
              <button
                type="button"
                onClick={handleGeneralInquiry}
                className="w-full px-8 py-3 border-2 border-ocean-mist text-ocean-mist rounded-full hover:bg-ocean-mist hover:text-white transition-all duration-300 font-light tracking-wide flex items-center justify-center space-x-2"
              >
                <IconMessage className="w-5 h-5" />
                <span>General Inquiry Only</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;