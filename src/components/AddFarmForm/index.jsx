import React from 'react';

function AddFarmForm({ handleSubmit, optimize, getInput, farm }) {
    return (
        <form action="" id="add-farm" onSubmit={handleSubmit}>
            <div className="all-inputs-div">
                <div id="input-div" style={{ maxWidth: "60%", background: "white" }} >
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
            </div>
            <div className="buttons-div">
                <div >
                    <input type="submit" value="ADD" id="input-submit" />
                </div>
                <div>
                    <button id="optimize-btn" onClick={optimize}>OPTIMIZE</button>
                </div>
            </div>
        </form>
    );
}

export default AddFarmForm;