import React from 'react';
import { Clock, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Visit Information */}
          <div>
            <h5 className="font-serif text-xl mb-6">Visit</h5>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Clock size={18} className="mr-2" />
                <div>
                  <span className="block">Opening Hours</span>
                  <span className="text-sm text-gray-400">Daily: 10:00 AM - 5:30 PM</span>
                </div>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <div>
                  <span className="block">Location & Directions</span>
                  <span className="text-sm text-gray-400">KIIT UNIVERSITY Patia Bhubneswar Odisha 751024</span>
                </div>
              </li>
              <li className="text-gray-400">Group Visits & Tours</li>
              <li className="text-gray-400">Accessibility</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-serif text-xl mb-6">Support</h5>
            <ul className="space-y-4">
              <li>
                <span className="block">Donate</span>
                <span className="block text-sm text-gray-400">Support our mission</span>
              </li>
              <li>
                <span className="block">Membership</span>
                <span className="block text-sm text-gray-400">Join our community</span>
              </li>
              <li>
                <span className="block">Corporate Support</span>
                <span className="block text-sm text-gray-400">Partnership opportunities</span>
              </li>
              <li>
                <span className="block">Volunteer</span>
                <span className="block text-sm text-gray-400">Get involved</span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5 className="font-serif text-xl mb-6">Connect</h5>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+1 (212) 555-0123</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>info@museum.com</span>
              </li>
              <li>
                <span className="block">Newsletter</span>
                <span className="block text-sm text-gray-400">Stay updated</span>
              </li>
              <li>
                <span className="block">Press Room</span>
                <span className="block text-sm text-gray-400">News & Media</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h6 className="font-serif text-lg">Follow Us</h6>
              <div className="flex space-x-4">
                <span className="p-2 bg-gray-800 rounded-full">
                  <Facebook size={20} />
                </span>
                <span className="p-2 bg-gray-800 rounded-full">
                  <Twitter size={20} />
                </span>
                <span className="p-2 bg-gray-800 rounded-full">
                  <Instagram size={20} />
                </span>
                <span className="p-2 bg-gray-800 rounded-full">
                  <Youtube size={20} />
                </span>
              </div>
            </div>
            <div>
              <h6 className="font-serif text-lg mb-4">Subscribe to Our Newsletter</h6>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-400">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-wrap gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
              <span>Accessibility</span>
            </div>
            <div className="text-right">
              <p>&copy; {currentYear} Museum of Art. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}