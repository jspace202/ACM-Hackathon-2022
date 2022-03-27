import React, { useState, useEffect, useMemo } from "react";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../firebase'
import parkingIcon from "../icons/parkingIcon";


import { GeolocateControl } from "mapbox-gl";
import { Popup } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    preserveDrawingBuffer: true,
    accessToken:
        "pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA"
});

const defaultCoordinates = [-97.066524, 36.125678];


// Create an image for the Layer from svg
const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(parkingIcon);
const images = ['parking', image];

const BaseMap = () => {
    
    // eslint-disable-next-line
    const [map, setMap] = useState(null);

    const onMapLoad = map => {
        setMap(map);
        map.addControl(new GeolocateControl());
    };

    const [parkingsAvailable, setParkings] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'spots'), orderBy('createdAt', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setParkings(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, []);

    const filteredParkings = useMemo(() => {
        return parkingsAvailable.filter(item => item.data.isValid)
    },[parkingsAvailable]);

    const [toolTip, setToolTip] = useState(null);

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
                <Layer
                    type="symbol"
                    paint={{"icon-color":'orange'}}
                    images={images}
                    layout={{ 'icon-image': 'parking', "icon-size":1, 'icon-allow-overlap': true}}>
                    {
                        filteredParkings.map((parking, index) => (
                            <Feature
                                key={index}
                                coordinates={[parking.data.longitude, parking.data.latitude]}
                                onClick={() => setToolTip(parking)}
                            />
                        ))
                    }
                </Layer>
                {
                    toolTip && (
                        <Popup
                            coordinates={[toolTip.data.longitude, toolTip.data.latitude]}
                            offset={{
                                'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
                            }}>
                            <h1>{toolTip.data.name}</h1>
                            <h2>{toolTip.data.address}</h2>
                            <h2>{toolTip.data.phoneNumber}</h2>
                            <h2>{toolTip.data.email}</h2>
                            <h2>{toolTip.data.price} $</h2>
                            <h2>{toolTip.data.numberOfSpotsAvailable} slots available</h2>
                        </Popup>
                    )
                }
            </Map></>
    );

}


class ParkMap extends React.Component {
    render() {
        return (
            <>
                <BaseMap ref={el => (this.componentRef = el)} />
            </>
        )
    }
}

export default ParkMap;