import axios from "axios";

const API = "http://localhost:5000/api/orders";


// GET ALL ORDERS
export const getAllOrdersAPI = async () => {

  const res = await axios.get(`${API}/all`);

  return res.data;
};



// UPDATE STATUS
export const updateOrderStatusAPI = async (
  orderId,
  status
) => {

  const res = await axios.put(`${API}/status`, {
    orderId,
    status,
  });

  return res.data.order;
};


export const getOrderStatsAPI = async () => {

  const { data } = await axios.get(
    `${API}/stats`
  );

  return data;
};