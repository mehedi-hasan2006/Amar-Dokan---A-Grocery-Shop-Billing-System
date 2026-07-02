import React from "react";
import {
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Receipt,
  Settings,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Smart Billing",
    description:
      "Fast, accurate billing system with automatic calculations and professional receipts.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient:
      "from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40",
    iconBg:
      "bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-600 dark:group-hover:bg-blue-500",
    iconColor: "text-blue-600 dark:text-blue-400 group-hover:text-white",
    borderHover: "hover:border-blue-300 dark:hover:border-blue-700",
    stat: "2x faster checkout",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Real-time stock tracking with automated low-stock alerts and reorder suggestions.",
    gradient: "from-emerald-500 to-green-500",
    bgGradient:
      "from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40",
    iconBg:
      "bg-emerald-100 dark:bg-emerald-900/50 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500",
    iconColor: "text-emerald-600 dark:text-emerald-400 group-hover:text-white",
    borderHover: "hover:border-emerald-300 dark:hover:border-emerald-700",
    stat: "Real-time updates",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive reports on sales, revenue, and business metrics in real-time.",
    gradient: "from-purple-500 to-violet-500",
    bgGradient:
      "from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40",
    iconBg:
      "bg-purple-100 dark:bg-purple-900/50 group-hover:bg-purple-600 dark:group-hover:bg-purple-500",
    iconColor: "text-purple-600 dark:text-purple-400 group-hover:text-white",
    borderHover: "hover:border-purple-300 dark:hover:border-purple-700",
    stat: "50+ reports",
  },
  {
    icon: Receipt,
    title: "Invoice Management",
    description:
      "Create, manage, and track invoices with detailed billing history and payment tracking.",
    gradient: "from-orange-500 to-amber-500",
    bgGradient:
      "from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40",
    iconBg:
      "bg-orange-100 dark:bg-orange-900/50 group-hover:bg-orange-600 dark:group-hover:bg-orange-500",
    iconColor: "text-orange-600 dark:text-orange-400 group-hover:text-white",
    borderHover: "hover:border-orange-300 dark:hover:border-orange-700",
    stat: "Professional invoices",
  },
  {
    icon: Users,
    title: "User Management",
    description:
      "Manage staff accounts with role-based access control and activity tracking.",
    gradient: "from-pink-500 to-rose-500",
    bgGradient:
      "from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40",
    iconBg:
      "bg-pink-100 dark:bg-pink-900/50 group-hover:bg-pink-600 dark:group-hover:bg-pink-500",
    iconColor: "text-pink-600 dark:text-pink-400 group-hover:text-white",
    borderHover: "hover:border-pink-300 dark:hover:border-pink-700",
    stat: "Role-based access",
  },
  {
    icon: Settings,
    title: "System Configuration",
    description:
      "Customize store settings, tax rates, and business rules to match your needs.",
    gradient: "from-indigo-500 to-blue-500",
    bgGradient:
      "from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40",
    iconBg:
      "bg-indigo-100 dark:bg-indigo-900/50 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500",
    iconColor: "text-indigo-600 dark:text-indigo-400 group-hover:text-white",
    borderHover: "hover:border-indigo-300 dark:hover:border-indigo-700",
    stat: "Fully customizable",
  },
];

function FeaturesOverview() {
  return (
    <section className="relative py-24 lg:py-32 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/3 to-purple-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Scale Your Business
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive platform designed to streamline your grocery store
            operations, boost efficiency, and drive growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`group relative p-6 lg:p-8 bg-gradient-to-br ${feature.bgGradient} rounded-2xl border border-gray-200 dark:border-gray-800 ${feature.borderHover} hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Gradient Border on Hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Icon */}
                <div
                  className={`relative mb-6 inline-flex p-3.5 ${feature.iconBg} rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                >
                  <Icon
                    className={`w-7 h-7 ${feature.iconColor} transition-colors duration-300`}
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                    style={{
                      backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Stat Badge */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {feature.stat}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-[0.03] rounded-bl-full pointer-events-none`}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-3 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
            <div className="flex items-center gap-2 px-4 py-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Trusted by 500+ grocery stores
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2 px-4 py-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                99.9% uptime guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesOverview;
