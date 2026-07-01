"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  ProgressBar,
  Chip,
  Button,
} from "@heroui/react";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Users,
  ArrowUp,
  ArrowDown,
  Clock,
  Receipt,
  TrendingDown,
  Star,
  Eye,
  Download,
  Calendar,
  Plus,
  RefreshCw,
  Loader2,
} from "lucide-react";
import {
  getDashboardStats,
  getProducts,
  getPayments,
} from "@/api/dashboardApi";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [timeFilter, setTimeFilter] = useState("today");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    todaySells: 0,
    availableProducts: 0,
    stockOutProducts: 0,
    todayRevenue: 0,
    yesterdayRevenue: 0,
    totalCustomers: 0,
    avgBillAmount: 0,
    profitToday: 0,
    profitYesterday: 0,
    revenueGrowth: 0,
    customerGrowth: 0,
    lowStockProducts: [],
    recentBills: [],
    topProducts: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, [timeFilter]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all required data
      const [statsRes, productsRes, paymentsRes] = await Promise.all([
        getDashboardStats(timeFilter),
        getProducts(),
        getPayments(timeFilter),
      ]);

      // Process products
      const products = productsRes || [];
      const totalProducts = products.length;
      const availableProducts = products.filter(
        (p) => parseInt(p.quantity) > 0,
      ).length;
      const stockOutProducts = products.filter(
        (p) => parseInt(p.quantity) === 0,
      ).length;

      // Find low stock products
      const lowStockProducts = products
        .filter(
          (p) =>
            parseInt(p.quantity) > 0 &&
            parseInt(p.quantity) <= parseInt(p.minStockAlert || 10),
        )
        .map((p) => ({
          id: p._id,
          name: p.productName,
          stock: parseInt(p.quantity),
          minStock: parseInt(p.minStockAlert || 10),
          status:
            parseInt(p.quantity) <= parseInt(p.minStockAlert || 10) / 2
              ? "critical"
              : "warning",
        }))
        .slice(0, 5);

      // Process payments
      const payments = paymentsRes?.data || [];
      const todayPayments = payments.filter((p) => {
        const today = new Date();
        const paymentDate = new Date(p.createdAt);
        return paymentDate.toDateString() === today.toDateString();
      });

      const todayRevenue = todayPayments.reduce(
        (sum, p) => sum + (p.totalAmount || 0),
        0,
      );
      const yesterdayPayments = payments.filter((p) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const paymentDate = new Date(p.createdAt);
        return paymentDate.toDateString() === yesterday.toDateString();
      });
      const yesterdayRevenue = yesterdayPayments.reduce(
        (sum, p) => sum + (p.totalAmount || 0),
        0,
      );

      // Calculate growth
      const revenueGrowth =
        yesterdayRevenue > 0
          ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100
          : 100;

      const todaySells = todayPayments.length;

      // Get unique customers
      const uniqueCustomers = new Set(
        payments.map((p) => p.phone || p.customerName),
      );
      const totalCustomers = uniqueCustomers.size;

      // Average bill amount
      const avgBillAmount =
        todaySells > 0 ? Math.round(todayRevenue / todaySells) : 0;

      // Calculate profit (assuming 30% profit margin - adjust based on your actual cost data)
      const profitMargin = 0.3;
      const profitToday = Math.round(todayRevenue * profitMargin);
      const profitYesterday = Math.round(yesterdayRevenue * profitMargin);

      // Recent bills
      const recentBills = todayPayments.slice(0, 5).map((p) => ({
        id: p.orderId?.toString() || p._id,
        customer: p.customerName || "Walk-in Customer",
        items: p.items?.length || 0,
        amount: p.totalAmount || 0,
        payment:
          p.paymentMethod === "cash"
            ? "Cash"
            : p.paymentMethod === "card"
              ? "Card"
              : p.paymentMethod === "bkash"
                ? "Bkash"
                : "Mobile Banking",
        time: new Date(p.createdAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "completed",
      }));

      // Top products (from all payments, not just today)
      const productSales = {};
      payments.forEach((p) => {
        p.items?.forEach((item) => {
          if (!productSales[item.productName]) {
            productSales[item.productName] = {
              name: item.productName,
              sold: 0,
              revenue: 0,
            };
          }
          productSales[item.productName].sold += item.quantity || 1;
          productSales[item.productName].revenue +=
            parseFloat(item.price) * (item.quantity || 1);
        });
      });

      const topProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
        .map((product, index) => ({
          id: index + 1,
          ...product,
          trend: index < 3 ? "up" : "down",
        }));

      setDashboardData({
        totalProducts,
        todaySells,
        availableProducts,
        stockOutProducts,
        todayRevenue,
        yesterdayRevenue,
        totalCustomers,
        avgBillAmount,
        profitToday,
        profitYesterday,
        revenueGrowth,
        customerGrowth: 8.3, // Keep static or calculate from customer data
        lowStockProducts,
        recentBills,
        topProducts,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // ==================== MAIN METRICS ====================
  const mainMetrics = [
    {
      id: 1,
      title: "Total Products",
      value: dashboardData.totalProducts,
      icon: Package,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      textColor: "text-blue-600 dark:text-blue-400",
      subtext: `${dashboardData.availableProducts} available`,
    },
    {
      id: 2,
      title: "Today's Revenue",
      value: `৳${dashboardData.todayRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      textColor: "text-green-600 dark:text-green-400",
      subtext: `${dashboardData.revenueGrowth >= 0 ? "↑" : "↓"} ${Math.abs(dashboardData.revenueGrowth).toFixed(1)}% vs yesterday`,
      trend: dashboardData.revenueGrowth >= 0 ? "up" : "down",
    },
    {
      id: 3,
      title: "Today's Bills",
      value: dashboardData.todaySells,
      icon: Receipt,
      gradient: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400",
      subtext: `Avg: ৳${dashboardData.avgBillAmount.toLocaleString()}`,
    },
    {
      id: 4,
      title: "Today's Profit",
      value: `৳${dashboardData.profitToday.toLocaleString()}`,
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      textColor: "text-orange-600 dark:text-orange-400",
      subtext:
        dashboardData.profitYesterday > 0
          ? `${dashboardData.profitToday >= dashboardData.profitYesterday ? "↑" : "↓"} ${Math.abs(((dashboardData.profitToday - dashboardData.profitYesterday) / dashboardData.profitYesterday) * 100).toFixed(1)}%`
          : "No data",
      trend:
        dashboardData.profitToday >= dashboardData.profitYesterday
          ? "up"
          : "down",
    },
    {
      id: 5,
      title: "Total Customers",
      value: dashboardData.totalCustomers,
      icon: Users,
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-950",
      textColor: "text-pink-600 dark:text-pink-400",
      subtext: "Unique customers",
      trend: "up",
    },
    {
      id: 6,
      title: "Stock Out",
      value: dashboardData.stockOutProducts,
      icon: AlertCircle,
      gradient: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-950",
      textColor: "text-red-600 dark:text-red-400",
      subtext: "Needs restock",
      trend: "down",
    },
  ];

  // ==================== TIME FILTER ====================
  const timeFilters = [
    { key: "today", label: "Today" },
    { key: "yesterday", label: "Yesterday" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
  ];

  // ==================== COLOR MAPS ====================
  const getPaymentChipColor = (payment) => {
    const map = { Cash: "success", Bkash: "primary", Card: "warning" };
    return map[payment] || "default";
  };

  const getStatusChipColor = (status) => {
    const map = {
      completed: "success",
      pending: "warning",
      cancelled: "danger",
    };
    return map[status] || "default";
  };

  const getRankColor = (index) => {
    if (index === 0)
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    if (index === 1)
      return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    if (index === 2)
      return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
    return "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* ==================== HEADER ==================== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString("en-BD", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Time Filter */}
            <div className="flex gap-1 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {timeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setTimeFilter(filter.key)}
                  className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-colors font-medium ${
                    timeFilter === filter.key
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchDashboardData}
              className="p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* ==================== MAIN METRICS GRID ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {mainMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <Card
                key={metric.id}
                className={`${metric.bgColor} border border-gray-200 dark:border-gray-700`}
                shadow="sm"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-md`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    {metric.trend && (
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-full text-xs font-medium ${
                          metric.trend === "up"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {metric.trend === "up" ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {metric.title}
                    </p>
                    <p className={`text-xs ${metric.textColor}`}>
                      {metric.subtext}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* ==================== TWO COLUMN LAYOUT ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* ========== LEFT COLUMN ========== */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Recent Bills */}
            <Card shadow="sm">
              <CardHeader className="flex justify-between items-center px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-500" />
                  Recent Bills
                </h2>
                <Button
                  size="sm"
                  variant="light"
                  color="primary"
                  endContent={<Eye className="w-4 h-4" />}
                >
                  View All
                </Button>
              </CardHeader>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                {dashboardData.recentBills.length === 0 ? (
                  <div className="text-center py-8">
                    <Receipt className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No bills today
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">
                            Bill No
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">
                            Customer
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">
                            Items
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">
                            Amount
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">
                            Payment
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">
                            Time
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.recentBills.map((bill) => (
                          <tr
                            key={bill.id}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <td className="py-3 px-2 font-medium">
                              #{bill.id}
                            </td>
                            <td className="py-3 px-2">{bill.customer}</td>
                            <td className="py-3 px-2">{bill.items}</td>
                            <td className="py-3 px-2 font-semibold">
                              ৳{bill.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-2">
                              <Chip
                                color={getPaymentChipColor(bill.payment)}
                                variant="flat"
                                size="sm"
                              >
                                {bill.payment}
                              </Chip>
                            </td>
                            <td className="py-3 px-2">
                              <span className="flex items-center gap-1 text-gray-500">
                                <Clock className="w-3 h-3" />
                                {bill.time}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <Chip
                                color={getStatusChipColor(bill.status)}
                                variant="dot"
                                size="sm"
                              >
                                {bill.status}
                              </Chip>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Card>

            {/* Top Products */}
            <Card shadow="sm">
              <CardHeader className="flex justify-between items-center px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Top Selling Products
                </h2>
                <Button size="sm" variant="light" color="primary">
                  View Report
                </Button>
              </CardHeader>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                {dashboardData.topProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No sales data yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dashboardData.topProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(index)}`}
                          >
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.sold} units sold
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">
                            ৳{product.revenue.toLocaleString()}
                          </span>
                          {product.trend === "up" ? (
                            <ArrowUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* ========== RIGHT COLUMN ========== */}
          <div className="space-y-4 lg:space-y-6">
            {/* Low Stock Alerts */}
            <Card shadow="sm" className="border-l-4 border-red-500">
              <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  Low Stock Alert
                </h2>
              </CardHeader>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                {dashboardData.lowStockProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      All products are well stocked
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.lowStockProducts.map((product) => (
                      <div key={product.id} className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <Chip
                            color={
                              product.status === "critical"
                                ? "danger"
                                : "warning"
                            }
                            variant="flat"
                            size="sm"
                          >
                            {product.status === "critical"
                              ? "Critical"
                              : "Warning"}
                          </Chip>
                        </div>
                        <div className="flex items-center gap-2">
                          <ProgressBar
                            value={(product.stock / product.minStock) * 100}
                            color={
                              product.status === "critical"
                                ? "danger"
                                : "warning"
                            }
                            size="sm"
                            className="flex-1"
                          />
                          <span className="text-xs text-gray-500 min-w-[45px]">
                            {product.stock}/{product.minStock}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  className="mt-4 w-full"
                >
                  View All Low Stock
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card shadow="sm">
              <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Actions
                </h2>
              </CardHeader>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<ShoppingCart className="w-4 h-4" />}
                    size="sm"
                    className="h-10"
                  >
                    New Sale
                  </Button>
                  <Button
                    color="success"
                    variant="flat"
                    startContent={<Plus className="w-4 h-4" />}
                    size="sm"
                    className="h-10"
                  >
                    Add Product
                  </Button>
                  <Button
                    color="warning"
                    variant="flat"
                    startContent={<Download className="w-4 h-4" />}
                    size="sm"
                    className="h-10"
                  >
                    Export
                  </Button>
                  <Button
                    color="secondary"
                    variant="flat"
                    startContent={<TrendingDown className="w-4 h-4" />}
                    size="sm"
                    className="h-10"
                  >
                    Stock Report
                  </Button>
                </div>
              </div>
            </Card>

            {/* Daily Summary */}
            <Card shadow="sm">
              <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Daily Summary
                </h2>
              </CardHeader>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="space-y-0">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Total Revenue
                    </span>
                    <span className="font-semibold text-sm">
                      ৳{dashboardData.todayRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Total Bills
                    </span>
                    <span className="font-semibold text-sm">
                      {dashboardData.todaySells}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Avg. Bill
                    </span>
                    <span className="font-semibold text-sm">
                      ৳{dashboardData.avgBillAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Profit
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400 text-sm">
                      ৳{dashboardData.profitToday.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
