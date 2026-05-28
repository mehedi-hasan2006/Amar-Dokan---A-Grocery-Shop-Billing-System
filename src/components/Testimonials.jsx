import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Hassan",
    store: "Hassan's Grocery",
    location: "Dhaka",
    image: "👨‍💼",
    rating: 5,
    text: "Amar Dokan has transformed how I manage my store. The billing system is incredibly fast and the inventory tracking saved me thousands in waste. Highly recommended!",
    highlight: "Saved hours every day",
  },
  {
    name: "Fatima Rahman",
    store: "Rainbow Supermarket",
    location: "Chattogram",
    image: "👩‍💼",
    rating: 5,
    text: "The best investment for our grocery store! Staff training was seamless, and the analytics dashboard gives us insights we never had before. Customer support is fantastic.",
    highlight: "Increased efficiency by 40%",
  },
  {
    name: "Mohammad Islam",
    store: "Green Valley Mart",
    location: "Sylhet",
    image: "👨‍🔧",
    rating: 5,
    text: "Simple, reliable, and affordable. We switched from a legacy system and couldn't be happier. The mobile app is perfect for checking inventory on the go.",
    highlight: "Easy migration process",
  },
  {
    name: "Noor Alam",
    store: "Fresh Picks Groceries",
    location: "Khulna",
    image: "👨‍💻",
    rating: 5,
    text: "Outstanding platform! The automated reports help us make better business decisions. The system is stable with 99.9% uptime - exactly what we need.",
    highlight: "Never missed a sale",
  },
];

function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Loved by Grocery Store Owners
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See what our customers are saying about Amar Dokan
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-700 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Highlight Badge */}
              <div className="mb-4 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {testimonial.highlight}
              </div>

              {/* Author Info */}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-600">
                      {testimonial.store}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-blue-50 rounded-xl p-8">
          <div>
            <p className="text-3xl font-bold text-blue-600 mb-2">500+</p>
            <p className="text-slate-600">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600 mb-2">4.9/5</p>
            <p className="text-slate-600">Average Rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600 mb-2">50+</p>
            <p className="text-slate-600">Active Stores</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
