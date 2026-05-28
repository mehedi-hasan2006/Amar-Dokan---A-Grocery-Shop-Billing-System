"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1234 567890",
    color: "text-blue-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@amardokan.com",
    color: "text-green-600",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "Dhaka, Bangladesh",
    color: "text-red-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Fri, 9 AM - 6 PM",
    color: "text-purple-600",
  },
];

const faqItems = [
  {
    question: "How long does it take to set up the system?",
    answer:
      "Most stores are up and running within 24-48 hours. Our onboarding team will guide you through every step.",
  },
  {
    question: "Do you offer training for staff?",
    answer:
      "Yes! We provide comprehensive training for your staff. This includes online sessions, video tutorials, and documentation.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including credit cards, bank transfers, and mobile payments.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial with full access to all features. No credit card required.",
  },
  {
    question: "What if I need technical support?",
    answer:
      "Our dedicated support team is available 24/7 to help you via email, phone, or live chat.",
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Absolutely! You can change your plan at any time without any cancellation fees or penalties.",
  },
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-lg text-slate-600">
            Have questions? We&apos;d love to hear from you. Send us a message and
            we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 text-center border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex p-3 bg-slate-100 rounded-full mb-4">
                  <Icon className={`${info.color}`} size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-slate-600 text-sm">{info.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="px-4 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h2>
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
                  <CheckCircle
                    className="text-green-600 mx-auto mb-4"
                    size={48}
                  />
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-700">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1234 567890"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Company/Store Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Store Name"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Find Us
              </h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-96 border border-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.6137878455567!2d90.40684!3d23.810331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c6d6d1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Office Hours
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 3:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="bg-white rounded-lg shadow-md border border-slate-100"
            >
              <summary className="px-6 py-4 font-semibold text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between">
                <span>{item.question}</span>
                <span className="text-blue-600">+</span>
              </summary>
              <div className="px-6 py-4 border-t border-slate-100 text-slate-600">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Additional Support */}
      <section className="px-4 py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
          <p className="text-gray-300 mb-8">
            Our support team is ready to assist you. We typically respond to
            inquiries within 2 hours during business hours.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-300 text-sm">support@amardokan.com</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-300 text-sm">Available on our website</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-300 text-sm">+880 1234 567890</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
