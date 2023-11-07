import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Css/admin/style.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import AmountPop from "../layout/AmountPop";
// import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Member = ({ isOpen, toggle }) => {
  const [data, setData] = useState([]);
  const [member, setMember] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // date formating
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [amount, setAmount] = useState({
    id: "",
    member_id: "",
    amount: "",
    voucher_no: "",
    book_no: "",
    payment_date: "",
    payment_receiver: "",
    update_date: "",
  });

  // GET DATA
  useEffect(() => {
    fetchAmountData();
  }, []);

  const fetchAmountData = () => {
    axios
      .get("http://localhost:4000/amount") // Updated route
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching member data:", error);
      });
  };

  // edit selector
  useEffect(() => {
    memberdata();
  }, []);

  const memberdata = () => {
    axios
      .get("http://localhost:4000/getmember")
      .then((response) => {
        setMember(response.data);
      })
      .catch((error) => {
        console.log("get data", error);
      });
  };

  // Edit Data

  const editMember = (id) => {
    axios
      .get(`http://localhost:4000/geteditamount/${id}`)
      .then((res) => {
        setAmount(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleSave = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:4000/saveeditamount/${amount.id}`, amount)
      .then((res) => {
        if (res.status === 200) {
          fetchAmountData();
          toast.success("Edited Succefully");
        } else {
          console.log("Error:", res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // DELETE DATA
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:4000/deleteamount/${id}`)
        .then(() => {
          fetchAmountData();
          toast.success("Deleted Succefully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filterdAmount = data.filter((amount) => {
    const fullResult = `${amount.member_id} ${amount.payment_receiver}`;
    return (
      amount.member_id?.toString().includes(searchQuery?.toString()) ||
      amount.payment_receiver
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      fullResult?.toString().toLowerCase().includes(searchQuery?.toLowerCase())
    );
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Container />
      <div
        id="main"
        className="main"
        style={{
          width: isOpen ? "80%" : "83%",
          marginLeft: isOpen ? "70px" : "230px",
        }}
      >
        <div style={{ marginLeft: isOpen ? "0px" : "10px" }} className="bars">
          <div className="pagetitle d-flex justify-content-between">
            <h1>YOU ARE ON AMOUNT</h1>

            <div
              style={{
                minWidth: "360px",
                paddingRight: "20px",
                width: "300px",
              }}
            >
              <form
                style={{ alignItems: "center ", width: "300px" }}
                method="POST"
                action=""
              >
                <input
                  style={{
                    fontSize: "14px",
                    color: "#012970",
                    border: "1px solid rgba(1, 41, 112, 0.2)",
                    padding: "7px 38px 7px 8px",
                    borderRadius: "3px",
                    transition: "0.3s",
                  }}
                  name="query"
                  placeholder="Search"
                  title="Enter search keyword"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button
                  type="submit"
                  title="search"
                  style={{
                    borderRadius: "0",
                    border: "0",
                    padding: "0",
                    marginLeft: " -30px",
                    background: " none",
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            <AmountPop />
            
          </div>

          <div className="container " style={{ margin: "0 auto" }}>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Member Id</th>
                  <th>Amount</th>
                  <th>Voucher No</th>
                  <th>Book No</th>
                  <th>Payment Date</th>
                  <th>Payment Receiver</th>
                  <th>Update Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterdAmount.map((amount) => (
                  <tr key={amount.id}>
                    <th>{amount.id}</th>
                    <td>{amount.member_id}</td>
                    <td>{amount.amount}</td>
                    <td>{amount.voucher_no}</td>
                    <td>{amount.book_no}</td>
                    <td>{formatDate(amount.payment_date)}</td>
                    <td>{amount.payment_receiver}</td>
                    <td>{formatDate(amount.update_date)}</td>

                    <td>
                      <button
                        className="btn text-white"
                        style={{ backgroundColor: "#f72d05" }}
                        type="button"
                        onClick={() => handleDelete(amount.id)}
                      >
                        {" "}
                        Delete
                      </button>{" "}
                      <button
                        type="button"
                        className="btn text-white"
                        style={{ backgroundColor: "#1e7530" }}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => editMember(amount.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* edit popup */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Edit Amount
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {" member_id "}
                    </label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      value={amount.member_id}
                      onChange={(e) =>
                        setAmount({ ...amount, member_id: e.target.value })
                      }
                    >
                      <option value="">Select Memebr Id</option>
                      {member.map((member, index) => (
                        <option key={index} value={member.id}>
                          {member.first_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {"Amount"}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="amount..."
                      value={amount.amount}
                      onChange={(e) =>
                        setAmount({ ...amount, amount: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {"Voucher No"}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Voucher No..."
                      value={amount.voucher_no}
                      onChange={(e) =>
                        setAmount({ ...amount, voucher_no: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {"Book No"}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Voucher No..."
                      value={amount.book_no}
                      onChange={(e) =>
                        setAmount({ ...amount, book_no: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {"Payment Date"}
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Payment Date..."
                      value={formatDate(amount.payment_date)}
                      onChange={(e) =>
                        setAmount({ ...amount, payment_date: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {"Payment Receiver"}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Clan Name..."
                      value={amount.payment_receiver}
                      onChange={(e) =>
                        setAmount({
                          ...amount,
                          payment_receiver: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {"Update Date"}
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Update Date..."
                      value={formatDate(amount.update_date)}
                      onChange={(e) =>
                        setAmount({ ...amount, update_date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#f72d05" }}
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn text-white"
                    style={{ backgroundColor: "#1e7530" }}
                    onClick={handleSave}
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Member;
