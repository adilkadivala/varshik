import React from 'react';
import { Routes, Route } from "react-router-dom";
import Clan from '../../Pages/admin/pages/Clan'
import '../../Assets/Css/admin/style.css'

const AddClan = () => {
    return (
        <>
          <Routes>
            <Route exact path="/clan" element={<>
            
            <Clan />
    
            </>}></Route>
          </Routes>
        </>
      );
}

export default AddClan
