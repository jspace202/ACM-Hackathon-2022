import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../firebase'
import parkingIcon from "../icons/parkingIcon";
import { GeolocateControl } from "mapbox-gl";
import { Popup } from "react-mapbox-gl";
import ToolTipCard from "../components/ToolTipCard";

const Map = ReactMapboxGl({
    preserveDrawingBuffer: true,
    accessToken:
        "pk.eyJ1IjoibWF5b2ppY2giLCJhIjoiY2pla3Q3MzVvMWRoYTJybnVyMndxM2hmdCJ9.nWZlYcpKaMqz6m7xTsnJGA"
});

/** coordinates of BonePickens Stadium */
const DEFAULT_COORDINATES = [-97.066524, 36.125678];


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
    }, [parkingsAvailable]);

    const [toolTip, setToolTip] = useState(null);


    const handleToolTipClose = useCallback(() =>{
        setToolTip(undefined)
    },[]);

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
                center={DEFAULT_COORDINATES}
            >
                <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={DEFAULT_COORDINATES} />
                </Layer>

                <ZoomControl position='bottom-right' />
                <Layer
                    type="symbol"
                    paint={{ "icon-color": 'orange' }}
                    images={images}
                    layout={{ 'icon-image': 'parking', "icon-size": 1, 'icon-allow-overlap': true }}>
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
                                <ToolTipCard data={toolTip.data} handleClose={handleToolTipClose} />
                        </Popup>
                    )
                }
            </Map></>
    );

}

/**
 * Map component which is shown in the parking page
 */
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