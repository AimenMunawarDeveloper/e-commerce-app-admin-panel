import axios from "axios";
import { base_url } from "../../utils/base_url";
const getAllCoupons = async () => {
  try {
    const response = await axios.get(`${base_url}coupon/`);
    return response.data;
  } catch (error) {
    throw error; // Ensure errors are thrown for proper handling
  }
};

const couponService = { getAllCoupons };

export default couponService;
