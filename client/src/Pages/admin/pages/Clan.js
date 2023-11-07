import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Css/admin/style.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Clan = ({ isOpen, toggle }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [clan, setClan] = useState({
    clan_name: "",
  });

  // add pop
  const [addclan, setaddclan] = useState({
    id: "",
    clan_name: "",
  });

  // validation

  const [errors, setErrors] = useState({
    clan_name: false,
  });

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setaddclan({ ...addclan, [fieldName]: value });
  };

  const handleBlur = (fieldName) => {
    const value = addclan[fieldName];
    const hasNumber = /\d/.test(value);

    if (hasNumber) {
      setErrors({ ...errors, [fieldName]: true });
    } else {
      setErrors({ ...errors, [fieldName]: false });
    }
  };

  // GET DATA
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get("http://localhost:4000/clan")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // save added data
  const saveClan = () => {
    if (!addclan.clan_name || addclan.clan_name.trim() === "") {
      toast.error("Clan name is required");
      return;
    }

    axios
      .post("http://localhost:4000/addclan", { clan_name: addclan.clan_name })
      .then((response) => {
        fetchdata();
        if (response.status === 200) {
          setaddclan({
            id: "",
            clan_name: "",
          });
          toast.success("New Clan Added Succefully");
        } else {
          console.log("error:", response.data);
        }
      })
      .catch((err) => {
        // console.log("err", err);
        toast.error("Clan name is already exist");
      });
  };

  // DELETE DATA
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:4000/deleteclan/${id}`)
        .then((res) => {
          toast.success("Deleted Succefully");
          fetchdata();
        })
        .catch((error) => {
          toast.error("This Data is used as Primary kea");
        });
    }
  };

  // Edit Data
  const editClan = (id) => {
    axios
      .get(`http://localhost:4000/editclan/${id}`)
      .then((res) => {
        setClan(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  // saveEdit

  const handleSave = (event) => {
    event.preventDefault();
    if (!clan.clan_name || clan.clan_name.trim() === "") {
      toast.error("Clan name is required");
      return;
    }

    axios
      .put(`http://localhost:4000/saveedit/${clan.id}`, clan)
      .then((res) => {
        if (res.status === 200) {
          fetchdata();
          toast.success("Clan Data edited Successfully");
        } else {
          console.log("Error:", res.data);
          toast.error("This clan already exists");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("This is unknown error");
      });
  };

  // Filter data based on searchQuery
  const filteredData = data.filter((clan) => {
    const fullSearch = `${clan.id} ${clan.clan_name}`;
    return (
      clan.clan_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clan.id.toString().includes(searchQuery.toString()) ||
      fullSearch?.toString().toLowerCase().includes(searchQuery?.toLowerCase())
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
        <div style={{ marginLeft: isOpen ? "0px" : "60px" }} className="bars">
          <div className="pagetitle d-flex justify-content-between">
            <h1>YOU ARE ON CLAN</h1>

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
                  placeholder="Search"
                  title="Enter search keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: "#012970" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              New Clan
            </button>
          </div>

          {/* clan table */}
          <div className="container-fluid p-0">
            <div className="row w-100 ms-0">
              {/* table code start */}
              <div>
                <div className="container " style={{ margin: "0 auto" }}>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Clan</th>
                        <th colSpan={2}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((clan) => (
                        <tr key={clan}>
                          <th>{clan.id}</th>
                          <td>{clan.clan_name}</td>
                          <td>
                            <button
                              className="btn text-white"
                              style={{ backgroundColor: "#f72d05" }}
                              type="button"
                              onClick={() => handleDelete(clan.id)}
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
                              onClick={() => editClan(clan.id)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* edit clan */}
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
                    Edit clan
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
                      {" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Clan Name..."
                      value={clan.clan_name}
                      onChange={(e) =>
                        setClan({ ...clan, clan_name: e.target.value })
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

      {/* add clan modal */}
      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ color: "#012970", backgroundColor: "#f6f9ff" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ADD CLAN
              </h5>
              <button
                type="button"
                className="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div>
                <label htmlFor="title" style={{ paddingBottom: "5px" }}>
                  Clan Name
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Clan Name"
                  className={`form-control ${errors.clan_name ? "error" : ""}`}
                  value={addclan.clan_name}
                  onChange={(e) => handleInputChange(e, "clan_name")}
                  onBlur={() => handleBlur("clan_name")}
                />
                {errors.clan_name && (
                  <p className="error-message" style={{ color: "red" }}>
                    Numbers not allowed in Clan Name.
                  </p>
                )}
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
                onClick={saveClan}
                className="btn btn-primary"
                data-bs-dismiss="modal"
                disabled={!clan.clan_name}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clan;
