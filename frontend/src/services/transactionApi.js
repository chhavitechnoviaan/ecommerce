import axios from "axios";

const API =
  "http://localhost:5000/api/orders";

export const getTransactionsAPI =
  async () => {

    const res =
      await axios.get(
        `${API}/transactions`
      );

    return res.data;
  };