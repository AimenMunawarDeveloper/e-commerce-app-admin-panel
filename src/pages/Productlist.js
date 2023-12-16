import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => compareString(a.title, b.title),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => compareString(a.brand, b.brand),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => compareString(a.category, b.category),
  },
  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => compareString(a.color, b.color),
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const compareString = (a, b) => {
  const stringA = String(a).toLowerCase(); // Convert to string
  const stringB = String(b).toLowerCase(); // Convert to string
  if (stringA < stringB) return -1;
  if (stringA > stringB) return 1;
  return 0;
};

const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
