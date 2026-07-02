"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Receipt,
  Package,
  BarChart3,
  Users,
  Settings,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  Star,
  Sparkles,
  CheckCircle2,
  Globe,
  Headphones,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "Billing Service",
    description:
      "Fast and efficient billing system for quick checkout. Generate itemized receipts and manage transactions with ease.",
    features: ["Quick checkout", "Itemized receipts", "Payment tracking"],
    gradient: "from-blue-500 to-cyan-500",
    bgGradient:
      "from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40",
    borderHover: "hover:border-blue-300 dark:hover:border-blue-700",
  },
  {
    id: 2,
    icon: Receipt,
    title: "Invoice Management",
    description:
      "Create, manage, and track invoices. Generate detailed reports and maintain billing history.",
    features: ["Invoice generation", "Billing history", "Payment tracking"],
    gradient: "from-purple-500 to-pink-500",
    bgGradient:
      "from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40",
    borderHover: "hover:border-purple-300 dark:hover:border-purple-700",
  },
  {
    id: 3,
    icon: Package,
    title: "Inventory Management",
    description:
      "Real-time stock tracking and management. Monitor product quantities and manage low stock alerts.",
    features: ["Stock tracking", "Low stock alerts", "Product categorization"],
    gradient: "from-emerald-500 to-green-500",
    bgGradient:
      "from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40",
    borderHover: "hover:border-emerald-300 dark:hover:border-emerald-700",
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Comprehensive reports on sales, revenue, and inventory. Visualize business metrics with detailed analytics.",
    features: ["Sales reports", "Revenue analysis", "Inventory insights"],
    gradient: "from-amber-500 to-orange-500",
    bgGradient:
      "from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40",
    borderHover: "hover:border-amber-300 dark:hover:border-amber-700",
  },
  {
    id: 5,
    icon: Users,
    title: "User Management",
    description:
      "Manage staff and customer information. Control access levels and user permissions.",
    features: ["Staff management", "Access control", "User profiles"],
    gradient: "from-pink-500 to-rose-500",
    bgGradient:
      "from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40",
    borderHover: "hover:border-pink-300 dark:hover:border-pink-700",
  },
  {
    id: 6,
    icon: Settings,
    title: "System Configuration",
    description:
      "Configure store settings, tax rates, and business rules. Customize the system to your needs.",
    features: ["Store settings", "Tax configuration", "Business rules"],
    gradient: "from-indigo-500 to-blue-500",
    bgGradient:
      "from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40",
    borderHover: "hover:border-indigo-300 dark:hover:border-indigo-700",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Time Efficient",
    description: "Automate processes and reduce manual work by up to 80%",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Protect your data with 256-bit encryption and secure authentication",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Insights",
    description: "Make informed business decisions with real-time analytics",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance whenever you need help",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "Cloud-Based",
    description: "Access your data from anywhere, anytime on any device",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Process transactions in milliseconds with optimized performance",
    gradient: "from-rose-500 to-pink-500",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "৳2,999",
    period: "/month",
    description: "Perfect for small shops",
    features: [
      "Basic billing",
      "Simple inventory",
      "Daily reports",
      "Email support",
    ],
    gradient: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    name: "Professional",
    price: "৳7,999",
    period: "/month",
    description: "Best for growing stores",
    features: [
      "Advanced billing",
      "Full inventory",
      "Analytics dashboard",
      "Priority support",
      "Multi-user access",
    ],
    gradient: "from-purple-500 to-pink-500",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large chains",
    features: [
      "Custom solutions",
      "Unlimited users",
      "API access",
      "Dedicated support",
      "Custom integration",
    ],
    gradient: "from-amber-500 to-orange-500",
    popular: false,
  },
];

function ServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to run your grocery store efficiently. From
            billing to inventory management, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Core Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed for modern grocery management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`group bg-gradient-to-br ${service.bgGradient} rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-800 ${service.borderHover} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all group/link"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Benefits that make a difference in your daily operations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Flexible Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all duration-300 ${
                plan.popular
                  ? "border-purple-500 shadow-2xl shadow-purple-500/20 scale-105 z-10"
                  : "border-gray-200 dark:border-gray-800 hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold py-1.5 px-6 rounded-full shadow-xl flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/register">
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                        : "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400"
                    }`}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 lg:py-24 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Store?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of grocery store owners who have already streamlined
            their operations with Amar Dokan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full sm:w-auto px-8 py-4 border-2 border-gray-500 text-gray-300 hover:border-white hover:text-white font-semibold rounded-xl transition-all duration-300">
                Talk to Sales
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicePage;
