import React from "react";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "৳2,999",
    period: "/month",
    description: "Perfect for small shops just starting out",
    badge: null,
    cta: "Get Started",
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
    features: [
      { name: "Up to 20 Staff Members", included: true },
      { name: "Advanced Billing System", included: true },
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
    features: [
      { name: "Unlimited Staff Members", included: true },
      { name: "Custom Billing Solutions", included: true },
      { name: "Enterprise Inventory System", included: true },
      { name: "Real-time Reports & Dashboards", included: true },
      { name: "24/7 Dedicated Support", included: true },
      { name: "Advanced Analytics & AI Insights", included: true },
      { name: "Multi-Store Support", included: true },
      { name: "API Access & Custom Integration", included: true },
    ],
  },
];

function PricingPlans() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your grocery store. No hidden fees,
            cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl transition-all duration-300 ${
                plan.badge
                  ? "ring-2 ring-blue-600 shadow-2xl scale-105 md:scale-105"
                  : "border border-slate-200 hover:shadow-lg"
              } ${plan.badge ? "bg-white" : "bg-white"}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="bg-blue-600 text-white text-sm font-semibold py-1 px-4 rounded-full inline-block mx-auto mb-4 transform -translate-y-2/4 absolute left-1/2 -translate-x-1/2">
                  {plan.badge}
                </div>
              )}

              {/* Plan Content */}
              <div className="p-8">
                {plan.badge && <div className="h-2"></div>}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </p>
                  <p className="text-slate-600 text-sm">{plan.period}</p>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all mb-8 ${
                    plan.badge
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                      : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check
                          className="text-green-600 flex-shrink-0"
                          size={20}
                        />
                      ) : (
                        <X className="text-slate-300 flex-shrink-0" size={20} />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-slate-700"
                            : "text-slate-400 line-through"
                        }
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ / Additional Info */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            All Plans Include:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="font-semibold text-slate-900">✓ Free Onboarding</p>
              <p className="text-sm text-slate-600">
                Setup guidance & training
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">✓ Mobile App</p>
              <p className="text-sm text-slate-600">iOS & Android included</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">✓ 99.9% Uptime</p>
              <p className="text-sm text-slate-600">Enterprise reliability</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                ✓ 14-Day Free Trial
              </p>
              <p className="text-sm text-slate-600">No credit card required</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;
