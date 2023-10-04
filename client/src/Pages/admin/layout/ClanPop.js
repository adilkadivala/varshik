
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClanPop = () => {

     const [data, setdata] = useState([]);
  const [clan, setclan] = useState({
    id: "",
    clan_name: "",
  });

  // GET DATA
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    axios
      .get("http://localhost:4000/clan")
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.log("get data", error);
      });
  };
  const navigate = useNavigate();

  // ADD DATA
  const saveProduct = () => {
    axios
      .post("http://localhost:4000/addclan", { clan_name: clan.clan_name })
      .then((response) => {
        if (response.status === 200) {
          fetchdata();
        } else {
          console.log("error:", response.data);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ADD+
      </button>
      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content text-white"
            style={{ backgroundColor: "#263043" }}
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
                  clan name
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="clan name"
                  className="form-control text-center"
                  value={clan.clan_name}
                  onChange={(e) =>
                    setclan({ ...clan, clan_name: e.target.value })
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
                onClick={saveProduct}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClanPop
