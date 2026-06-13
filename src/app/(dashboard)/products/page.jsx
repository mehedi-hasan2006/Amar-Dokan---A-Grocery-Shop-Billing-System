import { getProducts } from "@/lib/action";
import React from "react";
import {
  Package,
  Search,
  ShoppingCart,
  Truck,
  Eye,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import Image from "next/image";

async function AllProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen w-full bg-gray-50/50 dark:bg-gray-950 p-4 md:p-8 text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-gray-900 selection:text-white dark:selection:bg-white dark:selection:text-gray-900">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-gray-200/60 dark:border-gray-800/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-950 dark:bg-white rounded-xl flex items-center justify-center shadow-md shadow-gray-950/10 dark:shadow-none">
              <Package className="w-6 h-6 text-white dark:text-gray-950" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
                Products
              </h1>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                {products.length} {products.length === 1 ? "item" : "items"} in
                inventory
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 rounded-xl text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-white focus:border-transparent transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="relative p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all shadow-sm active:scale-95 group shrink-0">
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-[11px] rounded-full flex items-center justify-center font-bold shadow-sm">
                  0
                </span>
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm active:scale-[0.98]">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid / Content Container */}
      <main className="max-w-7xl mx-auto">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/60 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 flex flex-col"
              >
                {/* Product Image Section */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                  <Image
                    width={300}
                    height={225}
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {/* Stock Status */}
                    <div>
                      {product.quantity === 0 ? (
                        <span className="px-2.5 py-1 bg-red-600 dark:bg-red-500 text-white text-[11px] font-semibold uppercase tracking-wider rounded-md shadow-sm">
                          Out of Stock
                        </span>
                      ) : product.quantity <= product.minStockAlert ? (
                        <span className="px-2.5 py-1 bg-amber-500 text-white text-[11px] font-semibold uppercase tracking-wider rounded-md shadow-sm">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-600 dark:bg-emerald-500 text-white text-[11px] font-semibold uppercase tracking-wider rounded-md shadow-sm">
                          In Stock
                        </span>
                      )}
                    </div>

                    {/* Category Label */}
                    <span className="px-2.5 py-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur text-[11px] font-semibold text-gray-700 dark:text-gray-300 rounded-md shadow-sm border border-gray-200/40 dark:border-gray-800/40">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Info & Content Wrapper */}
                <div className="px-5 py-2 flex flex-col flex-1">
                  {/* Title and Price */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[20px] font-bold text-gray-950 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.productName}
                      </h3>
                      <p className="text-xs flex gap-2  items-center font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                        <Truck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {product.brand}
                      </p>
                    </div>
                    <span className="text-[20px] font-extrabold text-gray-950 dark:text-white bg-gray-50 dark:bg-gray-800/60 px-2 py-0.5 rounded-md">
                      ${product.price}
                    </span>
                  </div>

                  {/* Core Attributes */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/40 rounded-xl p-2.5">
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Available Stock
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                        {product.quantity}{" "}
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400 lowercase">
                          {product.unit}
                        </span>
                      </p>
                    </div>
                    <div className="bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/40 rounded-xl p-2.5">
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Product Code
                      </p>
                      <p className="text-sm font-mono font-bold text-gray-900 dark:text-white mt-0.5 truncate">
                        {product.productCode}
                      </p>
                    </div>
                  </div>

                  {/* Logistics Meta (Supplier & Expiry) */}
                  <div className="flex justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pb-4 mb-4 border-b border-gray-100 dark:border-gray-800/60 mt-auto">
                    <span className="truncate  flex items-center gap-2 font-medium">
                      <Truck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {product.supplier}
                    </span>
                    {product.expireDate && (
                      <>
                        <span className="shrink-0 text-gray-400">
                          Exp:{" "}
                          <span className="font-semibold text-gray-600 dark:text-gray-300">
                            {new Date(product.expireDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "2-digit",
                              },
                            )}
                          </span>
                        </span>
                      </>
                    )}
                  </div>

                  {/* Primary & Contextual Actions */}
                  <div className="space-y-2 shrink-0">
                    <button className="w-full bg-gray-950 dark:bg-white text-white dark:text-gray-950 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200/80 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all active:scale-[0.96]">
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                      <button className="flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/80 rounded-lg transition-all active:scale-[0.96]">
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button className="flex items-center justify-center px-2 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/80 rounded-lg transition-all active:scale-[0.96]">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Sleek Empty State Layout */
          <div className="max-w-md mx-auto text-center py-20 px-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-sm mt-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-4 border border-gray-100 dark:border-gray-700">
              <Package className="w-7 h-7 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-1">
              No products yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
              Your inventory database is currently empty. Get started by
              publishing your first entry.
            </p>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm active:scale-[0.98]">
              <Plus className="w-4 h-4" />
              Add Your First Product
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default AllProductsPage;
