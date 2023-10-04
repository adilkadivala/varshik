import React from 'react';
import Dashboard from './Routes/admin/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import AddMember from './Routes/admin/AddMember';
import AddAmount from './Routes/admin/AddAmount';
import AddClan from './Routes/admin/AddClan';



const App = () => {
  return (
    <>
      <BrowserRouter>
      <Dashboard />
      <AddMember />
      <AddAmount />
      <AddClan />
      </BrowserRouter>
    </>
  )
}

export default App
