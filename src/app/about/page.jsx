import React from "react";
import { Target, Lightbulb, Users, Award, Zap, TrendingUp } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Mehedi Hasan",
    role: "Founder & Lead Developer",
    image: "👨‍💼",
    bio: "Tech entrepreneur with passion for retail solutions",
  },
  {
    id: 2,
    name: "Development Team",
    role: "Full Stack Engineers",
    image: "👨‍💻",
    bio: "Expert developers building scalable solutions",
  },
  {
    id: 3,
    name: "Support Team",
    role: "Customer Success",
    image: "👩‍💼",
    bio: "Dedicated to ensuring your success",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly innovating to provide cutting-edge solutions for grocery management",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "Your success is our priority. We listen and adapt to your needs",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "Streamline operations and maximize productivity with our solutions",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Delivering high-quality, reliable software you can trust",
  },
];

const stats = [
  { number: "500+", label: "Happy Users" },
  { number: "50+", label: "Stores Using Our System" },
  { number: "1M+", label: "Transactions Processed" },
  { number: "99.9%", label: "System Uptime" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            About Amar Dokan
          </h1>
          <p className="text-lg text-slate-600">
            Revolutionizing grocery store management with intelligent,
            user-friendly solutions. Built to help businesses like yours
            succeed.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Our Story
            </h2>
            <p className="text-slate-600 mb-4">
              Amar Dokan started with a simple vision: to empower grocery store
              owners with technology that makes their lives easier. We noticed
              that many small and medium-sized grocery stores struggled with
              outdated billing and inventory systems.
            </p>
            <p className="text-slate-600 mb-4">
              In 2024, we decided to build a modern, comprehensive solution
              tailored specifically for grocery management. Today, we&apos;re
              proud to serve hundreds of stores across the region.
            </p>
            <p className="text-slate-600">
              Our commitment remains unchanged: deliver exceptional software
              that helps you grow your business while saving time and money.
            </p>
          </div>
          <div className="bg-linear-to-br from-blue-100 to-indigo-100 rounded-lg h-72 flex items-center justify-center">
            <div className="text-6xl">🏪</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <Target className="text-blue-600 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-slate-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-slate-600">
                To provide affordable, reliable, and easy-to-use billing and
                inventory management solutions that help grocery stores of all
                sizes streamline their operations and grow their business.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-indigo-600">
              <div className="flex items-center mb-4">
                <TrendingUp className="text-indigo-600 mr-3" size={28} />
                <h3 className="text-2xl font-bold text-slate-900">
                  Our Vision
                </h3>
              </div>
              <p className="text-slate-600">
                To become the most trusted and widely-used grocery management
                platform in the region, empowering store owners with insights
                and automation that drive business growth and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div key={idx} className="text-center">
                <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <div className="bg-linear-to-r from-blue-500 to-indigo-600 h-32 flex items-center justify-center">
                <div className="text-6xl">{member.image}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-slate-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Choose Amar Dokan?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Purpose-Built for Groceries
                </h4>
                <p className="text-slate-600">
                  Specifically designed for grocery stores, understanding the
                  unique challenges you face daily.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Easy to Use
                </h4>
                <p className="text-slate-600">
                  Intuitive interface that requires minimal training. Your staff
                  will be productive from day one.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Affordable Pricing
                </h4>
                <p className="text-slate-600">
                  Transparent pricing with no hidden fees. Start small and scale
                  as your business grows.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Dedicated Support
                </h4>
                <p className="text-slate-600">
                  Our support team is here to help you succeed. Get answers to
                  your questions quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Join Hundreds of Happy Store Owners
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Experience the difference a purpose-built grocery management system
            can make for your business.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors mr-4">
            Get Started Today
          </button>
          <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
