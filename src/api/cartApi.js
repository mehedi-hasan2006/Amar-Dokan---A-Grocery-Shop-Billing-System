import { apiRequest } from "./apiRequest";

export const addToCart = (cartData) => {
  return apiRequest(`/api/cart/`, "POST", cartData);
};

export const getCartItems = (userId) => {
  return apiRequest(`/api/cart/${userId}`, "GET");
};
