"use client";

import React, { useState } from "react";
import { Check, X, Sparkles, Shield, Zap, Star, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "৳2,999",
    period: "/month",
    description: "Perfect for small shops just starting out",
    badge: null,
    cta: "Get Started",
    href: "/register?plan=starter",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40",
    borderColor: "border-blue-200 dark:border-blue-800",
    buttonStyle: "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800",
    features: [
      { name: "Up to 5 Staff Members", included: true },
      { name: "Basic Billing System", included: true },
      { name: "Simple Inventory Management", included: true },
      { name: "Daily Reports", included: true },
      { name: "Email Support", included: true },
      { name: "Advanced Analytics", included: false },
      { name: "Multi-Store Support", included: false },
      { name: "API Access", included: false },
    ],
  },
  {
    name: "Professional",
    price: "৳7,999",
    period: "/month",
    description: "Best for growing grocery stores",
    badge: "Most Popular",
    cta: "Start Free Trial",
    href: "/register?plan=professional",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40",
    borderColor: "border-purple-200 dark:border-purple-800",
    buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/25",
    featured: true,
    features: [
      { name: "Up to 20 Staff Members", included: true, highlight: true },
      { name: "Advanced Billing System", included: true, highlight: true },
      { name: "Full Inventory Management", included: true },
      { name: "Hourly Reports & Analytics", included: true },
      { name: "Priority Email & Chat Support", included: true },
      { name: "Advanced Analytics Dashboard", included: true },
      { name: "Multi-Store Support", included: false },
      { name: "API Access", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Pricing",
    description: "For large chains and franchise networks",
    badge: null,
    cta: "Contact Sales",
    href: "/contact?plan=enterprise",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40",
    borderColor: "border-amber-200 dark:border-amber-800",
    buttonStyle: "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800",
    features: [
      { name: "Unlimited Staff Members", included: true, highlight: true },
      { name: "Custom Billing Solutions", included: true, highlight: true },
      { name: "Enterprise Inventory System", included: true },
      { name: "Real-time Reports & Dashboards", included: true },
      { name: "24/7 Dedicated Support", included: true },
      { name: "Advanced Analytics & AI Insights", included: true },
      { name: "Multi-Store Support", included: true },
      { name: "API Access & Custom Integration", included: true },
    ],
  },
];

const allPlanIncludes = [
  { icon: Shield, title: "Free Onboarding", description: "Setup guidance & training" },
  { icon: Zap, title: "Mobile App", description: "iOS & Android included" },
  { icon: Star, title: "99.9% Uptime", description: "Enterprise reliability" },
  { icon: Sparkles, title: "14-Day Free Trial", description: "No credit card required" },
];

function PricingPlans() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="relative py-24 lg:py-32 bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border border-purple-200 dark:border-purple-800 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Simple,{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your grocery store. No hidden fees,
            cancel anytime. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-4 p-1.5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isYearly
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isYearly
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20 items-start">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative group ${
                plan.featured ? "lg:-mt-4 lg:mb-4 z-10" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold py-2 px-6 rounded-full shadow-xl flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative bg-white dark:bg-gray-900 rounded-3xl border-2 transition-all duration-500 ${
                  plan.featured
                    ? "border-purple-500 dark:border-purple-500 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30"
                    : `${plan.borderColor} shadow-lg hover:shadow-xl`
                } hover:-translate-y-1 overflow-hidden`}
              >
                {/* Gradient Border for Featured */}
                {plan.featured && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 pointer-events-none" />
                )}

                <div className={`relative p-6 lg:p-8 bg-gradient-to-br ${plan.bgGradient}`}>
                  {/* Plan Name & Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        {isYearly && plan.price !== "Custom" 
                          ? `৳${(parseInt(plan.price.replace(/[^0-9]/g, "")) * 0.8).toLocaleString()}`
                          : plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-500 dark:text-gray-400 text-lg">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    {isYearly && plan.price !== "Custom" && (
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                        Save 20% with yearly billing
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link href={plan.href}>
                    <button
                      className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 mb-8 flex items-center justify-center gap-2 group/btn ${
                        plan.buttonStyle
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  {/* Features List */}
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      What's included
                    </p>
                    {plan.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? feature.highlight
                                ? "font-semibold text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                              : "text-gray-400 dark:text-gray-500 line-through"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Plans Include */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              All Plans Include
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Every plan comes with these essential features
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allPlanIncludes.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Have questions? Check our FAQ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;