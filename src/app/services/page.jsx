import React from "react";
import {
  ShoppingCart,
  Receipt,
  Package,
  BarChart3,
  Users,
  Settings,
  Clock,
  Shield,
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "Billing Service",
    description:
      "Fast and efficient billing system for quick checkout. Generate itemized receipts and manage transactions with ease.",
    features: ["Quick checkout", "Itemized receipts", "Payment tracking"],
  },
  {
    id: 2,
    icon: Receipt,
    title: "Invoice Management",
    description:
      "Create, manage, and track invoices. Generate detailed reports and maintain billing history.",
    features: ["Invoice generation", "Billing history", "Payment tracking"],
  },
  {
    id: 3,
    icon: Package,
    title: "Inventory Management",
    description:
      "Real-time stock tracking and management. Monitor product quantities and manage low stock alerts.",
    features: ["Stock tracking", "Low stock alerts", "Product categorization"],
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Comprehensive reports on sales, revenue, and inventory. Visualize business metrics with detailed analytics.",
    features: ["Sales reports", "Revenue analysis", "Inventory insights"],
  },
  {
    id: 5,
    icon: Users,
    title: "User Management",
    description:
      "Manage staff and customer information. Control access levels and user permissions.",
    features: ["Staff management", "Access control", "User profiles"],
  },
  {
    id: 6,
    icon: Settings,
    title: "System Configuration",
    description:
      "Configure store settings, tax rates, and business rules. Customize the system to your needs.",
    features: ["Store settings", "Tax configuration", "Business rules"],
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Time Efficient",
    description: "Automate processes and reduce manual work",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Protect your data with secure authentication",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    description: "Make informed decisions with analytics",
  },
];

function ServicePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Header Section */}
      <section className="px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Services
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Comprehensive grocery management solutions designed to streamline
            your business operations and maximize efficiency.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Core Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-slate-100"
              >
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-blue-100 rounded-lg">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-slate-600"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex p-4 bg-white rounded-full mb-4 shadow-sm">
                    <Icon className="text-blue-600" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Experience the power of our comprehensive grocery management system.
            Start managing your store efficiently today.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default ServicePage;
