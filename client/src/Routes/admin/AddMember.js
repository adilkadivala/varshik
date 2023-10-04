import React from "react";
import { Routes, Route } from "react-router-dom";
import Member from '../../Pages/admin/pages/Member'
import '../../Assets/Css/admin/style.css'

const AddMember = () => {
  return (
    <>
      <Routes>
        <Route exact path="/member" element={<>
        
        <Member />

        </>}></Route>
      </Routes>
    </>
  );
};

export default AddMember;
