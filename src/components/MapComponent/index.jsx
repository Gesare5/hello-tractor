import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import marker from '../../mapbox-marker-icon-purple.svg';


function MapComponent() {

    const MAPBOX_TOKEN = "pk.eyJ1IjoiZ2VzYXJlIiwiYSI6ImNrdm5qeW9ocjNhOG0yd3E1YjU3b2hncTIifQ.2jNUf16hFtTfQGvxrSjaUQ";

    const [selectedPark, setSelectedPark] = useState(false);

    const [viewport, setViewport] = useState({
        latitude: -1.1018,
        // -1.2795-uon -1.0914,-jkuat
        longitude: 37.0144,
        // 36.8159-uon 37.0117,-jkuat
        // 1.1018° S, 37.0144° juja
        width: "60vw",
        height: "60vh",
        zoom: 10
    });

    return (
        <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
            <ReactMapGL {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={viewport => { setViewport(viewport); }}
            >
                <Marker
                    // key={park.properties.PARK_ID} 1.1635° S, 37.0813
                    latitude={-1.1635}
                    longitude={37.0813}
                >
                    <button
                        className="marker-btn" onMouseOver=
                        {e => {
                            e.preventDefault();
                            setSelectedPark(true);
                        }}
                        onMouseOut=
                        {e => {
                            e.preventDefault();
                            setSelectedPark(false);
                        }}
                    >
                        <img src={marker} alt="location Icon" />
                    </button>
                </Marker>

                {selectedPark ? (
                    <Popup
                        latitude={-1.1635}
                        longitude={37.0813}
                        onClose={() => {
                            setSelectedPark(false);
                        }}
                    >
                        <div>
                            <h2>buble</h2>
                            <p>here</p>
                        </div>
                    </Popup>
                ) : null}

            </ReactMapGL>
        </div>
    );

}

export default MapComponent;