import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import { validationSchema, validation } from "../../../middelware/Validation";
import "../../../Assets/Css/admin/style.css";
import "../../../Assets/Css/admin/form.css";

const Form = () => {
  const [data, setData] = useState([]);
  const [clan, setClan] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [member, setMember] = useState({
    sur_name: "",
    first_name: "",
    last_name: "",
    joining_date: "",
    mobile_number: "",
    clan_id: "",
  });

  useEffect(() => {
    fetchdata();
    clandata();
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

  const saveMember = async () => {
    try {
      const { isValid, errors } = await validation(member);

      if (isValid) {
        if (!member.clan_id) {
          toast.error("Clan Selection is required.");
          return;
        }

        const selectClan = clan.find(
          (clan) => clan.id === parseInt(member.clan_id, 10)
        );

        if (!selectClan) {
          toast.error("Clan Selection is required.");
          return;
        }

        const makeEasy = member.sur_name.toLowerCase();
        const easyCompare = selectClan.clan_name.toLowerCase();

        if (makeEasy !== easyCompare) {
          toast.error("Surname should match the selected Clan.");
          return;
        }

        const response = await axios.post(
          "http://localhost:4000/addmember",
          member
        );

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
          toast.success("Added Successfully");
        }
      } else if (errors.allFieldsRequired) {
        toast.error(errors.allFieldsRequired);
      } else if (errors.sur_name) {
        toast.error(errors.sur_name);
      } else if (errors.first_name) {
        toast.error(errors.first_name);
      } else if (errors.last_name) {
        toast.error(errors.last_name);
      } else if (errors.mobile_number) {
        toast.error(errors.mobile_number);
      } else if (errors.joining_date) {
        toast.error(errors.joining_date);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Seems, You haven't selected a clan.");
    }
  };

  const handleClanChange = (e) => {
    setMember({ ...member, clan_id: e.target.value });
  };

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
                    className="form-control"
                    value={member.sur_name}
                    onChange={(e) =>
                      setMember({ ...member, sur_name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="inputBox">
                  <label>First Name*</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={member.first_name}
                    onChange={(e) =>
                      setMember({ ...member, first_name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="inputBox">
                  <label>Last Name*</label>
                  <input
                    type="text"
                    name="LastName"
                    placeholder="Last Name"
                    className="form-control"
                    value={member.last_name}
                    onChange={(e) =>
                      setMember({ ...member, last_name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="columnForm">
              <div className="inputBox">
                <label>Mobile Number*</label>

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
                <label>Join Date*</label>
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
