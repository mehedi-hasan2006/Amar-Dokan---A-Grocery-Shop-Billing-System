import { getProducts } from "@/lib/action";
import React from "react";
import { userSessionData } from "@/lib/user/userSessionData";
import { getCartItems } from "@/api/cartApi";

import UserProduct from "@/components/UserProduct/UserProduct";

async function UserProductPage() {
  const products = await getProducts();
  const user = await userSessionData();
  const cartItems = await getCartItems(user?.id);

  return (
    <div className="min-h-screen w-full bg-gray-50/50 dark:bg-gray-950 p-4 md:p-8 text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-gray-900 selection:text-white dark:selection:bg-white dark:selection:text-gray-900">
      <UserProduct products={products} user={user} cartItems={cartItems} />
    </div>
  );
}

export default UserProductPage;
