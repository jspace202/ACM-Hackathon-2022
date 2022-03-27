import React from "react";
import AppBar from "./components/AppBar";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import ParkingProvidingPage from "./pages/ParkingProviderPage";
import ParkingsListView from "./pages/ParkingsListView";
import ParkingAboutPage from "./pages/ParkingAboutPage";

class App extends React.Component {
  render() {
    return (
      <>
        <AppBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="park" element={<ParkingsListView />} />
          <Route path="rent" element={<ParkingProvidingPage />} />
          <Route path="about" element={<ParkingAboutPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
