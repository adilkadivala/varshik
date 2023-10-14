import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Css/admin/style.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ClanPop from "../layout/ClanPop";

const Clan = () => {
  const [data, setData] = useState([]);
  const [clan, setClan] = useState({
    id: "",
    clan_name: "",
  });
  const [emptyAlert, setEmptyAlert] = useState(false);
  const [duplicateAlert, setDuplicateAlert] = useState(false);

  // GET DATA
  useEffect(() => {
    fetchdata();
  }, [setData]);
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

  // DELETE DATA
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:4000/deleteclan/${id}`)
        .then((res) => {
          console.log("Record deleted successfully");
          fetchdata(); // Refresh data after deletion
        })
        .catch((error) => {
          console.error("Error deleting record:", error);
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
      setEmptyAlert(true);
      setDuplicateAlert(false); // Clear any previous duplicate alert
      return;
    }

    axios
      .put(`http://localhost:4000/saveedit/${clan.id}`, clan, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // Update was successful
          // Optionally, you can display a success alert here
          setEmptyAlert(false); // Clear any previous empty alert
        } else if (response.data.error === "This clan already exists.") {
          setEmptyAlert(false); // Clear any previous empty alert
          setDuplicateAlert(true);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle other errors as needed
        setEmptyAlert(false); // Clear any previous empty alert
        setDuplicateAlert(false); // Clear any previous duplicate alert
      });
  };

  return (
    <>
      <Container />
      <main id="main" className="main">
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
          <ClanPop />
        </div>
        {emptyAlert && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Clan name is compulsory for save.
          </Alert>
        )}

        {duplicateAlert && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This clan name already exists.
          </Alert>
        )}
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((clan) => (
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
                    placeholder="Id..."
                    value={clan.id}
                    onChange={(e) => setClan({ ...clan, id: e.target.value })}
                  />
                </div>

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
      </main>
      <Footer />
    </>
  );
};

export default Clan;
