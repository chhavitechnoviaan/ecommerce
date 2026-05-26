// src/services/productService.js

import axios from "axios";

const API = "http://localhost:5000/api/products";

// ================= CREATE PRODUCT =================

export const createProductAPI = async (formData) => {
  const { data } = await axios.post(
    `${API}/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ================= GET PRODUCTS =================

export const getProductsAPI = async () => {
  const { data } = await axios.get(
    `${API}/all`
  );

  return data;
};

// ================= UPDATE PRODUCT =================

export const updateProductAPI = async (
  id,
  formData
) => {
  const { data } = await axios.put(
    `${API}/update/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ================= DELETE PRODUCT =================

export const deleteProductAPI = async (
  id
) => {
  const { data } = await axios.delete(
    `${API}/${id}`
  );

  return data;
};