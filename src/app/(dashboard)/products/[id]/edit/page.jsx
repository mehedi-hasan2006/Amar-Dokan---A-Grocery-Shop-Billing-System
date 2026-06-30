"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Package,
  Camera,
  Link as LinkIcon,
  Trash2,
  ArrowLeft,
  Save,
  RotateCcw,
} from "lucide-react";
import { getProductById } from "@/lib/action";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import Link from "next/link";
import { updateProduct } from "@/api/productsApi";
import { toast } from "react-toastify";

export default function EditProductPage({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productId, setProductId] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    category: "",
    brand: "",
    price: "",
    costPrice: "",
    quantity: "",
    minStockAlert: "",
    unit: "kg",
    expireDate: "",
    barcode: "",
    description: "",
    imageUrl: "",
    supplier: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageMode, setImageMode] = useState("url");
  const [originalData, setOriginalData] = useState(null);
  const fileInputRef = useRef(null);

  const {
    uploadImage,
    isUploading,
    uploadProgress,
    error: uploadError,
    setError: setUploadError,
  } = useImageUpload();

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Bakery",
    "Meat",
    "Beverages",
    "Snacks",
    "Spices",
    "Grains",
    "Frozen",
  ];

  const units = ["kg", "lb", "piece", "liter", "box", "pack", "dozen"];

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        setProductId(id);

        const response = await getProductById(id);
        const product = response.data || response;

        const productData = {
          productName: product.productName || "",
          productCode: product.productCode || "",
          category: product.category || "",
          brand: product.brand || "",
          price: product.price || "",
          costPrice: product.costPrice || "",
          quantity: product.quantity || "",
          minStockAlert: product.minStockAlert || "",
          unit: product.unit || "kg",
          expireDate: product.expireDate
            ? new Date(product.expireDate).toISOString().split("T")[0]
            : "",
          barcode: product.barcode || "",
          description: product.description || "",
          imageUrl: product.imageUrl || "",
          supplier: product.supplier || "",
        };

        setFormData(productData);
        setOriginalData(productData);

        if (product.imageUrl) {
          setImagePreview(product.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to ImgBB
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: imageUrl,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasChanges = () => {
    if (!originalData) return false;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.quantity || parseFloat(formData.quantity) < 0) {
      newErrors.quantity = "Valid quantity is required";
    }
    if (!formData.minStockAlert || parseFloat(formData.minStockAlert) < 0) {
      newErrors.minStockAlert = "Valid min stock alert is required";
    }
    if (formData.costPrice && parseFloat(formData.costPrice) <= 0) {
      newErrors.costPrice = "Valid cost price is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProduct(productId, formData);

      setSuccess(true);
      setOriginalData({ ...formData });
      toast.success("Product updated successfully!");

      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      // Optionally redirect back to product details
      // setTimeout(() => {
      //   router.push(`/products/${productId}`);
      // }, 1500);
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors({ submit: "Failed to update product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (originalData) {
      setFormData({ ...originalData });
      setImagePreview(originalData.imageUrl || null);
    }
    setErrors({});
    setUploadError(null);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href={`/products/${productId}`}
                className="w-10 h-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </Link>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  Edit Product
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 ml-13">
                  Update the product information for{" "}
                  {formData.productName || "this item"}.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <span
                className={`text-sm px-3 py-1.5 rounded-lg border ${
                  hasChanges()
                    ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {hasChanges() ? "Unsaved changes" : "No changes"}
              </span>
              <Link
                href={`/products/${productId}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View Product
              </Link>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-emerald-700 dark:text-emerald-300 font-semibold">
                  Product Updated Successfully!
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                  The product information has been saved.
                </p>
              </div>
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-red-700 dark:text-red-300 font-medium">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </span>
                    Basic Information
                  </h2>

                  <div className="space-y-5">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        placeholder="e.g., Fresh Organic Tomatoes"
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.productName
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-200 dark:border-gray-700"
                        } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all`}
                      />
                      {errors.productName && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.productName}
                        </p>
                      )}
                    </div>

                    {/* Product Code & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Product Code
                        </label>
                        <input
                          type="text"
                          name="productCode"
                          value={formData.productCode}
                          onChange={handleInputChange}
                          placeholder="e.g., PROD-001"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.category
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-200 dark:border-gray-700"
                          } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all`}
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.category}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Brand & Supplier */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Brand <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          placeholder="e.g., Organic Farms"
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.brand
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-200 dark:border-gray-700"
                          } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all`}
                        />
                        {errors.brand && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.brand}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Supplier
                        </label>
                        <input
                          type="text"
                          name="supplier"
                          value={formData.supplier}
                          onChange={handleInputChange}
                          placeholder="e.g., Fresh Farms Ltd."
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter a detailed description of the product..."
                        rows="4"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    Pricing & Inventory
                  </h2>

                  <div className="space-y-5">
                    {/* Price & Cost Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Selling Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400 font-semibold">
                            $
                          </span>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
                              errors.price
                                ? "border-red-500 dark:border-red-400"
                                : "border-gray-200 dark:border-gray-700"
                            } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all`}
                          />
                        </div>
                        {errors.price && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.price}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Cost Price
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400 font-semibold">
                            $
                          </span>
                          <input
                            type="number"
                            name="costPrice"
                            value={formData.costPrice}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
                              errors.costPrice
                                ? "border-red-500 dark:border-red-400"
                                : "border-gray-200 dark:border-gray-700"
                            } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all`}
                          />
                        </div>
                        {errors.costPrice && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.costPrice}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Profit Calculator */}
                    {formData.price && formData.costPrice && (
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Profit per {formData.unit || "unit"}
                          </span>
                          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            $
                            {(
                              parseFloat(formData.price) -
                              parseFloat(formData.costPrice)
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Profit Margin</span>
                          <span>
                            {formData.price > 0
                              ? (
                                  ((parseFloat(formData.price) -
                                    parseFloat(formData.costPrice)) /
                                    parseFloat(formData.price)) *
                                  100
                                ).toFixed(1)
                              : 0}
                            %
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Quantity & Unit */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="0"
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.quantity
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-200 dark:border-gray-700"
                          } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all`}
                        />
                        {errors.quantity && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.quantity}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Unit
                        </label>
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                        >
                          {units.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Min Stock Alert & Expire Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Min Stock Alert{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="minStockAlert"
                          value={formData.minStockAlert}
                          onChange={handleInputChange}
                          placeholder="e.g., 10"
                          min="0"
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.minStockAlert
                              ? "border-red-500 dark:border-red-400"
                              : "border-gray-200 dark:border-gray-700"
                          } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all`}
                        />
                        {errors.minStockAlert && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.minStockAlert}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Expire Date
                        </label>
                        <input
                          type="date"
                          name="expireDate"
                          value={formData.expireDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                        />
                      </div>
                    </div>

                    {/* Barcode */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Barcode
                      </label>
                      <input
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        placeholder="e.g., 8901234567890"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image Upload & Actions */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Camera className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </span>
                    Product Image
                  </h2>

                  {/* Image Mode Toggle */}
                  <div className="flex gap-2 mb-6 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setImageMode("upload")}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        imageMode === "upload"
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <Upload className="w-4 h-4 inline mr-1.5" />
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode("url")}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        imageMode === "url"
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <LinkIcon className="w-4 h-4 inline mr-1.5" />
                      URL
                    </button>
                  </div>

                  {imageMode === "upload" ? (
                    <div className="space-y-4">
                      {/* Upload Area */}
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                          imagePreview
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                            : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
                        }`}
                      >
                        {imagePreview ? (
                          <div className="space-y-4">
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                              <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-1.5 mx-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="cursor-pointer space-y-3"
                          >
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Click to upload
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                PNG, JPG, GIF or WebP (max 32MB)
                              </p>
                            </div>
                          </div>
                        )}

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Uploading...
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                              {uploadProgress}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Upload Error */}
                      {uploadError && (
                        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-3 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-600 dark:text-red-400">
                            {uploadError}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                      />
                      {formData.imageUrl && (
                        <div className="mt-4 relative w-full aspect-square rounded-xl overflow-hidden">
                          <Image
                            src={formData.imageUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="submit"
                      disabled={isUploading || isSubmitting || !hasChanges()}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={!hasChanges()}
                      className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Reset Changes
                    </button>
                    <Link
                      href={`/products/${productId}`}
                      className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all border border-gray-200 dark:border-gray-700"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
