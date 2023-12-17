// authServices.js
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json",
  },
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  try {
    const response = await axios.get(`${base_url}user/getallorders`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Re-throw the error to be caught by the Redux rejection logic
  }
};

const authService = {
  login,
  getOrders,
};

export default authService;
