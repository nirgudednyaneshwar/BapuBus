import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import PassengerHome from "../pages/passenger/PassengerHome";
import AdminHome from "../pages/admin/AdminHome";
import PassengerLayout from "../layouts/passengerLayouts";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Passenger Layout */}
        <Route element={<PassengerLayout />}>

          <Route path="/" element={<PassengerHome />} />

        </Route>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminHome />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;