const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // change when deployed

export const apiRequest = async (endpoint, method = "GET", data = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("API Error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
