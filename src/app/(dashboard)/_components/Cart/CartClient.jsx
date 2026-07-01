"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  Shield,
  Receipt,
  CreditCard,
  Package,
  AlertCircle,
  ChevronRight,
  Tag,
  Percent,
  DollarSign,
  Ticket,
  X,
} from "lucide-react";
import CheckOutModal from "../CheckOutModal/CheckOutModal";

export default function CartClient({ initialCartItems }) {
  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const [discountType, setDiscountType] = useState("none"); // 'none', 'percentage', 'fixed', 'promo'
  const [discountValue, setDiscountValue] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [promoError, setPromoError] = useState("");

  // Valid promo codes (in real app, this would come from API)
  const validPromoCodes = {
    SAVE10: { type: "percentage", value: 10 },
    FLAT20: { type: "fixed", value: 20 },
    WELCOME50: { type: "percentage", value: 50 },
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * (item.quantity || 1),
    0,
  );

  // Calculate discount
  const calculateDiscount = () => {
    if (!appliedDiscount) return 0;

    if (appliedDiscount.type === "percentage") {
      return (subtotal * appliedDiscount.value) / 100;
    } else if (appliedDiscount.type === "fixed") {
      return Math.min(appliedDiscount.value, subtotal);
    }
    return 0;
  };

  const discountAmount = calculateDiscount();
  const afterDiscount = subtotal - discountAmount;
  const shipping = afterDiscount > 50 ? 0 : 5.99;
  const tax = afterDiscount * 0.05; // 5% tax
  const total = afterDiscount + shipping + tax;

  const isEmpty = cartItems.length === 0;

  // Handle quantity change
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id || item.productId) === itemId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  // Handle remove item
  const removeItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item._id || item.productId) !== itemId),
    );
  };

  // Handle clear cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedDiscount(null);
    setDiscountType("none");
    setDiscountValue("");
    setPromoCode("");
  };

  // Apply discount
  const applyDiscount = () => {
    if (discountType === "percentage" && discountValue) {
      const value = parseFloat(discountValue);
      if (value > 0 && value <= 100) {
        setAppliedDiscount({ type: "percentage", value });
        setPromoError("");
      } else {
        setPromoError("Please enter a valid percentage (1-100)");
      }
    } else if (discountType === "fixed" && discountValue) {
      const value = parseFloat(discountValue);
      if (value > 0) {
        setAppliedDiscount({ type: "fixed", value });
        setPromoError("");
      } else {
        setPromoError("Please enter a valid amount");
      }
    } else if (discountType === "promo" && promoCode) {
      const code = promoCode.toUpperCase();
      if (validPromoCodes[code]) {
        setAppliedDiscount({ ...validPromoCodes[code], code });
        setPromoError("");
      } else {
        setPromoError("Invalid promo code");
        setAppliedDiscount(null);
      }
    }
  };

  // Remove discount
  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountType("none");
    setDiscountValue("");
    setPromoCode("");
    setPromoError("");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/products"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <ShoppingCart className="w-8 h-8" />
                  Shopping Cart
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {isEmpty
                    ? "Your cart is empty"
                    : `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} in your cart`}
                </p>
              </div>
            </div>
            {!isEmpty && (
              <button
                onClick={clearCart}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {isEmpty ? (
        /* Empty Cart State - Full Width */
        <div className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto">
              Looks like you haven&apos;t added any products to your cart yet.
              Start shopping and find great deals!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Browse Products
              <ChevronRight className="w-5 h-5" />
            </Link>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Free Shipping
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  On orders over $50
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Secure Checkout
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  256-bit SSL encryption
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Easy Returns
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items - Left Side */}
            <div className="flex-1 space-y-4">
              {/* Free Shipping Banner */}
              {afterDiscount < 50 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center">
                      <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                        Add ${(50 - afterDiscount).toFixed(2)} more for free
                        shipping!
                      </p>
                      <div className="mt-2 w-full h-2 bg-amber-200 dark:bg-amber-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min((afterDiscount / 50) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {afterDiscount >= 50 && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center">
                      <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                        Congratulations! You qualify for free shipping!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Cards */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id || item.productId}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all group"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                        <Image
                          src={item.productImage || "/placeholder.png"}
                          alt={item.productName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.quantity <= 5 && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-medium rounded-md">
                              Low Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.productId || item._id}`}
                              className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                            >
                              {item.productName}
                            </Link>

                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                                {item.category}
                              </span>
                              {item.brand && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {item.brand}
                                </span>
                              )}
                            </div>

                            {/* Price & Unit */}
                            <div className="mt-2 flex items-baseline gap-2">
                              <span className="text-xl font-bold text-gray-900 dark:text-white">
                                ${item.price}
                              </span>
                              {item.unit && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  /{item.unit}
                                </span>
                              )}
                              {item.costPrice && (
                                <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                                  ${item.costPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item._id || item.productId,
                                    (item.quantity || 1) - 1,
                                  )
                                }
                                disabled={(item.quantity || 1) <= 1}
                                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item._id || item.productId,
                                    (item.quantity || 1) + 1,
                                  )
                                }
                                disabled={
                                  (item.quantity || 1) >= item.maxQuantity
                                }
                                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                removeItem(item._id || item.productId)
                              }
                              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group/delete"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-500 transition-colors" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <Tag className="w-3.5 h-3.5" />
                            <span>
                              {item.quantity || 1} × ${item.price}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900 dark:text-white">
                            $
                            {(
                              (item.quantity || 1) * parseFloat(item.price)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:w-96">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 lg:sticky lg:top-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                {/* Summary Items */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Discount Section */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Discount Options
                    </label>

                    {/* Discount Type Selector */}
                    {!appliedDiscount && (
                      <div className="flex gap-2 mb-3 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <button
                          onClick={() => setDiscountType("none")}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                            discountType === "none"
                              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          }`}
                        >
                          None
                        </button>
                        <button
                          onClick={() => setDiscountType("percentage")}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                            discountType === "percentage"
                              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          }`}
                        >
                          <Percent className="w-3 h-3 inline mr-1" />%
                        </button>
                        <button
                          onClick={() => setDiscountType("fixed")}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                            discountType === "fixed"
                              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          }`}
                        >
                          <DollarSign className="w-3 h-3 inline mr-1" />
                          TK
                        </button>
                        <button
                          onClick={() => setDiscountType("promo")}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                            discountType === "promo"
                              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          }`}
                        >
                          <Ticket className="w-3 h-3 inline mr-1" />
                          Code
                        </button>
                      </div>
                    )}

                    {/* Discount Input */}
                    {!appliedDiscount && discountType !== "none" && (
                      <div className="space-y-2">
                        {discountType === "percentage" && (
                          <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              placeholder="Enter percentage (1-100)"
                              value={discountValue}
                              onChange={(e) => setDiscountValue(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                        )}

                        {discountType === "fixed" && (
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              placeholder="Enter amount in Taka"
                              value={discountValue}
                              onChange={(e) => setDiscountValue(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                            />
                          </div>
                        )}

                        {discountType === "promo" && (
                          <div className="relative">
                            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Enter promo code"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all uppercase"
                            />
                          </div>
                        )}

                        {promoError && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {promoError}
                          </p>
                        )}

                        <button
                          onClick={applyDiscount}
                          className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                          Apply Discount
                        </button>
                      </div>
                    )}

                    {/* Applied Discount */}
                    {appliedDiscount && (
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                              {appliedDiscount.code
                                ? `Promo: ${appliedDiscount.code}`
                                : appliedDiscount.type === "percentage"
                                  ? `${appliedDiscount.value}% Off`
                                  : `$${appliedDiscount.value} Off`}
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400">
                              Saved: ${discountAmount.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={removeDiscount}
                            className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Discount
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <Truck className="w-4 h-4" />
                      <span>Shipping</span>
                    </div>
                    {shipping === 0 ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Free
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${shipping.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <Receipt className="w-4 h-4" />
                      <span>Tax (5%)</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        You saved $5.99 on shipping!
                      </p>
                    )}
                    {discountAmount > 0 && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        Total savings: $
                        {(
                          discountAmount + (afterDiscount > 50 ? 5.99 : 0)
                        ).toFixed(2)}
                      </p>
                    )}
                  </div>

                  {/* Checkout Button */}
                  {/* <button >
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </button> */}
                  <CheckOutModal cartTotal={subtotal} cartItems={cartItems} />

                  {/* Trust Badges */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Package className="w-4 h-4 text-purple-500" />
                      <span>30-day easy returns</span>
                    </div>
                  </div>

                  {/* Available Promo Codes */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Available Promo Codes:
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <code className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300 font-mono">
                          SAVE10
                        </code>
                        <span className="text-gray-500 dark:text-gray-400">
                          10% Off
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <code className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300 font-mono">
                          FLAT20
                        </code>
                        <span className="text-gray-500 dark:text-gray-400">
                          $20 Off
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <code className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300 font-mono">
                          WELCOME50
                        </code>
                        <span className="text-gray-500 dark:text-gray-400">
                          50% Off
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
