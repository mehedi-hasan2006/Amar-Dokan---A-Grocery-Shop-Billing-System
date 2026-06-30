"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { deleteProduct } from "@/api/productsApi";

const ProductDeleteButton = ({ product }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteProduct(product._id);
    if (!res.success) {
      toast.error("Something went wrong!");
      setIsDeleteOpen(false);
      return;
    }
    window.location.reload();
    toast.success(`${product.productName} deleted successfully!`);
    setIsDeleteOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setIsDeleteOpen(true)}
          variant="destructive"
          className="flex items-center justify-center px-2 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/80 rounded-lg transition-all active:scale-[0.96] cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Item"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="shrink-0">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Are you sure?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This action cannot be undone. This will permanently delete{" "}
                <span className="font-semibold "> {product.productName}</span>{" "}
                and remove all associated data.
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
            <div className="flex">
              <div className="shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">
                  <strong>Warning:</strong> This is a destructive action that
                  cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => setIsDeleteOpen(false)}
              variant="secondary"
              className="flex items-center justify-center px-2 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200/80 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all active:scale-[0.96] cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="flex items-center justify-center px-2 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/80 rounded-lg transition-all active:scale-[0.96] cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ProductDeleteButton;
