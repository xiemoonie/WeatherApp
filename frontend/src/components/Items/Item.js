import React from 'react';

import './Item.css';

const Item = props => {
  return (
    <li className="product-item">
      <h1>Latitude: {props.latitude}</h1>
      <h1>Longitude: {props.longitude}</h1>
    </li>
  );
};

export default Item;
