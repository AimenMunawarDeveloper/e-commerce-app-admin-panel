import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

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
    title: "Action",
    dataIndex: "action",
  },
];

// Function to compare strings (case-insensitive)
const compareString = (a, b) => {
  const stringA = String(a).toLowerCase();
  const stringB = String(b).toLowerCase();
  if (stringA < stringB) return -1;
  if (stringA > stringB) return 1;
  return 0;
};

const Brandlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);

  const data1 = brandState
    .filter((brand) => brand.role !== "admin")
    .map((brand, index) => ({
      key: index + 1,
      name: brand.title,
      action: (
        <>
          <Link to={`/admin/brand/${brand._id}`} className="fs-3 text-danger">
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
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Brandlist;
