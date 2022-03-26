import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";

import { GeolocateControl } from "mapbox-gl";
import { Marker, Popup } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    preserveDrawingBuffer: true,
    accessToken:
        "pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA"
});

const defaultCoordinates = [-97.066524, 36.125678];

const BaseMap = () => {
    const [map, setMap] = useState(null);

    const onMapLoad = map => {
        setMap(map);
        map.addControl(new GeolocateControl());
    };

    console.log(map)


    return (
        <>
            <Map
                // eslint-disable-next-line
                style={"mapbox://styles/mapbox/streets-v8"}
                onStyleLoad={onMapLoad}
                zoom={[14]}
                containerStyle={{
                    height: "calc(100vh - 64px)",
                    width: "100vw"
                }}
                center={defaultCoordinates}
            >
                <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={defaultCoordinates} />
                </Layer>
                <ZoomControl position='bottom-right' />
                <Marker
                    coordinates={defaultCoordinates}
                    anchor="bottom">
                    <img src={"markerUrl"} />
                </Marker>


                <Popup
                    coordinates={defaultCoordinates}
                    offset={{
                        'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
                    }}>
                    <h1>Popup</h1>
                </Popup>
            </Map></>
    );

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