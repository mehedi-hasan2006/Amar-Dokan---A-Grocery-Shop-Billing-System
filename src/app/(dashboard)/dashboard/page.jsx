"use client";

import React, { useState } from "react";
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
} from "lucide-react";

const DashboardPage = () => {
  const [timeFilter, setTimeFilter] = useState("today");

  // ==================== STATIC MOCK DATA ====================
  const dashboardData = {
    totalProducts: 245,
    todaySells: 47,
    availableProducts: 198,
    stockOutProducts: 47,
    todayRevenue: 28450,
    yesterdayRevenue: 25300,
    totalCustomers: 89,
    avgBillAmount: 605,
    profitToday: 8540,
    profitYesterday: 7200,
    revenueGrowth: 12.5,
    customerGrowth: 8.3,

    lowStockProducts: [
      {
        id: 1,
        name: "Fresh Milk 500ml",
        stock: 3,
        minStock: 20,
        status: "critical",
      },
      {
        id: 2,
        name: "Parle-G Biscuit",
        stock: 8,
        minStock: 15,
        status: "warning",
      },
      {
        id: 3,
        name: "Pran Mineral Water",
        stock: 5,
        minStock: 25,
        status: "critical",
      },
      {
        id: 4,
        name: "Sugar 1kg",
        stock: 12,
        minStock: 20,
        status: "warning",
      },
    ],

    recentBills: [
      {
        id: "BILL-001",
        customer: "Walk-in Customer",
        items: 5,
        amount: 450,
        payment: "Cash",
        time: "10:30 AM",
        status: "completed",
      },
      {
        id: "BILL-002",
        customer: "Rahim Uddin",
        items: 3,
        amount: 320,
        payment: "Bkash",
        time: "11:15 AM",
        status: "completed",
      },
      {
        id: "BILL-003",
        customer: "Walk-in Customer",
        items: 8,
        amount: 890,
        payment: "Cash",
        time: "12:00 PM",
        status: "completed",
      },
      {
        id: "BILL-004",
        customer: "Fatema Begum",
        items: 2,
        amount: 180,
        payment: "Card",
        time: "12:45 PM",
        status: "completed",
      },
      {
        id: "BILL-005",
        customer: "Walk-in Customer",
        items: 6,
        amount: 675,
        payment: "Cash",
        time: "01:30 PM",
        status: "pending",
      },
    ],

    topProducts: [
      {
        id: 1,
        name: "Fresh Milk 500ml",
        sold: 45,
        revenue: 3150,
        trend: "up",
      },
      {
        id: 2,
        name: "Parle-G Biscuit",
        sold: 38,
        revenue: 380,
        trend: "up",
      },
      {
        id: 3,
        name: "Pran Mineral Water",
        sold: 32,
        revenue: 640,
        trend: "down",
      },
      {
        id: 4,
        name: "Eggs (Dozen)",
        sold: 28,
        revenue: 3360,
        trend: "up",
      },
      {
        id: 5,
        name: "Sugar 1kg",
        sold: 25,
        revenue: 2250,
        trend: "down",
      },
    ],
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
      subtext: `↑ ${dashboardData.revenueGrowth}% vs yesterday`,
      trend: "up",
    },
    {
      id: 3,
      title: "Today's Bills",
      value: dashboardData.todaySells,
      icon: Receipt,
      gradient: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400",
      subtext: `Avg: ৳${dashboardData.avgBillAmount}`,
    },
    {
      id: 4,
      title: "Today's Profit",
      value: `৳${dashboardData.profitToday.toLocaleString()}`,
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      textColor: "text-orange-600 dark:text-orange-400",
      subtext: `↑ ${(((dashboardData.profitToday - dashboardData.profitYesterday) / dashboardData.profitYesterday) * 100).toFixed(1)}%`,
      trend: "up",
    },
    {
      id: 5,
      title: "Total Customers",
      value: dashboardData.totalCustomers,
      icon: Users,
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-950",
      textColor: "text-pink-600 dark:text-pink-400",
      subtext: `↑ ${dashboardData.customerGrowth}%`,
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
            {/* Recent Bills - Using simple div table instead of HeroUI Table */}
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
                {/* Simple Table */}
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
                          <td className="py-3 px-2 font-medium">{bill.id}</td>
                          <td className="py-3 px-2">{bill.customer}</td>
                          <td className="py-3 px-2">{bill.items}</td>
                          <td className="py-3 px-2 font-semibold">
                            ৳{bill.amount}
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
                <div className="space-y-4">
                  {dashboardData.lowStockProducts.map((product) => (
                    <div key={product.id} className="space-y-1.5">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </p>
                        <Chip
                          color={
                            product.status === "critical" ? "danger" : "warning"
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
                            product.status === "critical" ? "danger" : "warning"
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
                  {/* <Divider /> */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Total Bills
                    </span>
                    <span className="font-semibold text-sm">
                      {dashboardData.todaySells}
                    </span>
                  </div>
                  {/* <Divider /> */}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Avg. Bill
                    </span>
                    <span className="font-semibold text-sm">
                      ৳{dashboardData.avgBillAmount}
                    </span>
                  </div>
                  {/* <Divider /> */}
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
