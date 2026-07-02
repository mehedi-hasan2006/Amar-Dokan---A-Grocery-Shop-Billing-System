"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ShoppingCart, BarChart3, Package, Users, Shield, Zap, Star, TrendingUp, CheckCircle } from "lucide-react";
import Link from "next/link";

function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: Star, value: "4.9/5", label: "Rating", color: "text-yellow-500" },
    { icon: Shield, value: "Secure", label: "Bank-Level", color: "text-emerald-500" },
    { icon: Zap, value: "99.9%", label: "Uptime", color: "text-blue-500" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light mode blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-30 animate-pulse" style={{ animationDelay: "4s" }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6TTYwIDM0djItSDQwdi0yaDIwek0yNCAyNHYySDB2LTJoMjR6TTYwIDI0djJIMjh2LTJoMzJ6TTEyIDE0djJIMHYtMmgxMnpNNjAgMTR2MkgxNnYtMmg0NHpNNDggNHYySDBWNGg0OHpNNjAgNHYySDUyVjRoOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 dark:opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    New Features Available
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                  Manage Your{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Grocery Store
                  </span>{" "}
                  with Ease
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  Amar Dokan is the all-in-one billing and inventory management
                  solution for modern grocery stores. Streamline operations,
                  boost sales, and grow your business faster.
                </p>

                {/* Feature Checklist */}
                <div className="flex flex-wrap gap-4">
                  {["Real-time Inventory", "Smart Billing", "Analytics Dashboard", "24/7 Support"].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 w-full sm:w-auto overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Free
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>
                </Link>
                <Link href="/service">
                  <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto hover:bg-gray-50 dark:hover:bg-gray-800">
                    Learn More
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  Trusted by 500+ grocery stores across Bangladesh
                </p>
                <div className="flex flex-wrap gap-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Feature Cards / Illustration */}
            <div className="space-y-6">
              {/* Main Feature Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-800 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25">
                    <ShoppingCart className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Smart Billing
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fast & Accurate</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Process transactions in seconds with our intelligent billing
                  system. Generate professional receipts instantly.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>500+ active users</span>
                  </div>
                  <Link href="/dashboard" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:gap-2 transition-all group">
                    Try it now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Secondary Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-xl w-fit mb-4 shadow-sm">
                    <Package className="text-emerald-600 dark:text-emerald-400" size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                    Inventory
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real-time tracking & alerts</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-xl w-fit mb-4 shadow-sm">
                    <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                    Analytics
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Data-driven insights</p>
                </div>
              </div>

              {/* Stats Box */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">50+</p>
                    <p className="text-xs text-gray-400">Active Stores</p>
                  </div>
                  <div className="space-y-1 border-x border-gray-700">
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">1M+</p>
                    <p className="text-xs text-gray-400">Transactions</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24/7</p>
                    <p className="text-xs text-gray-400">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent"></div>
      </div>

      {/* Features Section Below Hero */}
      <div className="relative z-10 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Amar Dokan
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to run your grocery store efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="group text-center p-8 rounded-2xl hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex p-5 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Easy to Use
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Intuitive interface that requires minimal training. Your staff
                will be productive from day one.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-8 rounded-2xl hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex p-5 bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/30 dark:to-green-800/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="text-emerald-600 dark:text-emerald-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Real-time Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Get instant insights into your sales, inventory, and business
                metrics whenever you need them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-8 rounded-2xl hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex p-5 bg-gradient-to-br from-purple-100 to-violet-200 dark:from-purple-900/30 dark:to-violet-800/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Package className="text-purple-600 dark:text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Smart Inventory
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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