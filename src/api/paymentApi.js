import { apiRequest } from "./apiRequest";

export const createPayment = async (data) => {
  return apiRequest("/api/payments", "POST", data);
};

export const getPayment = async (id) => {
  return apiRequest(`/api/payments/${id}`);
};

export const getPayments = async () => {
  return apiRequest("/api/payments");
};
