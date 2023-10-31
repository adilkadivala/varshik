import React from "react";
import { Route, Routes } from "react-router-dom";
import Form from "../../Pages/admin/pages/Form";

const AddForm = () => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/form"
          element={
            <>
              <Form />
            </>
          }
        ></Route>
        
      </Routes>
    </>
  );
};

export default AddForm;
