"use client";
import { addToCart } from "@/api/cartApi";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

export default function AddToCartButton({ product, user }) {
  const handleAddToCart = async () => {
    // Add product to cart
    const cartData = {
      productId: product._id,
      productName: product.productName,
      productCode: product.productCode,
      category: product.category,
      unit: product.unit,
      price: product.price,
      quantity: 1,
      brand: product.brand,
      productImage: product.imageUrl,
      userId: user?.id,
      userName: user?.name,
    };

    // Call the API to add the product to the cart
    try {
      const res = await addToCart(cartData);
      if (res.success) {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="w-full bg-gray-950 dark:bg-white text-white dark:text-gray-950 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
}
