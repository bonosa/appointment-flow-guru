import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Smart Booking Pro</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              AI-powered appointment scheduling system by Saroj Bon. Built with Claude AI 
              for intelligent automation and seamless booking experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/smartbookingpro" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/company/smartbookingpro" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/smartbookingpro" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:support@smartbookingpro.com" className="hover:text-white transition-colors">
                  support@smartbookingpro.com
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+1-555-0123" className="hover:text-white transition-colors">
                  +1 (555) 012-3456
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Business Ave, Suite 100<br />Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Smart Booking Pro. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <a href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="/gdpr" className="text-gray-400 hover:text-white transition-colors">
                GDPR
              </a>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="border-t border-gray-800 mt-4 pt-4">
          <div className="text-xs text-gray-500 text-center">
            <p>
              Smart Booking Pro uses Claude AI technology for intelligent appointment scheduling. 
              By using our service, you agree to our Terms of Service and Privacy Policy. 
              Your data is protected under GDPR and other applicable privacy laws.
            </p>
            <p className="mt-2">
              AI-powered by Anthropic Claude. Email delivery via Gmail. Hosted on Railway & Vercel.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 