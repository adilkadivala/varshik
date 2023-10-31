import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Css/admin/style.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Member = ({ isOpen, toggle }) => {
  const [data, setData] = useState([]);
  const [clan, setClan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // date formating
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [member, setMember] = useState({
    id: "",
    sur_name: "",
    first_name: "",
    last_name: "",
    joining_date: "",
    mobile_number: "",
    clan_id: "",
  });

  // validation
  const [errors, setErrors] = useState({
    sur_name: false,
    first_name: false,
    last_name: false,
  });

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setMember({ ...member, [fieldName]: value });
  };

  const handleBlur = (fieldName) => {
    const value = member[fieldName];
    const isNumeric = /\d/.test(value);

    if (isNumeric) {
      setErrors({ ...errors, [fieldName]: true });
    } else {
      setErrors({ ...errors, [fieldName]: false });
    }
  };

  // GET DATA
  useEffect(() => {
    fetchMemberData();
  }, []);

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
        fetchMemberData();
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };
  // save  Data
  const handleSave = (event) => {
    event.preventDefault();
    if (!member.sur_name) {
      toast.error("Sur Name is required.");
      return;
    } else if (!member.first_name) {
      toast.error("First Name is required.");
      return;
    } else if (!member.last_name) {
      toast.error("Last Name is required.");
      return;
    } else if (member.mobile_number.length < 10) {
      toast.error("Mobile Number must be at least 10 characters long.");
      return;
    } else if (!member.joining_date) {
      toast.error("Join Date is required.");
      return;
    } else if (!member.clan_id) {
      toast.error("Clan Name is required.");
      return;
    }
    const selectClan = clan.find(
      (clan) => clan.id === parseInt(member.clan_id, 10)
    );

    if (!selectClan) {
      toast.error("Invalid Clan selected.");
      return;
    }

    const makeEasy = member.sur_name.toLowerCase();
    const easyCompare = selectClan.clan_name.toLowerCase();

    if (makeEasy !== easyCompare) {
      toast.error("Surname should match the selected Clan.");
      return;
    }

    axios
      .put(`http://localhost:4000/savememberEdit/${member.id}`, member)
      .then((res) => {
        if (res.status === 200) {
          fetchMemberData();
          toast.success("Edited Successfully");
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
          fetchMemberData();
          toast.success("Deleted Succefully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filteredMembers = data.filter((member) => {
    const fullName = `${member.id} ${member.sur_name} ${member.first_name} ${member.last_name} ${member.clan_name} ${member.clan_name}`;
    return (
      member.sur_name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      member.id?.toString().includes(searchQuery?.toString()) ||
      member.mobile_number?.toString().includes(searchQuery?.toString()) ||
      member.first_name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      member.last_name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      member.clan_name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      fullName?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
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
          marginLeft: isOpen ? "70px" : "200px",
        }}
      >
        <div style={{ marginLeft: isOpen ? "0px" : "60px" }} className="bars">
          <div className="pagetitle d-flex justify-content-between">
            <h1>YOU ARE ON MEMBER</h1>

            <div
              style={{
                minWidth: "360px",
                paddingRight: "20px",
                width: "300px",
              }}
            >
              <form style={{ alignItems: "center ", width: "300px" }}>
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
                  onClick={handleSearch}
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

            <button
              className="btn btn-rounded"
              style={{ background: "#012970" }}
            >
              <NavLink to="/form" style={{ color: "#fff" }}>
                New Member
              </NavLink>
            </button>
          </div>

          <div className="container " style={{ margin: "0 auto" }}>
            <table className="table table-striped table-hover ">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Sur Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Joining Date</th>
                  <th>Mobile Number</th>
                  <th>Clan Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <th>{member.id}</th>
                    <td>{member.sur_name}</td>
                    <td>{member.first_name}</td>
                    <td>{member.last_name}</td>
                    <td>{formatDate(member.joining_date)}</td>
                    <td>{member.mobile_number}</td>
                    <td>{member.clan_name}</td>
                    <td>
                      <button
                        className="btn text-white"
                        style={{ backgroundColor: "#f72d05" }}
                        type="button"
                        onClick={() => deleteMember(member.id)}
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        className="btn text-white ms-1"
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
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {" Sur Name "}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.sur_name ? "error" : ""
                      }`}
                      value={member.sur_name}
                      onChange={(e) => handleInputChange(e, "sur_name")}
                      onBlur={() => handleBlur("sur_name")}
                      required
                    />
                    {errors.sur_name && (
                      <p className="error-message" style={{ color: "red" }}>
                        Numbers not Allowed.
                      </p>
                    )}
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
                      placeholder="First Name"
                      name="firstName"
                      className={`form-control ${
                        errors.first_name ? "error" : ""
                      }`}
                      value={member.first_name}
                      onChange={(e) => handleInputChange(e, "first_name")}
                      onBlur={() => handleBlur("first_name")}
                      required
                    />
                    {errors.first_name && (
                      <p className="error-message" style={{ color: "red" }}>
                        Numbers not Allowed.
                      </p>
                    )}
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
                      name="LastName"
                      placeholder="Last Name"
                      className={`form-control ${
                        errors.last_name ? "error" : ""
                      }`}
                      value={member.last_name}
                      onChange={(e) => handleInputChange(e, "last_name")}
                      onBlur={() => handleBlur("last_name")}
                      required
                    />
                    {errors.last_name && (
                      <p className="error-message" style={{ color: "red" }}>
                        Numbers not Allowed.
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      {"Joining Date *"}
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
                      {"MOBILE_NUMBER *"}
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
                      value={member.clan_id}
                      onChange={(e) =>
                        setMember({ ...member, clan_id: e.target.value })
                      }
                    >
                      <option value="">Select Clan *</option>
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
                    data-bs-dismiss="modal"
                    disabled={
                      !member.sur_name ||
                      !member.first_name ||
                      !member.last_name ||
                      /\d/.test(member.sur_name) ||
                      /\d/.test(member.first_name) ||
                      /\d/.test(member.last_name)
                    }
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
