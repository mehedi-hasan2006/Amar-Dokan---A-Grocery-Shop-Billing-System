import { apiRequest } from "./apiRequest";

// Get all products
export const getProducts = () => {
  return apiRequest("/api/products");
};

// Add product
export const addProduct = (data) => {
  return apiRequest("/api/products", "POST", data);
};

// Update product
export const updateProduct = (id, data) => {
  return apiRequest(`/api/products/${id}`, "PATCH", data);
};

// Delete product
export const deleteProduct = (id) => {
  return apiRequest(`/api/products/${id}`, "DELETE");
};
