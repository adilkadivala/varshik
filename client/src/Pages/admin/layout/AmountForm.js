import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import "../../../Assets/Css/admin/style.css";
import "../../../Assets/Css/admin/form.css";

const AmountForm = () => {
  const [Data, setdata] = useState([]);
  const [amount, setAmount] = useState({
    member_id: "",
    amount: "",
    voucher_no: "",
    book_no: "",
    payment_date: "",
    payment_receiver: "",
    update_date: "",
  });

  //   date formating
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // clear form..
  const handleblank = () => {
    const blankMember = {
      first_name: "",
      middle_name: "",
      last_name: "",
      mobile_number: "",
      joining_date: "",
      clan_id: "",
    };
    setAmount(blankMember);
    toast.info("Cleared Successfully");
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get("http://localhost:4000/getmember")
      .then((response) => {
        setdata(response.Data);
      })
      .catch((error) => {
        console.log("get data", error);
      });
  };

  // ADD DATA
  const saveAmount = () => {
    axios
      .post("http://localhost:4000/addamount", amount)
      .then((response) => {
        if (response.status === 200) {
          fetchdata();
          setAmount({
            member_id: "",
            amount: "",
            voucher_no: "",
            book_no: "",
            payment_date: "",
            payment_receiver: "",
            update_date: "",
          });
        } else {
          console.log("Error:", response.data);
        }
        toast.success("Added Succefully");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  //mebber id
  const handleClanChange = (e) => {
    setAmount({ ...amount, clan_id: e.target.value });
  };

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

      <section className="containerForm">
        <header>Member Form</header>
        <form action="#" className="formBody">
          <div className="columnForm ">
            <div className="inputBox">
            <label>Voucher Number</label>
              <div className="select-box">
                <select
                  aria-label=".form-select-lg example"
                  value={amount.clan_id}
                  onChange={handleClanChange}
                >
                  <option value="">Select a Member</option>
                  {Data.map((member, index) => (
                    <option key={index} value={member.id}>
                      {member.first_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="inputBox">
              <label>Amount </label>
              <input
                type="number"
                className="form-control"
                placeholder="Amount..."
                value={amount.amount}
                onChange={(e) =>
                  setAmount({ ...amount, amount: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="columnForm">
            <div className="inputBox">
              <label>Voucher Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Voucher..."
                value={amount.voucher_no}
                onChange={(e) =>
                  setAmount({ ...amount, voucher_no: e.target.value })
                }
                required
              />
            </div>

            <div className="inputBox">
              <label>Book Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Book No..."
                value={amount.book_no}
                onChange={(e) =>
                  setAmount({ ...amount, book_no: e.target.value })
                }
                required
              />
            </div>

            <div className="inputBox">
              <label>Join Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Payment Date..."
                value={amount.payment_date}
                onChange={(e) =>
                  setAmount({
                    ...amount,
                    payment_date: formatDate(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="d-flex">
            <button
              className="me-2"
              onClick={handleblank}
              disabled={Data.length === 0}
            >
              Clear
            </button>
            <button
              type="button"
              className="ms-2 btn btn-primary"
              // data-bs-dismiss="modal"
              onClick={saveAmount}
            >
              Save{" "}
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default AmountForm;





// const [formType, setFormType] = useState("login");
