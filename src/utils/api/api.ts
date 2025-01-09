const BASE_URL = "https://staging.mazaady.com/api/v1";

const headers = {
  "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/get_all_cats`, {
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const fetchProperties = async (subcategoryId: number) => {
  const response = await fetch(`${BASE_URL}/properties?cat=${subcategoryId}`, {
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch properties");
  return response.json();
};

export const fetchChildOptions = async (optionId: string) => {
  const response = await fetch(`${BASE_URL}/get-options-child/${optionId}`, {
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch child options");
  return response.json();
};
