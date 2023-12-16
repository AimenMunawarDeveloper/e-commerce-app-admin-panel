import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getCategories } from "../features/pcategory/pcategorySlice";
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
  const stringA = (a || "").toLowerCase();
  const stringB = (b || "").toLowerCase();
  if (stringA < stringB) return -1;
  if (stringA > stringB) return 1;
  return 0;
};
const Categorylist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const pCatStat = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatStat[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${pCatStat[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger bg-transparent border-0">
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Categorylist;
