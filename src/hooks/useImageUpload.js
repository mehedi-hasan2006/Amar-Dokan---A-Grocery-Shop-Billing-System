// hooks/useImageUpload.js
"use client";

import { useState } from "react";
import { uploadToImgBB } from "@/lib/imageUpload";

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    if (!file) return null;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
      return null;
    }

    // Validate file size (max 32MB for ImgBB)
    if (file.size > 32 * 1024 * 1024) {
      setError("Image size must be less than 32MB");
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API key not configured");
      }

      const result = await uploadToImgBB(file, apiKey);

      clearInterval(progressInterval);
      setUploadProgress(100);

      return result.url;
    } catch (err) {
      setError(err.message || "Upload failed");
      return null;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return {
    uploadImage,
    isUploading,
    uploadProgress,
    error,
    setError,
  };
}
