import React from 'react';

import Item from './Item';
import './List.css';

const List = props => {
  let content;
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any? Search one!</p>;
  } else {
    content = (
      <ul className="product-list">
        {props.items.map(p => (
          <Item key={p.id} latitude={p.latitude} longitude={p.longitude} />
        ))}
      </ul>
    );
  }

  return <section id="coordenates">{content}</section>;
};

export default List;
