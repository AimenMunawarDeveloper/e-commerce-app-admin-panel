// Customers.js
import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => {
      const nameA = (a.name || "").toLowerCase();
      const nameB = (b.name || "").toLowerCase();

      // Compare names directly
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const customerState = useSelector((state) => state.customer.customers);
  
  const data1 = customerState
    .filter(customer => customer.role !== "admin")
    .map((customer, index) => ({
      key: index + 1,
      name: `${customer.firstname} ${customer.lastname}`,
      email: customer.email,
      mobile: customer.mobile,
    }));

  const pagination = {
    pageSize: 10, // Number of items per page
    total: data1.length, // Total number of items
    showSizeChanger: true, // Option to change the number of items per page
    showQuickJumper: true, // Option to jump to a specific page
  };

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} pagination={pagination} />
      </div>
    </div>
  );
};

export default Customers;
