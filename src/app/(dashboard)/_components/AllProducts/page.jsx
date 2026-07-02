"use client";

import React, { useState, useMemo } from "react";
import {
  Package,
  Search,
  ShoppingCart,
  Truck,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import ProductDeleteButton from "../ProductDeleteButton/ProductDeleteButton";


const AllProducts = ({ products: initialProducts, user, cartItems }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    brand: "all",
    supplier: "all",
    stockStatus: "all",
    priceRange: "all",
    unit: "all",
    sortBy: "newest",
  });

  // Get unique values for filters
  const categories = useMemo(() => {
    return [...new Set(initialProducts.map((p) => p.category).filter(Boolean))];
  }, [initialProducts]);

  const brands = useMemo(() => {
    return [...new Set(initialProducts.map((p) => p.brand).filter(Boolean))];
  }, [initialProducts]);

  const suppliers = useMemo(() => {
    return [...new Set(initialProducts.map((p) => p.supplier).filter(Boolean))];
  }, [initialProducts]);

  const units = useMemo(() => {
    return [...new Set(initialProducts.map((p) => p.unit).filter(Boolean))];
  }, [initialProducts]);

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-10", label: "$0 - $10" },
    { value: "10-50", label: "$10 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-500", label: "$100 - $500" },
    { value: "500+", label: "$500+" },
  ];

  const stockStatuses = [
    { value: "all", label: "All Status" },
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "quantity-low", label: "Quantity: Low to High" },
    { value: "quantity-high", label: "Quantity: High to Low" },
  ];

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search by multiple fields
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      result = result.filter((product) => {
        const searchableFields = [
          product.productName,
          product.productCode,
          product.category,
          product.brand,
          product.supplier,
          product.barcode,
          product.description,
          product.price?.toString(),
          product.costPrice?.toString(),
          product.quantity?.toString(),
          product.unit,
        ];
        return searchableFields.some((field) =>
          field?.toLowerCase().includes(search),
        );
      });
    }

    // Category filter
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Brand filter
    if (filters.brand !== "all") {
      result = result.filter((p) => p.brand === filters.brand);
    }

    // Supplier filter
    if (filters.supplier !== "all") {
      result = result.filter((p) => p.supplier === filters.supplier);
    }

    // Unit filter
    if (filters.unit !== "all") {
      result = result.filter((p) => p.unit === filters.unit);
    }

    // Stock status filter
    if (filters.stockStatus !== "all") {
      result = result.filter((p) => {
        switch (filters.stockStatus) {
          case "in-stock":
            return p.quantity > p.minStockAlert;
          case "low-stock":
            return p.quantity > 0 && p.quantity <= p.minStockAlert;
          case "out-of-stock":
            return p.quantity === 0;
          default:
            return true;
        }
      });
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      result = result.filter((p) => {
        const price = parseFloat(p.price);
        switch (filters.priceRange) {
          case "0-10":
            return price >= 0 && price <= 10;
          case "10-50":
            return price > 10 && price <= 50;
          case "50-100":
            return price > 50 && price <= 100;
          case "100-500":
            return price > 100 && price <= 500;
          case "500+":
            return price > 500;
          default:
            return true;
        }
      });
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "name-asc":
          return a.productName.localeCompare(b.productName);
        case "name-desc":
          return b.productName.localeCompare(a.productName);
        case "quantity-low":
          return parseFloat(a.quantity) - parseFloat(b.quantity);
        case "quantity-high":
          return parseFloat(b.quantity) - parseFloat(a.quantity);
        default:
          return 0;
      }
    });

    return result;
  }, [initialProducts, searchTerm, filters]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.brand !== "all") count++;
    if (filters.supplier !== "all") count++;
    if (filters.unit !== "all") count++;
    if (filters.stockStatus !== "all") count++;
    if (filters.priceRange !== "all") count++;
    return count;
  }, [filters]);

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      brand: "all",
      supplier: "all",
      stockStatus: "all",
      priceRange: "all",
      unit: "all",
      sortBy: "newest",
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50/50 dark:bg-gray-950 p-4 md:p-8 text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-gray-900 selection:text-white dark:selection:bg-white dark:selection:text-gray-900">
      {/* Header Section */}
      <header className=" mx-auto mb-8">
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
                {filteredProducts.length} of {initialProducts.length}{" "}
                {initialProducts.length === 1 ? "item" : "items"} in inventory
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, code, brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 rounded-xl text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:focus:ring-white focus:border-transparent transition-all shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`relative p-2.5 rounded-xl border transition-all shadow-sm ${
                  showFilters || activeFilterCount > 0
                    ? "bg-gray-950 dark:bg-white text-white dark:text-gray-950 border-gray-950 dark:border-white"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <Link href="/cart" className="relative shrink-0">
                <button className="relative cursor-pointer p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all shadow-sm active:scale-95 group shrink-0">
                  <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-[11px] rounded-full flex items-center justify-center font-bold shadow-sm">
                    {cartItems?.length || 0}
                  </span>
                </button>
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm active:scale-[0.98]">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 rounded-2xl shadow-sm animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters & Sorting
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-950 dark:focus:border-white transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, brand: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-950 dark:focus:border-white transition-all"
                >
                  <option value="all">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Supplier Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Supplier
                </label>
                <select
                  value={filters.supplier}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      supplier: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-950 dark:focus:border-white transition-all"
                >
                  <option value="all">All Suppliers</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier} value={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock Status Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Stock Status
                </label>
                <select
                  value={filters.stockStatus}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      stockStatus: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-950 dark:focus:border-white transition-all"
                >
                  {stockStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Unit Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Unit
                </label>
                <select
                  value={filters.unit}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, unit: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-950 dark:focus:border-white transition-all"
                >
                  <option value="all">All Units</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-950 dark:focus:border-white transition-all"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-950 dark:focus:border-white transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                {filters.category !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-lg">
                    Category: {filters.category}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, category: "all" }))
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.brand !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-lg">
                    Brand: {filters.brand}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, brand: "all" }))
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.supplier !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-lg">
                    Supplier: {filters.supplier}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, supplier: "all" }))
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.stockStatus !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-lg">
                    Status:{" "}
                    {
                      stockStatuses.find((s) => s.value === filters.stockStatus)
                        ?.label
                    }
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, stockStatus: "all" }))
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.priceRange !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-lg">
                    Price:{" "}
                    {
                      priceRanges.find((p) => p.value === filters.priceRange)
                        ?.label
                    }
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, priceRange: "all" }))
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.unit !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-lg">
                    Unit: {filters.unit}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, unit: "all" }))
                      }
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        {searchTerm && (
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Search className="w-4 h-4" />
            <span>
              Found {filteredProducts.length} results for "{searchTerm}"
            </span>
            <button
              onClick={() => setSearchTerm("")}
              className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </header>

      {/* Main Grid / Content Container */}
      <main className="max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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

                    <span className="px-2.5 py-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur text-[11px] font-semibold text-gray-700 dark:text-gray-300 rounded-md shadow-sm border border-gray-200/40 dark:border-gray-800/40">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Info & Content Wrapper */}
                <div className="px-5 py-2 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[20px] font-bold text-gray-950 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.productName}
                      </h3>
                      <p className="text-xs flex gap-2 items-center font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                        <Truck className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {product.brand}
                      </p>
                    </div>
                    <span className="text-[20px] font-extrabold text-gray-950 dark:text-white bg-gray-50 dark:bg-gray-800/60 px-2 py-0.5 rounded-md">
                      ${product.price}
                    </span>
                  </div>

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

                  <div className="flex justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pb-4 mb-4 border-b border-gray-100 dark:border-gray-800/60 mt-auto">
                    <span className="truncate flex items-center gap-2 font-medium">
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

                  <div className="space-y-2 shrink-0">
                    <div>
                      <AddToCartButton product={product} user={user} />
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product._id}`}
                        className="flex-1"
                      >
                        <button className="flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200/80 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all active:scale-[0.96] cursor-pointer">
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </button>
                      </Link>
                      <Link
                        href={`/products/${product._id}/edit`}
                        className="flex-1"
                      >
                        <button className="flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/80 rounded-lg transition-all active:scale-[0.96] cursor-pointer">
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                      </Link>

                      <div className="flex-1">
                        <ProductDeleteButton product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-md mx-auto text-center py-20 px-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-sm mt-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-4 border border-gray-100 dark:border-gray-700">
              {searchTerm || activeFilterCount > 0 ? (
                <Search className="w-7 h-7 text-gray-400 dark:text-gray-500" />
              ) : (
                <Package className="w-7 h-7 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-1">
              {searchTerm || activeFilterCount > 0
                ? "No products found"
                : "No products yet"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
              {searchTerm || activeFilterCount > 0
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Your inventory database is currently empty. Get started by publishing your first entry."}
            </p>
            {searchTerm || activeFilterCount > 0 ? (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4" />
                Clear All Filters
              </button>
            ) : (
              <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm active:scale-[0.98]">
                <Plus className="w-4 h-4" />
                Add Your First Product
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllProducts;
