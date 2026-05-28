import React from "react";
import { ArrowRight, ShoppingCart, BarChart3, Package } from "lucide-react";
import Link from "next/link";

function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    🚀 New Features Available
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                  Manage Your Grocery Store with Ease
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Amar Dokan is the all-in-one billing and inventory management
                  solution for modern grocery stores. Streamline operations,
                  boost sales, and grow your business faster.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
                <Link href="/service">
                  <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto">
                    Learn More
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-4">
                  Trusted by 500+ grocery stores
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <p className="font-semibold text-slate-900">4.9/5</p>
                      <p className="text-sm text-slate-600">Rating</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🛡️</span>
                    <div>
                      <p className="font-semibold text-slate-900">Secure</p>
                      <p className="text-sm text-slate-600">Bank-Level</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="font-semibold text-slate-900">99.9%</p>
                      <p className="text-sm text-slate-600">Uptime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Feature Cards / Illustration */}
            <div className="space-y-6">
              {/* Main Feature Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <ShoppingCart className="text-blue-600" size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Smart Billing
                    </h3>
                    <p className="text-sm text-slate-600">Fast & Accurate</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  Process transactions in seconds with our intelligent billing
                  system. Generate professional receipts instantly.
                </p>
                <div className="flex items-center text-blue-600 font-semibold cursor-pointer hover:gap-2 transition-all gap-1">
                  Explore <ArrowRight size={18} />
                </div>
              </div>

              {/* Secondary Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="p-3 bg-white rounded-lg w-fit mb-3">
                    <Package className="text-green-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    Inventory
                  </h4>
                  <p className="text-xs text-slate-600">Real-time tracking</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="p-3 bg-white rounded-lg w-fit mb-3">
                    <BarChart3 className="text-purple-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    Analytics
                  </h4>
                  <p className="text-xs text-slate-600">Data-driven insights</p>
                </div>
              </div>

              {/* Stats Box */}
              <div className="bg-slate-900 text-white rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">50+</p>
                    <p className="text-sm text-gray-400">Active Stores</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1M+</p>
                    <p className="text-sm text-gray-400">Transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave/Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Features Section Below Hero */}
      <div className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
            Why Choose Amar Dokan?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-100 rounded-full mb-6">
                <ShoppingCart className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Easy to Use
              </h3>
              <p className="text-slate-600">
                Intuitive interface that requires minimal training. Your staff
                will be productive from day one.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
                <BarChart3 className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Real-time Analytics
              </h3>
              <p className="text-slate-600">
                Get instant insights into your sales, inventory, and business
                metrics whenever you need them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex p-4 bg-purple-100 rounded-full mb-6">
                <Package className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Smart Inventory
              </h3>
              <p className="text-slate-600">
                Automatic stock tracking and low-stock alerts help you never
                miss a sale or overstock.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
