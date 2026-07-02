"use client";

import React, { useState } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  Building2,
  Shield,
} from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Hassan",
    store: "Hassan's Grocery",
    location: "Dhaka",
    avatar: "AH",
    avatarGradient: "from-blue-500 to-cyan-500",
    rating: 5,
    text: "Amar Dokan has transformed how I manage my store. The billing system is incredibly fast and the inventory tracking saved me thousands in waste. Highly recommended!",
    highlight: "Saved hours every day",
    highlightColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    name: "Fatima Rahman",
    store: "Rainbow Supermarket",
    location: "Chattogram",
    avatar: "FR",
    avatarGradient: "from-purple-500 to-pink-500",
    rating: 5,
    text: "The best investment for our grocery store! Staff training was seamless, and the analytics dashboard gives us insights we never had before. Customer support is fantastic.",
    highlight: "Increased efficiency by 40%",
    highlightColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
  {
    name: "Mohammad Islam",
    store: "Green Valley Mart",
    location: "Sylhet",
    avatar: "MI",
    avatarGradient: "from-emerald-500 to-green-500",
    rating: 5,
    text: "Simple, reliable, and affordable. We switched from a legacy system and couldn't be happier. The mobile app is perfect for checking inventory on the go.",
    highlight: "Easy migration process",
    highlightColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  {
    name: "Noor Alam",
    store: "Fresh Picks Groceries",
    location: "Khulna",
    avatar: "NA",
    avatarGradient: "from-orange-500 to-amber-500",
    rating: 5,
    text: "Outstanding platform! The automated reports help us make better business decisions. The system is stable with 99.9% uptime - exactly what we need.",
    highlight: "Never missed a sale",
    highlightColor:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  },
];

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Happy Customers",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Building2,
    value: "50+",
    label: "Active Stores",
    gradient: "from-emerald-500 to-green-500",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Autoplay
  React.useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [autoplay, currentIndex]);

  return (
    <section className="relative py-24 lg:py-32 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/3 to-purple-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/50 dark:to-yellow-950/50 border border-amber-200 dark:border-amber-800 rounded-full mb-6">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Customer Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Loved by{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Store Owners
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our customers have to
            say about Amar Dokan.
          </p>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mb-16">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                "{testimonial.text}"
              </p>

              {/* Highlight Badge */}
              <div
                className={`mb-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${testimonial.highlightColor}`}
              >
                {testimonial.highlight}
              </div>

              {/* Author Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${testimonial.avatarGradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.store}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel - Mobile/Tablet */}
        <div className="lg:hidden mb-16">
          <div className="relative">
            {/* Carousel Card */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 min-h-[300px]">
              <div className="mb-4">
                <Quote className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              </div>

              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
                "{testimonials[currentIndex].text}"
              </p>

              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-6 ${testimonials[currentIndex].highlightColor}`}
              >
                {testimonials[currentIndex].highlight}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonials[currentIndex].avatarGradient} flex items-center justify-center text-white font-bold shadow-lg`}
                  >
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonials[currentIndex].store}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => {
                prevTestimonial();
                setAutoplay(false);
              }}
              className="absolute top-1/2 -left-4 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={() => {
                nextTestimonial();
                setAutoplay(false);
              }}
              className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setAutoplay(false);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 h-2 bg-gray-900 dark:bg-white"
                    : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join hundreds of satisfied store owners
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {["AH", "FR", "MI", "NA"].map((initials, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                    [
                      "from-blue-500 to-cyan-500",
                      "from-purple-500 to-pink-500",
                      "from-emerald-500 to-green-500",
                      "from-orange-500 to-amber-500",
                    ][idx]
                  } border-2 border-white dark:border-gray-950 flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {initials}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-950 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-gray-400">
                +47
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              and many more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
