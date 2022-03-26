import React from "react";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";

import { db } from './firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import ListView from "./ListView";

import { GeolocateControl } from "mapbox-gl";
import { Marker, Popup } from "react-mapbox-gl";
import AppBar from "./components/AppBar";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import ParkingProvidingPage from "./pages/ParkingProviderPage";


const Map = ReactMapboxGl({
  preserveDrawingBuffer: true,
  accessToken:
    "pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA"
});
class BaseMap extends React.Component {
  render() {
    const onMapLoad = map => { map.addControl(new GeolocateControl()); };


    return (
      <>
        <Map
          // eslint-disable-next-line
          style={"mapbox://styles/mapbox/streets-v8"}
          onStyleLoad={onMapLoad}
          zoom={[10]}
          containerStyle={{
            height: "60vh",
            width: "100vw"
          }}
        >
          <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[101.8224, 2.955139]} />
          </Layer>
          <ZoomControl position='bottom-right' />
          <Marker
            coordinates={[-0.2416815, 51.5285582]}
            anchor="bottom">
            <img src={"markerUrl"} />
          </Marker>


          <Popup
            coordinates={[-0.13235092163085938, 51.518250335096376]}
            offset={{
              'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}>
            <h1>Popup</h1>
          </Popup>
        </Map></>
    );
  }
}

const TempButton = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'spots'), {
        name: "name",
        address: "address",
        price: "price",
        created: Timestamp.now()
      })
    } catch (err) {
      alert(err)
    }
  }
  return (
    <button onClick={handleSubmit}>Testing button</button>
  )
}


class ParkMap extends React.Component {
  render() {
    return (
      <>
        <BaseMap ref={el => (this.componentRef = el)} /><TempButton /><ListView />
      </>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <>
        <AppBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="park" element={<ParkMap />} />
          <Route path="rent" element={<ParkingProvidingPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
