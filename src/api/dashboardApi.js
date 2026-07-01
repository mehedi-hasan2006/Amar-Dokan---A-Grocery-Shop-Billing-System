import { apiRequest } from "./apiRequest";

// Dashboard Stats
export const getDashboardStats = (timeFilter = "today") => {
  return apiRequest(`/api/dashboard/stats?filter=${timeFilter}`);
};

// Products
export const getProducts = () => {
  return apiRequest("/api/products");
};

// Payments
export const getPayments = (timeFilter = "today") => {
  return apiRequest(`/api/payments?filter=${timeFilter}`);
};
