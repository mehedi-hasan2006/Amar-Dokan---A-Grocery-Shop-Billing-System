"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  DollarSign,
  User,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  Wallet,
  Smartphone,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";
import { getPayments } from "@/api/paymentApi";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // Filters
  const [filters, setFilters] = useState({
    paymentMethod: "all",
    category: "all",
    dateRange: "all",
    minAmount: "",
    maxAmount: "",
    city: "all",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getPayments();
      if (res.success) {
        setPayments(res.data || []);
      } else {
        toast.error("Failed to fetch payments");
      }
    } catch (error) {
      toast.error("Error loading payments");
    } finally {
      setLoading(false);
    }
  };

  // Get unique values for filters
  const uniqueCities = useMemo(() => {
    return [...new Set(payments.map((p) => p.city).filter(Boolean))];
  }, [payments]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set();
    payments.forEach((p) => {
      p.items?.forEach((item) => {
        if (item.category) categories.add(item.category);
      });
    });
    return [...categories];
  }, [payments]);

  const paymentMethodLabels = {
    cash: { label: "Cash", icon: Banknote, color: "emerald" },
    card: { label: "Card", icon: CreditCard, color: "blue" },
    mobile: { label: "Mobile Banking", icon: Smartphone, color: "purple" },
    bkash: { label: "bKash", icon: Wallet, color: "pink" },
  };

  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  // Filter and search logic
  const filteredPayments = useMemo(() => {
    let result = [...payments];

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter((payment) => {
        const searchableFields = [
          payment.customerName,
          payment.phone,
          payment.email,
          payment.orderId?.toString(),
          payment.city,
          payment.address,
          ...(payment.items?.map((item) => item.productName) || []),
          ...(payment.items?.map((item) => item.productCode) || []),
          ...(payment.items?.map((item) => item.category) || []),
          ...(payment.items?.map((item) => item.brand) || []),
        ];
        return searchableFields.some((field) =>
          field?.toLowerCase().includes(search),
        );
      });
    }

    // Payment Method Filter
    if (filters.paymentMethod !== "all") {
      result = result.filter((p) => p.paymentMethod === filters.paymentMethod);
    }

    // Category Filter
    if (filters.category !== "all") {
      result = result.filter((p) =>
        p.items?.some((item) => item.category === filters.category),
      );
    }

    // City Filter
    if (filters.city !== "all") {
      result = result.filter((p) => p.city === filters.city);
    }

    // Amount Range Filter
    if (filters.minAmount) {
      result = result.filter(
        (p) => p.totalAmount >= parseFloat(filters.minAmount),
      );
    }
    if (filters.maxAmount) {
      result = result.filter(
        (p) => p.totalAmount <= parseFloat(filters.maxAmount),
      );
    }

    // Date Range Filter
    if (filters.dateRange !== "all") {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );

      switch (filters.dateRange) {
        case "today":
          result = result.filter((p) => new Date(p.createdAt) >= startOfDay);
          break;
        case "yesterday":
          const yesterday = new Date(startOfDay);
          yesterday.setDate(yesterday.getDate() - 1);
          result = result.filter((p) => {
            const date = new Date(p.createdAt);
            return date >= yesterday && date < startOfDay;
          });
          break;
        case "week":
          const weekStart = new Date(startOfDay);
          weekStart.setDate(weekStart.getDate() - 7);
          result = result.filter((p) => new Date(p.createdAt) >= weekStart);
          break;
        case "month":
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          result = result.filter((p) => new Date(p.createdAt) >= monthStart);
          break;
        case "year":
          const yearStart = new Date(now.getFullYear(), 0, 1);
          result = result.filter((p) => new Date(p.createdAt) >= yearStart);
          break;
      }
    }

    // Sort
    result.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      if (sortConfig.key === "totalAmount") {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [payments, searchTerm, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const clearFilters = () => {
    setFilters({
      paymentMethod: "all",
      category: "all",
      dateRange: "all",
      minAmount: "",
      maxAmount: "",
      city: "all",
    });
    setSearchTerm("");
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.paymentMethod !== "all") count++;
    if (filters.category !== "all") count++;
    if (filters.dateRange !== "all") count++;
    if (filters.city !== "all") count++;
    if (filters.minAmount || filters.maxAmount) count++;
    return count;
  }, [filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredPayments.length;
    const totalAmount = filteredPayments.reduce(
      (sum, p) => sum + (p.totalAmount || 0),
      0,
    );
    const avgAmount = total > 0 ? totalAmount / total : 0;
    const todayPayments = filteredPayments.filter((p) => {
      const today = new Date();
      const paymentDate = new Date(p.createdAt);
      return paymentDate.toDateString() === today.toDateString();
    });
    const todayTotal = todayPayments.reduce(
      (sum, p) => sum + (p.totalAmount || 0),
      0,
    );

    return {
      total,
      totalAmount,
      avgAmount,
      todayPayments: todayPayments.length,
      todayTotal,
    };
  }, [filteredPayments]);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              Payment History
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              View and manage all payment transactions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchPayments}
              className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total Orders
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total Revenue
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${stats.totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Avg Order
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${stats.avgAmount.toFixed(2)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Today
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${stats.todayTotal.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {stats.todayPayments} orders
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, product, order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-2 font-medium text-sm ${
                showFilters || activeFilterCount > 0
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Payment Method
                </label>
                <select
                  value={filters.paymentMethod}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      paymentMethod: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="all">All Methods</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="mobile">Mobile Banking</option>
                  <option value="bkash">bKash</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Product Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      dateRange: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  {dateRangeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  City
                </label>
                <select
                  value={filters.city}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, city: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="all">All Cities</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Range */}
              <div className="sm:col-span-2 lg:col-span-4">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Amount Range
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minAmount}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minAmount: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAmount}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxAmount: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payments Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                No payments found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {searchTerm || activeFilterCount > 0
                  ? "Try adjusting your search or filters"
                  : "No payment transactions yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("orderId")}
                        className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white"
                      >
                        Order ID
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("totalAmount")}
                        className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white"
                      >
                        Amount
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("createdAt")}
                        className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white"
                      >
                        Date
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPayments.map((payment) => {
                    const PaymentIcon =
                      paymentMethodLabels[payment.paymentMethod]?.icon ||
                      CreditCard;
                    const paymentColor =
                      paymentMethodLabels[payment.paymentMethod]?.color ||
                      "gray";

                    return (
                      <tr
                        key={payment._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <span className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
                            #{payment.orderId}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {payment.customerName}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {payment.phone}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {payment.items?.length || 0} items
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {payment.items
                                ?.map((i) => i.productName)
                                .join(", ")
                                .slice(0, 40)}
                              {(payment.items
                                ?.map((i) => i.productName)
                                .join(", ").length || 0) > 40
                                ? "..."
                                : ""}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            ${payment.totalAmount?.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-${paymentColor}-50 dark:bg-${paymentColor}-950/30`}
                          >
                            <PaymentIcon
                              className={`w-3.5 h-3.5 text-${paymentColor}-600 dark:text-${paymentColor}-400`}
                            />
                            <span
                              className={`text-xs font-medium text-${paymentColor}-700 dark:text-${paymentColor}-300`}
                            >
                              {paymentMethodLabels[payment.paymentMethod]
                                ?.label || payment.paymentMethod}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-900 dark:text-white">
                              {new Date(payment.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(payment.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowDetails(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Info */}
          {!loading && filteredPayments.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing {filteredPayments.length} of {payments.length} payments
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Details Modal */}
      {showDetails && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Order Details
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Order #{selectedPayment.orderId}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowDetails(false);
                  setSelectedPayment(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Customer Information
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white font-medium">
                      {selectedPayment.customerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedPayment.phone}
                    </span>
                  </div>
                  {selectedPayment.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedPayment.email}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedPayment.address}, {selectedPayment.city}{" "}
                      {selectedPayment.postalCode}
                    </span>
                  </div>
                  {selectedPayment.deliveryDate && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Delivery: {selectedPayment.deliveryDate} at{" "}
                        {selectedPayment.deliveryTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Products ({selectedPayment.items?.length || 0})
                </h3>
                <div className="space-y-2">
                  {selectedPayment.items?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                          {item.productImage && (
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.productName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.category} • {item.brand} • Code:{" "}
                            {item.productCode}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${item.price} × {item.quantity}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.unit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Payment Information
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Method
                    </span>
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-${paymentMethodLabels[selectedPayment.paymentMethod]?.color || "gray"}-50 dark:bg-${paymentMethodLabels[selectedPayment.paymentMethod]?.color || "gray"}-950/30`}
                    >
                      {React.createElement(
                        paymentMethodLabels[selectedPayment.paymentMethod]
                          ?.icon || CreditCard,
                        {
                          className: `w-3.5 h-3.5 text-${paymentMethodLabels[selectedPayment.paymentMethod]?.color || "gray"}-600`,
                        },
                      )}
                      <span
                        className={`text-xs font-medium text-${paymentMethodLabels[selectedPayment.paymentMethod]?.color || "gray"}-700`}
                      >
                        {paymentMethodLabels[selectedPayment.paymentMethod]
                          ?.label || selectedPayment.paymentMethod}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Amount
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      ${selectedPayment.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                  {selectedPayment.receivedAmount && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Received
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${parseFloat(selectedPayment.receivedAmount).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {selectedPayment.receivedAmount &&
                    parseFloat(selectedPayment.receivedAmount) >
                      selectedPayment.totalAmount && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Change
                        </span>
                        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                          $
                          {(
                            parseFloat(selectedPayment.receivedAmount) -
                            selectedPayment.totalAmount
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}
                </div>
              </div>

              {selectedPayment.notes && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Notes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    {selectedPayment.notes}
                  </p>
                </div>
              )}

              <div className="text-xs text-gray-400 dark:text-gray-500 text-right">
                Created: {new Date(selectedPayment.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
