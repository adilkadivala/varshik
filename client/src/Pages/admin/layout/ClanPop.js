import React, { useEffect, useState } from "react";
import axios from "axios";

const ClanPop = () => {
  const [clan, setclan] = useState({
    id: "",
    clan_name: "",
  });

  const saveClan = () => {
    axios
      .post("http://localhost:4000/addclan", { clan_name: clan.clan_name })
      .then((response) => {
        if (response.status === 200) {
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
        className="btn text-white"
        style={{ backgroundColor: "#012970" }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        New Clan
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
                  clan name
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="clan name"
                  className="form-control"
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
                onClick={saveClan}
                className="btn btn-primary"
                data-bs-dismiss="modal"
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

export default ClanPop;
