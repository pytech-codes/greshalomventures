'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useCartStore } from '@/lib/cartStore';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | null;
  volume: string;
  status: 'available' | 'coming-soon';
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Cresta Table Water (Pack)',
    description: 'Premium quality table water in convenient pack',
    price: 1500,
    volume: 'Pack of 12 (75cl)',
    status: 'available',
    image: '/images/products/cresta-pack.jpg',
  },
  {
    id: '2',
    name: 'Imperial Table Water (Pack)',
    description: 'Premium quality table water in convenient pack',
    price: 1500,
    volume: 'Pack of 12 (75cl)',
    status: 'available',
    image: '/images/products/imperial-pack.jpg',
  },
  {
    id: '3',
    name: 'Cresta Table Water (Single)',
    description: 'Single bottle of premium table water',
    price: 200,
    volume: 'Single Bottle (75cl)',
    status: 'available',
    image: '/images/products/cresta-single.jpg',
  },
  {
    id: '4',
    name: 'Imperial Table Water (Single)',
    description: 'Single bottle of premium table water',
    price: 200,
    volume: 'Single Bottle (75cl)',
    status: 'available',
    image: '/images/products/imperial-single.jpg',
  },
  {
    id: '5',
    name: 'Greshalom Pure Water (Sachet)',
    description: 'Pure water in convenient sachet format',
    price: null,
    volume: '50cl Sachet / Bag',
    status: 'coming-soon',
    image: '/images/products/sachet-water.jpg',
  },
];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { items, addItem, updateQuantity } = useCartStore();

  const getQuantity = (productId: string) => {
    return items.find((item) => item.id === productId)?.quantity || 0;
  };

  const handleIncrease = (product: Product) => {
    if (product.status === 'coming-soon' || product.price === null) return;
    
    const currentQty = getQuantity(product.id);
    if (currentQty === 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        volume: product.volume,
      });
      
      // Smooth scroll to order section when first item is added
      setTimeout(() => {
        const orderSection = document.getElementById('order');
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      updateQuantity(product.id, currentQty + 1);
    }
  };

  const handleDecrease = (productId: string) => {
    const currentQty = getQuantity(productId);
    if (currentQty > 0) {
      updateQuantity(productId, currentQty - 1);
    }
  };

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.product-card');
    
    cards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="watercolor-bg">
        <div className="watercolor-layer" />
        <div className="watercolor-layer" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Pure water in every drop
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ink-bleed-border glassmorphism p-6 rounded-2xl ${
                product.status === 'coming-soon' ? 'opacity-75' : ''
              }`}
            >
              {/* Product Image */}
              <div className="relative h-48 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 glassmorphism-dark rounded-xl" />
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/bottle.jpg';
                    }}
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-ocean-mist">
                  {product.volume}
                </div>
                {product.status === 'coming-soon' && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </div>
                )}
              </div>

              {/* Product Info */}
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 font-light text-sm mb-4">
                {product.description}
              </p>
              <p className="text-2xl font-light text-ocean-mist mb-6">
                {product.price !== null ? `₦${product.price.toLocaleString()}` : 'Coming Soon'}
              </p>

              {/* Quantity Stepper or Coming Soon Message */}
              {product.status === 'available' && product.price !== null ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecrease(product.id)}
                      className="w-8 h-8 rounded-full border-2 border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-white transition-all duration-300 flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <IconMinus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-medium text-gray-800 w-8 text-center">
                      {getQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => handleIncrease(product)}
                      className="w-8 h-8 rounded-full border-2 border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-white transition-all duration-300 flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <IconPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2 text-gray-500 font-light text-sm">
                  Available soon
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;