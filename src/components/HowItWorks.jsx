import React from "react";
import { Zap, Cog, BarChart3, Rocket } from "lucide-react";

const steps = [
  {
    icon: Zap,
    number: "01",
    title: "Quick Setup",
    description:
      "Sign up and set up your store in minutes. Our onboarding team guides you through every step.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Cog,
    number: "02",
    title: "Configure",
    description:
      "Customize your settings, add products, and configure your store preferences to your needs.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Start Selling",
    description:
      "Begin processing transactions and managing inventory with our intuitive dashboard.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Grow Your Business",
    description:
      "Use analytics to optimize operations and scale your store with data-driven insights.",
    color: "bg-orange-100 text-orange-600",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get started in four simple steps. You'll be up and running in no
            time.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative">
                {/* Step Card */}
                <div className="text-center">
                  {/* Icon Circle */}
                  <div className="mb-6 flex justify-center">
                    <div className={`${step.color} p-4 rounded-full w-fit`}>
                      <Icon size={32} />
                    </div>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (hidden on mobile, shown on md and up) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[calc(100%-20%)] h-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 mb-6">Ready to get started?</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl">
            Start Free Trial Today
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
