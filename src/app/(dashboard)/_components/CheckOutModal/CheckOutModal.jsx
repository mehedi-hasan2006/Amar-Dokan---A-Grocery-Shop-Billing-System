"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import React, { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Mail,
  CreditCard,
  Truck,
  ShoppingBag,
  Receipt,
  Banknote,
  Wallet,
  Smartphone,
  Building2,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  Star,
  Shield,
  ArrowRight,
  Circle,
  CheckCircle2,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

const CheckOutModal = ({ cartTotal, cartItems, onCheckoutComplete }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    deliveryDate: "",
    deliveryTime: "",
    receivedAmount: "",
  });

  const paymentMethods = [
    {
      id: "cash",
      label: "Cash",
      icon: Banknote,
      gradient: "from-emerald-500 to-green-600",
    },
    {
      id: "card",
      label: "Card",
      icon: CreditCard,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      id: "mobile",
      label: "Mobile Banking",
      icon: Smartphone,
      gradient: "from-purple-500 to-violet-600",
    },
    {
      id: "bkash",
      label: "bKash",
      icon: Wallet,
      gradient: "from-pink-500 to-rose-600",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.customerName.trim()) {
        newErrors.customerName = "Customer name is required";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      }
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }
    }

    if (step === 2) {
      if (
        paymentMethod === "cash" &&
        (!formData.receivedAmount ||
          parseFloat(formData.receivedAmount) < cartTotal)
      ) {
        newErrors.receivedAmount = `Amount must be at least $${cartTotal?.toFixed(2)}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateStep(3)) return;

    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);

    // Reset after success
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setIsSuccess(false);
      setCurrentStep(1);
      setPaymentMethod("cash");
      setFormData({
        customerName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        notes: "",
        deliveryDate: "",
        deliveryTime: "",
        receivedAmount: "",
      });
      setErrors({});
      if (onCheckoutComplete) onCheckoutComplete();
    }, 2500);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setIsCheckoutOpen(false);
      setCurrentStep(1);
      setErrors({});
    }
  };

  const changeAmount =
    paymentMethod === "cash" && formData.receivedAmount
      ? (parseFloat(formData.receivedAmount) || 0) - (cartTotal || 0)
      : 0;

  return (
    <div>
      <Button
        onClick={() => setIsCheckoutOpen(true)}
        className="w-full mt-6 relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <CreditCard className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Proceed to Checkout</span>
        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
      </Button>

      <Modal
        isOpen={isCheckoutOpen}
        onClose={handleClose}
        title=""
        size="xl"
        className="!p-0"
      >
        {isSuccess ? (
          /* Success State */
          <div className="p-8">
            <div className="text-center">
              <div className="relative inline-flex mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-bounce">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Order Completed!
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Transaction processed successfully
              </p>

              <div className="inline-block bg-gradient-to-r from-emerald-500 to-green-500 text-white text-4xl font-bold px-8 py-3 rounded-2xl mb-6 shadow-xl">
                ${cartTotal?.toFixed(2)}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 max-w-md mx-auto mb-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      Customer
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formData.customerName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      Payment Method
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white capitalize">
                      {paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      Items
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {cartItems?.length || 0} items
                    </span>
                  </div>
                  {changeAmount > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Change Returned
                      </span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        ${changeAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleClose}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Close & Continue
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Checkout
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Complete order for your customer
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${cartTotal?.toFixed(2)}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cartItems?.length || 0} items
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  {[
                    { step: 1, label: "Customer", sublabel: "Information" },
                    { step: 2, label: "Payment", sublabel: "Method" },
                    { step: 3, label: "Confirm", sublabel: "Order" },
                  ].map(({ step, label, sublabel }, index) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center relative z-10">
                        <button
                          onClick={() => {
                            if (step < currentStep) setCurrentStep(step);
                          }}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            currentStep > step
                              ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 cursor-pointer hover:scale-105"
                              : currentStep === step
                                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                          }`}
                        >
                          {currentStep > step ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <span className="text-lg font-bold">{step}</span>
                          )}
                        </button>
                        <div className="mt-2 text-center">
                          <p
                            className={`text-xs font-semibold ${
                              currentStep >= step
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-400"
                            }`}
                          >
                            {label}
                          </p>
                          <p
                            className={`text-[10px] ${
                              currentStep >= step
                                ? "text-gray-500 dark:text-gray-400"
                                : "text-gray-400"
                            }`}
                          >
                            {sublabel}
                          </p>
                        </div>
                      </div>
                      {index < 2 && (
                        <div className="flex-1 mx-4 mt-[-28px]">
                          <div className="relative h-1">
                            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full" />
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
                              style={{
                                width:
                                  currentStep > step + 1
                                    ? "100%"
                                    : currentStep > step
                                      ? "50%"
                                      : "0%",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Step 1: Customer Information */}
                {currentStep === 1 && (
                  <div className="space-y-5 animate-in fade-in-50 slide-in-from-right-5 duration-300">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-blue-900 dark:text-blue-200">
                            Customer Information
                          </h3>
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            Enter the customer details for this order
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Customer Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            placeholder="Enter full name"
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl border-2 transition-all bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none ${
                              errors.customerName
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
                            }`}
                          />
                        </div>
                        {errors.customerName && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full" />
                            {errors.customerName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+880 1XXX-XXXXXX"
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl border-2 transition-all bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none ${
                              errors.phone
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Email{" "}
                          <span className="text-gray-400">(Optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="customer@email.com"
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Delivery Address{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-3.5 left-3 pointer-events-none">
                            <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="House/Road/Area, City"
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl border-2 transition-all bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-none ${
                              errors.address
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
                            }`}
                          />
                        </div>
                        {errors.address && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full" />
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building2 className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g., Dhaka"
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl border-2 transition-all bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none ${
                              errors.city
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
                            }`}
                          />
                        </div>
                        {errors.city && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full" />
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          placeholder="e.g., 1205"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Delivery Schedule
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                              type="date"
                              name="deliveryDate"
                              value={formData.deliveryDate}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                              type="time"
                              name="deliveryTime"
                              value={formData.deliveryTime}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows="2"
                          placeholder="Any special instructions for delivery..."
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {currentStep === 2 && (
                  <div className="space-y-5 animate-in fade-in-50 slide-in-from-right-5 duration-300">
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-purple-900 dark:text-purple-200">
                            Payment Method
                          </h3>
                          <p className="text-xs text-purple-600 dark:text-purple-400">
                            Choose how the customer will pay
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {paymentMethods.map((method) => {
                        const isSelected = paymentMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id)}
                            className={`relative p-5 rounded-2xl border-2 transition-all duration-200 text-left group ${
                              isSelected
                                ? "border-transparent bg-gradient-to-r shadow-xl scale-[1.02]"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                            }`}
                          >
                            {isSelected && (
                              <div
                                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.gradient} opacity-10`}
                              />
                            )}
                            <div className="relative z-10">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all ${
                                  isSelected
                                    ? `bg-gradient-to-r ${method.gradient} shadow-lg`
                                    : "bg-gray-100 dark:bg-gray-800"
                                }`}
                              >
                                <method.icon
                                  className={`w-6 h-6 ${
                                    isSelected
                                      ? "text-white"
                                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                                  }`}
                                />
                              </div>
                              <span
                                className={`block text-sm font-bold ${
                                  isSelected
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                {method.label}
                              </span>
                              {isSelected && (
                                <div className="absolute top-2 right-2">
                                  <CheckCircle2
                                    className="w-5 h-5 text-white"
                                    style={{
                                      filter:
                                        "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Cash Payment Details */}
                    {paymentMethod === "cash" && (
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 animate-in fade-in-50 slide-in-from-top-2 duration-300">
                        <h4 className="font-bold text-emerald-900 dark:text-emerald-200 mb-4 flex items-center gap-2">
                          <Banknote className="w-5 h-5" />
                          Cash Payment Details
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Total Amount Due
                              </span>
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${cartTotal?.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Received Amount{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-gray-500 font-bold text-lg">
                                  $
                                </span>
                              </div>
                              <input
                                type="number"
                                name="receivedAmount"
                                value={formData.receivedAmount}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                step="0.01"
                                className={`w-full pl-8 pr-4 py-3.5 rounded-xl border-2 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none ${
                                  errors.receivedAmount
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-emerald-200 dark:border-emerald-700 focus:border-emerald-500"
                                }`}
                              />
                            </div>
                            {errors.receivedAmount && (
                              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full" />
                                {errors.receivedAmount}
                              </p>
                            )}
                          </div>

                          {formData.receivedAmount &&
                            parseFloat(formData.receivedAmount) >=
                              cartTotal && (
                              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 animate-in fade-in-50">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                    Change to Return
                                  </span>
                                  <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                                    ${changeAmount.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Order Confirmation */}
                {currentStep === 3 && (
                  <div className="space-y-5 animate-in fade-in-50 slide-in-from-right-5 duration-300">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                          <BadgeCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-emerald-900 dark:text-emerald-200">
                            Order Confirmation
                          </h3>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400">
                            Review and confirm the order details
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-5 space-y-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {formData.customerName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formData.phone}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Address
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white text-right max-w-[60%]">
                              {formData.address}, {formData.city}{" "}
                              {formData.postalCode}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Payment
                            </span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                              {paymentMethod}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Items
                            </span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {cartItems?.length || 0} items
                            </span>
                          </div>
                          {formData.deliveryDate && (
                            <div className="flex justify-between items-center py-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Delivery
                              </span>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {formData.deliveryDate}{" "}
                                {formData.deliveryTime &&
                                  `at ${formData.deliveryTime}`}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              Total Amount
                            </span>
                            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                              ${cartTotal?.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        By confirming this order, you agree to process the
                        transaction and update inventory accordingly.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Navigation */}
              <div className="border-t border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div>
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="secondary"
                        disabled={isProcessing}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      onClick={handleClose}
                      variant="secondary"
                      disabled={isProcessing}
                    >
                      Cancel
                    </Button>
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6"
                      >
                        Continue
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-6 shadow-lg shadow-emerald-500/30"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Confirm Order
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CheckOutModal;
