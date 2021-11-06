import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { data } from '../../Datastore/data';
import ListItem from '../ListItem/ListItem';
import './style.css';
import MapComponent from '../MapComponent';

const initialValues = { farmName: "", distance: "" };

function Main() {

    const [farm, setFarm] = useState(initialValues);
    const [toOptimize, setToOptimize] = useState(false);
    const [dataArray, setDataArray] = useState(data);
    const [farms, setFarms] = useState(data);

    //    handles input
    const getInput = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setFarm({
            ...farm,
            [name]: value,
        });
        console.log(farm);
        setFarm({ ...farm, coordinates: [] })
        console.log(farm);
        // setToOptimize(false);
    }

    // handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        farm.distance = parseFloat(farm.distance);
        data.push(farm);
        console.log(data);
        setFarm(initialValues);
    }

    // function to sort in ascending order using distance
    const optimize = () => {
        setDataArray(data);
        dataArray.sort(function (a, b) {
            return a.distance - b.distance;
        });
        console.log(dataArray);
        setToOptimize(true);
    }

    // function to calculate co-ordinates
    // reverse haversine-formula
    const farmLocation = (distanc) => {
        // //const bearing = 312.6893942836867
        const latitude1 = -1.1635 * Math.PI / 180; //  in radians
        const longitude1 = 37.0813 * Math.PI / 180;
        const bearing = 312.6893942836867 * Math.PI / 180;
        const d = distanc * 1000;
        const R = 6371e3;
        const latitude2 = Math.asin(Math.sin(latitude1) * Math.cos(d / R) +
            Math.cos(latitude1) * Math.sin(d / R) * Math.cos(bearing));
        let lat2 = latitude2 * 180 / Math.PI;
        const longitude2 = longitude1 + Math.atan2(Math.sin(bearing) * Math.sin(d / R) * Math.cos(latitude1),
            Math.cos(d / R) - Math.sin(latitude1) * Math.sin(latitude2));
        let long2 = longitude2 * 180 / Math.PI;
        return [lat2, long2];
    }

    // allows rerendering anytime data changes/when a farm is added
    useEffect(() => {
        data.map((location) => (location.coordinates = farmLocation(location.distance)));
        setFarms(data);
    }, [dataArray]);

    return (
        <div id="main-div">
            <Navbar />
            <div id="main-content">
                <div>
                    {/* imported mapcomponent
                     passing farms array as a prop to the child */}
                    <MapComponent farms={farms} />
                </div>
                <form action="" id="add-farm" onSubmit={handleSubmit}>

                    <div id="input-div" >
                        <label htmlFor="">Farm Name</label>
                        <input
                            type="number"
                            name="farmName"
                            value={farm.farmName}
                            onChange={getInput}
                            required
                        />
                    </div>

                    <div id="input-div" style={{ background: "white" }}>
                        <label htmlFor="">Distance</label>
                        <input
                            type="text"
                            name="distance"
                            value={farm.distance}
                            onChange={getInput}
                            required
                        />
                    </div>

                    <div >
                        <input type="submit" value="ADD" id="input-submit" />
                    </div>
                    <div>
                        <button id="optimize-btn" onClick={optimize}>OPTIMIZE</button>
                    </div>
                </form>
                <div className="container-list">
                    <div id="farms-header">
                        <h3 style={{ background: "transparent" }}>Farms</h3>
                        <h3 style={{ background: "transparent" }}>Distance(kM)</h3>
                    </div>
                    <ul id="farm-list">
                        {/* renders sorted list if toOptimize state is set to true
                        else it renders the original list ====> ternary operator */}
                        {
                            toOptimize ?
                                (dataArray.map((item) => (
                                    <ListItem
                                        farmName={item.farmName}
                                        distance={item.distance}
                                    />
                                ))) : (data.map((item) => (
                                    <ListItem
                                        farmName={item.farmName}
                                        distance={item.distance}
                                    />
                                )))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Main;