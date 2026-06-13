// server action file
"use server";

const baseURL = process.env.SERVER_URL;

// api for adding new products to the db

export const createProduct = async (productData) => {
  try {
    const res = await fetch(`${baseURL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async () => {
  const res = await fetch(`${baseURL}/api/products`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${baseURL}/api/products/${id}`);
  return res.json();
};
