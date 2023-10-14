import React, { useEffect, useState } from "react";
import axios from "axios";

const AmountPop = () => {
  const [data, setdata] = useState([]);
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
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get("http://localhost:4000/getmember")
      .then((response) => {
        setdata(response.data);
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
        } else {
          console.log("Error:", response.data);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  
  return (
    <>
      <div className=" main">
        <button
          type="button"
          className="btn text-white"
          style={{ backgroundColor: "#012970" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Amount
        </button>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form method="post" action="#">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-dark"
                  id="exampleModalLabel"
                >
                  ADD AMOUNT
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              
              <div className="modal-body">
                             
                <div className="mb-3">
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    value={amount.member_id}
                    onChange={(e) =>
                      setAmount({ ...amount, member_id: e.target.value })
                    }
                  >
                    {" "}
                    MEMBER ID
                    {data.map((member, index) => (
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
                    {" "}
                    Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount..."
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
                    {" "}
                    voucher_no:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Voucher..."
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
                    {" "}
                    book_no:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Book No..."
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
                    {" "}
                    Payment Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Payment Date..."
                    value={amount.payment_date}
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
                    {" "}
                    payment_receiver:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Payment Receiver..."
                    value={amount.payment_receiver}
                    onChange={(e) =>
                      setAmount({ ...amount, payment_receiver: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {" "}
                    update_date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Update Date..."
                    value={amount.update_date}
                    onChange={(e) =>
                      setAmount({ ...amount, update_date: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={saveAmount}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AmountPop;
