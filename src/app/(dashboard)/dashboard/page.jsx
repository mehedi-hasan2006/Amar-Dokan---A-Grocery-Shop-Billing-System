"use client";

import React from "react";
import { Card } from "@heroui/react";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const DashboardPage = () => {
  // Mock data - replace with real data from your API
  const dashboardData = {
    totalProducts: 245,
    totalSells: 1280,
    todaySells: 47,
    availableProducts: 198,
    stockOutProducts: 47,
  };

  const metrics = [
    {
      id: 1,
      title: "Total Products",
      value: dashboardData.totalProducts,
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 2,
      title: "Total Sells",
      value: dashboardData.totalSells,
      icon: ShoppingCart,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      id: 3,
      title: "Today Sells",
      value: dashboardData.todaySells,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      id: 4,
      title: "Available Products",
      value: dashboardData.availableProducts,
      icon: CheckCircle,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      id: 5,
      title: "Stock Out Products",
      value: dashboardData.stockOutProducts,
      icon: AlertCircle,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-950",
      textColor: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's your store performance overview.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <Card
                key={metric.id}
                className={`${metric.bgColor} border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group`}
              >
                <div className="p-6 h-full flex flex-col justify-between">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {metric.title}
                    </p>
                    <p className="text-3xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {metric.value.toLocaleString()}
                    </p>
                  </div>

                  {/* Trend Indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className={`text-xs font-semibold ${metric.textColor}`}>
                      {metric.id === 3 ? "↑ Today" : "→ Status"}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
