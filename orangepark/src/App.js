import React from "react";
// import { render } from "react-dom";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  preserveDrawingBuffer: true,
  accessToken:
    "pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA"
});
class BaseMap extends React.Component {
  render() {
    return (
      <><h1>Orange Park</h1>
      <Map
      // eslint-disable-next-line
        style={"mapbox://styles/mapbox/streets-v8"}
        zoom={[10]}
        containerStyle={{
          height: "60vh",
          width: "100vw"
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[101.8224, 2.955139]} />
        </Layer>
      </Map></>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <BaseMap ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default App;
