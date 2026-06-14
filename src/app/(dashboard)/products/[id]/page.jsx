import { getProductById } from "@/lib/action";
import React from "react";
import {
  Package,
  ArrowLeft,
  Pencil,
  Trash2,
  ShoppingCart,
  Truck,
  Hash,
  Box,
  Calendar,
  Tag,
  Building2,
  QrCode,
  AlertTriangle,
  DollarSign,
  Receipt,
  FileText,
  Barcode,
  Clock,
  Layers,
  Scale,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function ProductsDetailsPage({ params }) {
  const { id } = await params;
  const response = await getProductById(id);
  const product = response.data || response;

  const isLowStock = product.quantity <= product.minStockAlert;
  const isOutOfStock = product.quantity === 0;
  const profit = (parseFloat(product.price) - parseFloat(product.costPrice)).toFixed(2);
  const profitMargin = ((profit / parseFloat(product.price)) * 100).toFixed(1);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-full mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Back to Products</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors">
                <Pencil className="w-4 h-4" />
                Edit Product
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 md:px-8 py-6">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Product Image - Takes 2 columns */}
            <div className="lg:col-span-2 relative bg-gray-100 dark:bg-gray-800 min-h-75 lg:min-h-125 flex items-center justify-center p-8">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={product.imageUrl}
                  alt={product.productName}
                  fill
                  className="object-cover rounded-xl shadow-2xl"
                  priority
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {isOutOfStock ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-xl shadow-lg">
                      <AlertTriangle className="w-4 h-4" />
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg">
                      <AlertTriangle className="w-4 h-4" />
                      Low Stock Alert
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg">
                      <Shield className="w-4 h-4" />
                      In Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Header Info - Takes 3 columns */}
            <div className="lg:col-span-3 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-lg">
                        {product.category}
                      </span>
                      <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-xs font-medium text-blue-600 dark:text-blue-400 rounded-lg">
                        {product.brand}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.productName}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Product Code: {product.productCode}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      per {product.unit}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                          Description
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <Box className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.quantity}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.unit} in stock
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <DollarSign className="w-5 h-5 text-emerald-500 mb-2" />
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      ${profit}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Profit ({profitMargin}%)
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <Building2 className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {product.supplier}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Supplier
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <Calendar className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {product.expireDate 
                        ? new Date(product.expireDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No expiry"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Expiry Date
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button 
                  disabled={isOutOfStock}
                  className="flex-1 min-w-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3.5 px-6 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button className="flex-1 min-w-37.5 py-3.5 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <Truck className="w-5 h-5" />
                  Track Shipment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Inventory Details */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Inventory Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Box className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Current Stock</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {product.quantity} {product.unit}
                      </p>
                    </div>
                  </div>
                  {isLowStock && (
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-xs font-medium rounded-lg">
                      Low
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Min Stock Alert</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {product.minStockAlert} {product.unit}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Unit</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {product.unit}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Barcode className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Barcode</p>
                      <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
                        {product.barcode || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-5">
                  <Receipt className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-3" />
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                    SELLING PRICE
                  </p>
                  <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                    ${product.price}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    Per {product.unit}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-5">
                  <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-3" />
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">
                    COST PRICE
                  </p>
                  <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                    ${product.costPrice}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    Per {product.unit}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-5">
                  <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-3" />
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                    PROFIT
                  </p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                    ${profit}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {profitMargin}% margin
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Supplier Info */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Supplier Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.supplier}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Product Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Product Code</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.productCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Brand</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.brand}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Expiry Date</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.expireDate 
                        ? new Date(product.expireDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "No expiry date"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <QrCode className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Barcode</p>
                    <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
                      {product.barcode || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Created At</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {new Date(product.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Product ID</p>
                    <p className="text-xs font-mono font-semibold text-gray-900 dark:text-white truncate">
                      {product._id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button className="w-full py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  Print Barcode Label
                </button>
                <button className="w-full py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  View Shipments
                </button>
                <button className="w-full py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Stock History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetailsPage;