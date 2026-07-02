import React from "react";
import { 
  Target, 
  Lightbulb, 
  Users, 
  Award, 
  Zap, 
  TrendingUp,
  ArrowRight,
  Star,
  Shield,
  Heart,
  Sparkles,
  Globe,
  Coffee,
  Rocket,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const teamMembers = [
  {
    id: 1,
    name: "Mehedi Hasan",
    role: "Founder & Lead Developer",
    bio: "Tech entrepreneur with passion for retail solutions",
    gradient: "from-blue-500 to-cyan-500",
    emoji: "👨‍💼",
  },
  {
    id: 2,
    name: "Development Team",
    role: "Full Stack Engineers",
    bio: "Expert developers building scalable solutions",
    gradient: "from-purple-500 to-pink-500",
    emoji: "👨‍💻",
  },
  {
    id: 3,
    name: "Support Team",
    role: "Customer Success",
    bio: "Dedicated to ensuring your success",
    gradient: "from-emerald-500 to-green-500",
    emoji: "👩‍💼",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly innovating to provide cutting-edge solutions for grocery management",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your success is our priority. We listen and adapt to your needs",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Streamline operations and maximize productivity with our solutions",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Delivering high-quality, reliable software you can trust",
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40",
  },
];

const stats = [
  { number: "500+", label: "Happy Users", icon: Users, gradient: "from-blue-500 to-cyan-500" },
  { number: "50+", label: "Active Stores", icon: Globe, gradient: "from-purple-500 to-pink-500" },
  { number: "1M+", label: "Transactions", icon: Zap, gradient: "from-amber-500 to-orange-500" },
  { number: "99.9%", label: "Uptime", icon: Shield, gradient: "from-emerald-500 to-green-500" },
];

const whyChooseUs = [
  {
    title: "Purpose-Built for Groceries",
    description: "Specifically designed for grocery stores, understanding the unique challenges you face daily.",
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Easy to Use",
    description: "Intuitive interface that requires minimal training. Your staff will be productive from day one.",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Affordable Pricing",
    description: "Transparent pricing with no hidden fees. Start small and scale as your business grows.",
    icon: Heart,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Dedicated Support",
    description: "Our support team is here to help you succeed. Get answers to your questions quickly.",
    icon: Coffee,
    gradient: "from-emerald-500 to-green-500",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Story
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Amar Dokan
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing grocery store management with intelligent,
            user-friendly solutions. Built to help businesses like yours
            succeed.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-4 py-8 lg:py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Amar Dokan started with a simple vision: to empower grocery store
                owners with technology that makes their lives easier. We noticed
                that many small and medium-sized grocery stores struggled with
                outdated billing and inventory systems.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                In 2024, we decided to build a modern, comprehensive solution
                tailored specifically for grocery management. Today, we're
                proud to serve hundreds of stores across the region.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our commitment remains unchanged: deliver exceptional software
                that helps you grow your business while saving time and money.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl flex items-center justify-center overflow-hidden border border-blue-200 dark:border-blue-800">
              <div className="text-8xl lg:text-9xl">🏪</div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To provide affordable, reliable, and easy-to-use billing and
                inventory management solutions that help grocery stores of all
                sizes streamline their operations and grow their business.
              </p>
            </div>

            {/* Vision */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To become the most trusted and widely-used grocery management
                platform in the region, empowering store owners with insights
                and automation that drive business growth and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-4 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div
                key={idx}
                className={`group bg-gradient-to-br ${value.bgGradient} rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 lg:py-24 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              By The Numbers
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our growing community speaks for itself
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The passionate people behind Amar Dokan
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`h-32 bg-gradient-to-r ${member.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {member.emoji}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}>
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Amar Dokan?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              What sets us apart from the rest
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="group flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-3xl p-8 lg:p-12 border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Have questions? We'd love to hear from you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">support@amardokan.com</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl">
                <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Dhaka, Bangladesh</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 font-semibold rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;