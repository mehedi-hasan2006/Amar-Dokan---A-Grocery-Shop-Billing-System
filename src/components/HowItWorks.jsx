import React from "react";
import { Zap, Cog, BarChart3, Rocket, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Zap,
    number: "01",
    title: "Quick Setup",
    description:
      "Sign up and set up your store in minutes. Our onboarding team guides you through every step.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    iconColor: "text-white",
    borderColor: "border-blue-200 dark:border-blue-800",
    numberBg: "bg-gradient-to-br from-blue-600 to-cyan-600",
  },
  {
    icon: Cog,
    number: "02",
    title: "Configure",
    description:
      "Customize your settings, add products, and configure your store preferences to your needs.",
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    iconColor: "text-white",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    numberBg: "bg-gradient-to-br from-emerald-600 to-green-600",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Start Selling",
    description:
      "Begin processing transactions and managing inventory with our intuitive dashboard.",
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    iconColor: "text-white",
    borderColor: "border-purple-200 dark:border-purple-800",
    numberBg: "bg-gradient-to-br from-purple-600 to-violet-600",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Grow Your Business",
    description:
      "Use analytics to optimize operations and scale your store with data-driven insights.",
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
    iconColor: "text-white",
    borderColor: "border-orange-200 dark:border-orange-800",
    numberBg: "bg-gradient-to-br from-orange-600 to-amber-600",
  },
];

function HowItWorks() {
  return (
    <section className="relative py-24 lg:py-32 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simple Process
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Get started in four simple steps. You'll be up and running in no
            time with our streamlined onboarding process.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-[10%] right-[10%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300 dark:from-blue-700 dark:via-purple-700 dark:to-orange-700 rounded-full" />
          </div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                {/* Step Card */}
                <div
                  className={`relative bg-gradient-to-br ${step.bgGradient} rounded-2xl p-6 lg:p-8 border ${step.borderColor} hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-2 h-full`}
                >
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />

                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 z-10">
                    <div className={`w-12 h-12 ${step.numberBg} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`mb-6 w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className={`w-8 h-8 ${step.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" 
                    style={{ 
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Step Indicator Dots */}
                  <div className="flex items-center gap-1.5 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    {[...Array(4)].map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          dotIdx === idx
                            ? "bg-gray-900 dark:bg-white w-6"
                            : dotIdx < idx
                            ? "bg-gray-300 dark:bg-gray-600"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Arrow Connector (Tablet/Mobile alternative) */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Ready to Transform Your Store?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                  Join hundreds of grocery store owners who have already streamlined their operations with Amar Dokan.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {["Free 14-day trial", "No credit card required", "24/7 support"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/register">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 whitespace-nowrap">
                    Start Free Trial
                    <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/demo">
                  <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold rounded-xl transition-all duration-300 whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-800">
                    Watch Demo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;