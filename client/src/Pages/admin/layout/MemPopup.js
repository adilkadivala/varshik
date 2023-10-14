import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MemPopup() {
  const [data, setData] = useState([]);
  const [member, setMember] = useState({
    id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    joining_date: "",
    mobile_number: "",
    clan_id: "" // Ensure clan_id is initially an empty string
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get("http://localhost:4000/clan")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("get data", error);
      });
  };

  // ADD DATA
  const saveMember = () => {
    axios
      .post("http://localhost:4000/addmember", member)
      .then((response) => {
        if (response.status === 200) {
          fetchdata();
        } else {
          console.log("Error:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  const handleClanChange = (e) => {
    setMember({ ...member, clan_id: e.target.value });
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
          Add Mem
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
                  ADD MEMBER
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
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {" "}
                    Id:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter id..."
                    value={member.id}
                    onChange={(e) =>
                      setMember({ ...member, id: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {" "}
                    Clan Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Clan Name..."
                    value={member.first_name}
                    onChange={(e) =>
                      setMember({ ...member, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {" "}
                    First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name..."
                    value={member.middle_name}
                    onChange={(e) =>
                      setMember({ ...member, middle_name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {" "}
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name..."
                    value={member.last_name}
                    onChange={(e) =>
                      setMember({ ...member, last_name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {" "}
                    Mobile Number:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Mobile Number..."
                    value={member.mobile_number}
                    onChange={(e) =>
                      setMember({ ...member, mobile_number: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {" "}
                    Joining Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Joining Date..."
                    value={member.joining_date}
                    onChange={(e) =>
                      setMember({ ...member, joining_date: e.target.value })
                    }
                  />
                </div>

                <div className="mt-3">
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    value={member.clan_id}
                    onChange={handleClanChange}
                  >
                    <option value="">Select a Clan</option>
                    {data.map((clan, index) => (
                      <option key={index} value={clan.id}>
                        {clan.clan_name}
                      </option>
                    ))}
                  </select>
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
                  onClick={saveMember}
                >
                  Save{" "}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
