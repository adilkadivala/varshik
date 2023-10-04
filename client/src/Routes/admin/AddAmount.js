import React from 'react';
import { Routes, Route } from "react-router-dom";
import Amount from '../../Pages/admin/pages/Amount';
import '../../Assets/Css/admin/style.css'

const AddAmount = () => {
    return (
        <>
          <Routes>
            <Route exact path="/amount" element={<>
            
            <Amount />
    
            </>}></Route>
          </Routes>
        </>
      );
}

export default AddAmount
