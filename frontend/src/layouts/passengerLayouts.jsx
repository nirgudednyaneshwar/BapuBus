import { Outlet } from "react-router-dom";

import Header from "../components/passenger/Header";
import Footer from "../components/passenger/Footer";

function PassengerLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default PassengerLayout;