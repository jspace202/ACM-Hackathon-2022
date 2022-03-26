import React from "react";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";

import ListView from "../ListView";

import { GeolocateControl } from "mapbox-gl";
import { Marker, Popup } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    preserveDrawingBuffer: true,
    accessToken:
        "pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA"
});

const coordinates = [21.13235092163085938, 51.518250335096376];
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
                    center={coordinates}
                >
                    <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
                        <Feature coordinates={coordinates} />
                    </Layer>
                    <ZoomControl position='bottom-right' />
                    <Marker
                        coordinates={coordinates}
                        anchor="bottom">
                        <img src={"markerUrl"} />
                    </Marker>


                    <Popup
                        coordinates={coordinates}
                        offset={{
                            'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
                        }}>
                        <h1>Popup</h1>
                    </Popup>
                </Map></>
        );
    }
}


class ParkMap extends React.Component {
    render() {
        return (
            <>
                <BaseMap ref={el => (this.componentRef = el)} />
                {/* <ListView /> */}
            </>
        )
    }
}

export default ParkMap;