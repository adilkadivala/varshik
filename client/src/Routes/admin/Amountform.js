import React from 'react';
import { Route,Routes } from 'react-router-dom';
import AmountForm from '../../Pages/admin/layout/AmountForm';

const Amountform = () => {
  return (
    <Routes>
      <Route
          exact
          path="/amountform"
          element={
            <>
              <AmountForm />
            </>
          }
        ></Route>
    </Routes>
  )
}

export default Amountform
