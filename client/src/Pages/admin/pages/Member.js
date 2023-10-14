import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Css/admin/style.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import MemPopup from "../layout/MemPopup";

const Member = () => {
  const [data, setData] = useState([]);
  const [clan, setClan] = useState([]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [member, setMember] = useState({
    id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    joining_date: "",
    mobile_number: "",
    clan_id: "",
  });

  // GET DATA
  useEffect(() => {
    fetchMemberData();
  }, [data]);

  const fetchMemberData = () => {
    axios
      .get("http://localhost:4000/getmember") // Updated route
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching member data:", error);
      });
  };

  // edit selector
  useEffect(() => {
    clandata();
  }, []);

  const clandata = () => {
    axios
      .get("http://localhost:4000/clan")
      .then((response) => {
        setClan(response.data);
      })
      .catch((error) => {
        console.log("get data", error);
      });
  };

  // Edit Data

  const editMember = (id) => {
    axios
      .get(`http://localhost:4000/editmember/${id}`)
      .then((res) => {
        setMember(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleSave = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:4000/savememberEdit/${member.id}`, member)
      .then((res) => {
        if (res.status === 200) {
          // Successful update, perform any necessary actions (e.g., refreshing data)
          clandata();
        } else {
          console.log("Error:", res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // DELETE DATA
  const deleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:4000/deletemember/${id}`)
        .then(() => {
          console.log("object");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container />
      <main id="main" className="main">
        <div className="pagetitle d-flex justify-content-between">
        <h1>YOU ARE ON MEMBER</h1>

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
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <MemPopup />
        </div>
        <div className="container " style={{ margin: "0 auto" }}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Clan Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Joining Date</th>
                <th>Mobile Number</th>
                <th>Clan Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((member) => (
                <tr key={member.id}>
                  <th>{member.id}</th>
                  <td>{member.first_name}</td>
                  <td>{member.middle_name}</td>
                  <td>{member.last_name}</td>
                  <td>{formatDate(member.joining_date)}</td>
                  <td>{member.mobile_number}</td>
                  <td>{member.clan_id}</td>

                  <td>
                    <button
                      className="btn text-white"
                      style={{ backgroundColor: "#f72d05" }}
                      type="button"
                      onClick={() => deleteMember(member.id)}
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
                      onClick={() => editMember(member.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                  Edit Member
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                {/* <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {"ID"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Id..."
                    value={member.id}
                    onChange={(e) =>
                      setMember({ ...member, id: e.target.value })
                    }
                  />
                </div> */}

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {" CLAN_NAME "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Clan Name..."
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
                    {"FIRST_NAME "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name..."
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
                    {"LAST_NAME"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name..."
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
                    {"Joining Date"}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="joining_date..."
                    value={formatDate(member.joining_date)}
                    onChange={(e) =>
                      setMember({ ...member, joining_date: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    {"MOBILE_NUMBER"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Clan Name..."
                    value={member.mobile_number}
                    onChange={(e) =>
                      setMember({ ...member, mobile_number: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    value={member.clan_id} // Use member.clan_id to set the selected clan
                    onChange={(e) =>
                      setMember({ ...member, clan_id: e.target.value })
                    }
                  >
                    <option value="">Select Clan</option>
                    {clan.map((clan, index) => (
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
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Member;
