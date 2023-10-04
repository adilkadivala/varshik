import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../Assets/Css/admin/style.css";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import ClanPop from "../layout/ClanPop";

const Clan = () => {
  const [data, setData] = useState([]);

  // GET DATA
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = () => {
    fetch("http://localhost:4000/clan")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  // DELETE DATA
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:4000/clan/${id}`)
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
          <h1>YOU ARE ON CLAN</h1>
          <ClanPop />
        </div>
        <div className="container-fluid p-0">
          <div className="row w-100 ms-0">
            <h1 className="text-center">CLAN</h1>

            {/* table code start */}
            <div>
              <div className="container " style={{ margin: "0 auto" }}>
                <table className="rwd-table">
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
                            className="btndilet "
                            type="button"
                            onClick={() => handleDelete(clan.id)}
                          >
                            {" "}
                            Delete
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
