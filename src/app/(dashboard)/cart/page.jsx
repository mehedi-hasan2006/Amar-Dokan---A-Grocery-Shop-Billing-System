import { getCartItems } from "@/api/cartApi";
import { userSessionData } from "@/lib/user/userSessionData";
import React from "react";
import CartClient from "../_components/Cart/CartClient";

export default async function CartPage() {
  const user = await userSessionData();
  const cartItems = await getCartItems(user?.id);

  return <CartClient initialCartItems={cartItems || []} user={user} />;
}
