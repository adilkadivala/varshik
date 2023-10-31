import React from "react";
import { Routes, Route } from "react-router-dom";
import Clan from "../../Pages/admin/pages/Clan";

const AddClan = () => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/clan"
          element={
            <>
              <Clan />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default AddClan;
