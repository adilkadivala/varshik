import React from 'react';
import Dashboard from './Routes/admin/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import AllMember from './Routes/admin/AllMember';
import AllAmount from './Routes/admin/AllAmount';
import AllClan from './Routes/admin/AllClan';
import AddForm from './Routes/admin/AddForm';
// import Amountform from './Routes/admin/Amountform';



const App = () => {
  return (
    <>
      <BrowserRouter>
      <Dashboard />
      <AddForm />
      <AllMember />
      <AllAmount />
      <AllClan />
      {/* <Amountform /> */}
      </BrowserRouter>
    </>
  )
}

export default App
