import React, { useState } from 'react';
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

    const getInput = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setFarm({
            ...farm,
            [name]: value,
        });
        console.log(farm);
        // setToOptimize(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        farm.distance = parseFloat(farm.distance);
        data.push(farm);
        console.log(data);
        setFarm(initialValues);
    }

    const optimize = () => {
        setDataArray(data);
        dataArray.sort(function (a, b) {
            return a.distance - b.distance;
        });
        console.log(dataArray);
        setToOptimize(true);
    }

    return (
        <div id="main-div">
            <Navbar />
            <div id="main-content">

                <MapComponent />

                <form action="" id="add-farm" onSubmit={handleSubmit}>
                    <div id="input-div" style={{ width: "50%", background: "white" }}>
                        <label htmlFor="">Farm Name</label>
                        <input
                            type="text"
                            name="farmName"
                            value={farm.farmName}
                            onChange={getInput}
                            required
                        />
                    </div>

                    <div id="input-div" style={{ maxWidth: "40%", background: "white" }}>
                        <label htmlFor="">Distance</label>
                        <input
                            type="number"
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
                <div id="farms-header">
                    <h3 style={{ background: "transparent" }}>Farms</h3>
                    <h3 style={{ background: "transparent" }}>Distance(kM)</h3>
                </div>
                <ul id="farm-list">
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
    );
}

export default Main;