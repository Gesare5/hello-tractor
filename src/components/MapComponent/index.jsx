import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import marker from '../../mapbox-marker-icon-purple.svg';


function MapComponent({ farms }) {

    const MAPBOX_TOKEN = "pk.eyJ1IjoiZ2VzYXJlIiwiYSI6ImNrdm5qeW9ocjNhOG0yd3E1YjU3b2hncTIifQ.2jNUf16hFtTfQGvxrSjaUQ";

    const [selectedFarm, setSelectedFarm] = useState(null);

    // defines map initial features, static map, 
    // for an interactive map the viewport is changed using setviewport
    const [viewport, setViewport] = useState({
        latitude: -1.1018,
        longitude: 37.0144,
        // 1.1018° S, 37.0144° juja,kenya, original map center
        width: "60vw",
        height: "60vh",
        zoom: 10
    });

    return (

        /* this forms the mapcomponent */
        <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>

            <ReactMapGL {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={MAPBOX_TOKEN}
            // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            // onViewportChange={viewport => { setViewport(viewport); }}
            >
                {/* loops through farms array, displaying each farm co-ordinate
                    , which is a prop passed down from parent(Main.jsx) */}
                {farms.map(afarm => (
                    <Marker
                        key={afarm.farmName}
                        latitude={afarm.coordinates[0]}
                        longitude={afarm.coordinates[1]}
                    >
                        <button
                            className="marker-btn" onMouseOver=
                            {e => {
                                e.preventDefault();
                                setSelectedFarm(afarm);
                            }}
                            onMouseOut=
                            {e => {
                                e.preventDefault();
                                setSelectedFarm(null);
                            }}
                        >
                            <img src={marker} alt="location Icon" />
                        </button>
                    </Marker>
                ))}

                {/* creates a popup with farmname and distance onmouseover/hover */}
                {selectedFarm ? (
                    <Popup
                        latitude={selectedFarm.coordinates[0]}
                        longitude={selectedFarm.coordinates[1]}
                        onClose={() => {
                            setSelectedFarm(null);
                        }}
                    >
                        <div>
                            <h3>{selectedFarm.farmName}</h3>
                            <p>Distance: {selectedFarm.distance}</p>
                        </div>
                    </Popup>
                ) : null}

            </ReactMapGL>
        </div>
    );

}

export default MapComponent;