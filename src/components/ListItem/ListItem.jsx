import React from 'react';
import './style.css';

function ListItem({ farmName, distance }) {
    return (
        <div id="list-item">
            <h4>{farmName}</h4>
            <h5>{distance}</h5>
        </div>
    );
}

export default ListItem;