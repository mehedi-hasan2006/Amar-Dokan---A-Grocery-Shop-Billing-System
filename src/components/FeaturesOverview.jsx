import React from "react";
import {
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Receipt,
  Settings,
} from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Smart Billing",
    description:
      "Fast, accurate billing system with automatic calculations and professional receipts.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Real-time stock tracking with automated low-stock alerts and reorder suggestions.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive reports on sales, revenue, and business metrics in real-time.",
  },
  {
    icon: Receipt,
    title: "Invoice Management",
    description:
      "Create, manage, and track invoices with detailed billing history and payment tracking.",
  },
  {
    icon: Users,
    title: "User Management",
    description:
      "Manage staff accounts with role-based access control and activity tracking.",
  },
  {
    icon: Settings,
    title: "System Configuration",
    description:
      "Customize store settings, tax rates, and business rules to match your needs.",
  },
];

function FeaturesOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Powerful Features Built for Your Success
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to manage your grocery store efficiently in one
            comprehensive platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 inline-flex p-3 bg-blue-100 group-hover:bg-blue-600 rounded-lg transition-colors">
                  <Icon
                    className="text-blue-600 group-hover:text-white"
                    size={28}
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesOverview;
