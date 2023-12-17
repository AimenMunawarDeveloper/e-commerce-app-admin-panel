import axios from "axios";
import { base_url } from "../../utils/base_url";
const getAllCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`);

  return response.data;
};
const couponService = { getAllCoupons };

export default couponService;
