import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderState = useSelector((state) => state.auth.orderbyuser);

  const data1 = (orderState && orderState[0] && orderState[0].products) || [];
  console.log(data1);

  const tableData = data1.map((orderItem, index) => {
    const product = orderItem.product || {};
    const key = index + 1;

    return {
      key,
      name: product.title || "",
      brand: product.brand || "",
      count: orderItem.count || 0,
      amount: product.price || 0,
      color: product.color || "",
      date: product.createdAt || "",
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    };
  });

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </div>
  );
};

export default ViewOrder;
