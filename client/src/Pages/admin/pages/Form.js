import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import "../../../Assets/Css/admin/style.css";
import "../../../Assets/Css/admin/form.css";

const Form = () => {
  // member form start here
  const [data, setData] = useState([]);
  const [clan, setClan] = useState([]);
  const [member, setMember] = useState({
    sur_name: "",
    first_name: "",
    last_name: "",
    joining_date: "",
    mobile_number: "",
    clan_id: "",
  });

  // error

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
    
    const isNumeric = /\d/.test(value); // Check for numeric values
    const isAlphabetic = /^[A-Za-z\s]+$/.test(value); // Check for alphabetic characters and spaces
  
    if (isNumeric || !isAlphabetic) {
      setErrors({ ...errors, [fieldName]: true });
    } else {
      setErrors({ ...errors, [fieldName]: false });
    }
  };
  

  // clear form..
  const handleblank = () => {
    const blankMember = {
      sur_name: "",
      first_name: "",
      last_name: "",
      mobile_number: "",
      joining_date: "",
      clan_id: "",
    };
    setMember(blankMember);
    toast.info("Cleared Successfully");
  };

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

  // clan data
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

  // form validation and saving data

  const saveMember = () => {
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
      toast.error("Clan selection is required.");
      return;
    }

    const selectClan = clan.find(
      (clan) => clan.id === parseInt(member.clan_id, 10)
    );

    if (!selectClan) {
      toast.error("Invalid Clan selected.");
      return;
    }

    // for small and capitl
    const makeEasy = member.sur_name.toLowerCase();
    const easyCompare = selectClan.clan_name.toLowerCase();

    if (makeEasy !== easyCompare) {
      toast.error("Surname should match the selected Clan.");
      return;
    }

    // just capital

    // if (member.sur_name !== selectClan.clan_name) {
    //   toast.error("Surname should match the selected Clan.");
    //   return;
    // }

    axios
      .post("http://localhost:4000/addmember", member)
      .then((response) => {
        if (response.status === 200) {
          const blankMember = {
            sur_name: "",
            first_name: "",
            last_name: "",
            mobile_number: "",
            joining_date: "",
            clan_id: "",
          };
          setMember(blankMember);
          fetchdata();
        } else {
          console.log("Error:", response.data);
        }
        toast.success("Added Successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.warning("Seems, some things went wrong.");
      });
  };

  const handleClanChange = (e) => {
    setMember({ ...member, clan_id: e.target.value });
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

      <div id="main" className="main">
        <div className="pagetitle d-flex justify-content-between">
          <h1>Forms Section</h1>
        </div>

        {/* Member form  */}
        <section className="containerForm">
          <header>Member Form</header>
          <form action="#" className="formBody" name="memberForm">
            <div className="inputBox address">
              <div className="columnForm">
                <div className="inputBox">
                  <label>Sur Name*</label>
                  <input
                    type="text"
                    name="surName"
                    placeholder="Sur Name"
                    className={`form-control ${errors.sur_name ? "error" : ""}`}
                    value={member.sur_name}
                    onChange={(e) => handleInputChange(e, "sur_name")}
                    onBlur={() => handleBlur("sur_name")}
                    required
                  />
                  {errors.sur_name && (
                    <p className="error-message" style={{ color: "red" }}>
                      Numbers and Special charactors not Allowed.
                    </p>
                  )}
                </div>

                <div className="inputBox">
                  <label>First Name*</label>
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
                       Numbers and Special charactors not Allowed.
                    </p>
                  )}
                </div>

                <div className="inputBox">
                  <label>Last Name*</label>
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
                       Numbers and Special charactors not Allowed.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="columnForm">
              <div className="inputBox">
                <label>Mobile Number</label>

                <input
                  type="number"
                  placeholder="Mobile number"
                  name="MobileNumber"
                  value={member.mobile_number}
                  onChange={(e) =>
                    setMember({ ...member, mobile_number: e.target.value })
                  }
                  required
                />
              </div>

              <div className="inputBox">
                <label>Join Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="JoinDate"
                  placeholder="Join Date"
                  value={member.joining_date}
                  onChange={(e) =>
                    setMember({ ...member, joining_date: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="inputBox address">
              <div className="columnForm">
                <div className="select-box">
                  <select
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
            </div>

            <div className="d-flex">
              <button
                className="me-2 btn btn-success"
                onClick={handleblank}
                disabled={!member.sur_name}
              >
                Clear
              </button>


              <button
                type="button"
                className="ms-2 btn btn-primary"
                onClick={saveMember}
                disabled={
                  !member.sur_name ||
                  !member.first_name ||
                  !member.last_name ||
                  /\d/.test(member.sur_name) ||
                  /\d/.test(member.first_name) ||
                  /\d/.test(member.last_name) ||
                  !member.clan_id
                }
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Form;
