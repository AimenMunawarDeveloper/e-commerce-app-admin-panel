import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const enqState = useSelector((state) => state.enquiry.enquiries);

  const data1 = enqState.map((enquiry, index) => ({
    key: index + 1,
    name: enquiry.name,
    email: enquiry.email,
    mobile: enquiry.mobile,
    status: (
      <select
        name=""
        defaultValue={enquiry.status ? enquiry.status : "Submitted"}
        className="form-control form-select"
        onChange={(e) =>
          dispatch({
            type: "enquiry/updateEnquiryStatus", // Update this with your actual action type
            payload: { id: enquiry._id, status: e.target.value },
          })
        }
      >
        <option value="Submitted">Submitted</option>
        <option value="Contacted">Contacted</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    ),
    action: (
      <>
        <Link className="ms-3 fs-3 text-danger" to={`/admin/enquiries/${enquiry._id}`}>
          <AiOutlineEye />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() =>
            dispatch({
              type: "enquiry/deleteEnquiry", // Update this with your actual action type
              payload: enquiry._id,
            })
          }
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  useEffect(() => {
    // Dispatch the getEnquiries action when the component mounts or when CRUD operations are performed
    dispatch(getEnquiries());
  }, [dispatch]);

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
