import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons } from "../features/coupon/couponSlice";

const compareString = (a, b) => {
  const stringA = String(a).toLowerCase(); // Convert to string
  const stringB = String(b).toLowerCase(); // Convert to string
  if (stringA < stringB) return -1;
  if (stringA > stringB) return 1;
  return 0;
};

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => compareString(a.name, b.name),
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => compareString(a.expiry, b.expiry),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data = couponState.map((coupon, index) => ({
    key: index + 1,
    name: coupon.name,
    discount: coupon.discount,
    expiry: new Date(coupon.expiry).toLocaleString(),
    action: (
      <>
        <Link to={`/admin/coupon/${coupon._id}`} className=" fs-3 text-danger">
          <BiEdit />
        </Link>
        <button className="ms-3 fs-3 text-danger bg-transparent border-0">
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Coupon</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Couponlist;
