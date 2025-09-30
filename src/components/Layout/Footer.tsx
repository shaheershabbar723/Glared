import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">
              GLARED
            </h3>
            <p className="text-gray-300 text-sm">
              Luxury clothing designed for the modern individual. Crafted with precision and attention to detail.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-yellow-500 transition-colors">Home</a></li>
              <li><a href="/portfolio" className="text-gray-300 hover:text-yellow-500 transition-colors">Portfolio</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">About</a></li>
              <li><a href="/pricing" className="text-gray-300 hover:text-yellow-500 transition-colors">Pricing</a></li>
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-yellow-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Collections</h4>
            <ul className="space-y-2">
              <li><a href="/portfolio?section=men" className="text-gray-300 hover:text-yellow-500 transition-colors">Men's Collection</a></li>
              <li><a href="/portfolio?section=women" className="text-gray-300 hover:text-yellow-500 transition-colors">Women's Collection</a></li>
              <li><a href="/pricing" className="text-gray-300 hover:text-yellow-500 transition-colors">Custom Orders</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">Consultations</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-yellow-500" />
                <span className="text-gray-300 text-sm">info@glared.net</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-yellow-500" />
                <div className="text-gray-300 text-sm">
                  <div>+1 (216) 244-9262 (US Office)</div>
                  <div>+92 320 8399055 (Pak Office)</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-yellow-500" />
                <span className="text-gray-300 text-sm">3648 Rocky River Dr<br />Cleveland, OH - 44111</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Glared. All rights reserved. Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}