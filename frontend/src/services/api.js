import axios from "axios";

const API =
  "http://localhost:5000/api/users";

// GET CUSTOMERS
export const getAllCustomersAPI =
  async () => {

    const res = await axios.get(
      `${API}/all-customers`
    );

    return res.data.customers;
  };

// GET STATS
export const getCustomerStatsAPI =
  async () => {

    const res = await axios.get(
      `${API}/customer-stats`
    );

    return res.data.stats;
  };