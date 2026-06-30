// lib/imageUpload.js

/**
 * Upload image to ImgBB
 * @param {File} file - The image file to upload
 * @param {string} apiKey - Your ImgBB API key
 * @returns {Promise<{url: string, delete_url: string}>}
 */
export async function uploadToImgBB(file, apiKey) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (data.success) {
      return {
        url: data.data.url,
        display_url: data.data.display_url,
        delete_url: data.data.delete_url,
        thumb: data.data.thumb?.url,
        medium: data.data.medium?.url,
      };
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}

/**
 * Upload multiple images to ImgBB
 * @param {File[]} files - Array of image files
 * @param {string} apiKey - Your ImgBB API key
 * @returns {Promise<Array<{url: string, delete_url: string}>>}
 */
export async function uploadMultipleToImgBB(files, apiKey) {
  const uploadPromises = files.map((file) => uploadToImgBB(file, apiKey));
  return Promise.all(uploadPromises);
}
