import axios from "axios";

export const fetchCategories = async () => {
  const { data } = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  return data;
};

export const fetchProducts = async (category) => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products";
  const { data } = await axios.get(url);
  return data;
};
