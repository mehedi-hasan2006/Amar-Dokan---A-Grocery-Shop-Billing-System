import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Amar Dokan</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering grocery store owners with intelligent billing and
              inventory management solutions.
            </p>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="#"
                className="inline-flex p-2 bg-slate-800 hover:bg-blue-600 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="#"
                className="inline-flex p-2 bg-slate-800 hover:bg-blue-600 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="inline-flex p-2 bg-slate-800 hover:bg-blue-600 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="inline-flex p-2 bg-slate-800 hover:bg-blue-600 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/service"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-12"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-blue-400" />
              <a
                href="mailto:support@amardokan.com"
                className="hover:text-white transition-colors"
              >
                support@amardokan.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-blue-400" />
              <a
                href="tel:+8801234567890"
                className="hover:text-white transition-colors"
              >
                +880 1234 567890
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-blue-400" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Subscribe to Updates
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest features and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="px-3 py-1 bg-slate-800 hover:bg-blue-600 rounded-full text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-3 py-1 bg-slate-800 hover:bg-blue-600 rounded-full text-sm transition-colors"
              >
                About
              </Link>
              <Link
                href="/service"
                className="px-3 py-1 bg-slate-800 hover:bg-blue-600 rounded-full text-sm transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="px-3 py-1 bg-slate-800 hover:bg-blue-600 rounded-full text-sm transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-slate-700 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Amar Dokan. All rights reserved.
            </p>
            <p>Made with ❤️ for grocery store owners</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Status
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
