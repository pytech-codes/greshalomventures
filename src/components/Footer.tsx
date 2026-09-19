'use client';

import { IconDroplet, IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-mist-gray to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <IconDroplet className="w-8 h-8 text-ocean-mist" />
              <span className="text-xl font-light text-gray-800 tracking-wide">
                Greshalom Ventures
              </span>
            </div>
            <p className="text-gray-600 font-light text-sm">
              Pure water, pure life. Delivering quality hydration to your doorstep.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 font-light text-sm">
                <IconPhone className="w-5 h-5 text-ocean-mist" />
                <span>+234 8169446071</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 font-light text-sm">
                <IconMail className="w-5 h-5 text-ocean-mist" />
                <span>Owosenimojisola72@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 font-light text-sm">
                <IconMapPin className="w-5 h-5 text-ocean-mist" />
                <span>Ibadan, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#home" className="block text-gray-600 hover:text-ocean-mist transition-colors font-light text-sm">
                Home
              </a>
              <a href="#products" className="block text-gray-600 hover:text-ocean-mist transition-colors font-light text-sm">
                Products
              </a>
              <a href="#process" className="block text-gray-600 hover:text-ocean-mist transition-colors font-light text-sm">
                Our Process
              </a>
              <a href="#order" className="block text-gray-600 hover:text-ocean-mist transition-colors font-light text-sm">
                Order
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 font-light text-sm">
            © {new Date().getFullYear()} Greshalom Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;