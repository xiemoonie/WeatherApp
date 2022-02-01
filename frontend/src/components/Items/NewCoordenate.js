import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import './NewCoordenate.css';

const NewCoordenate = props => {
  const [enteredLatitude, setEnteredLatitude] = useState('');
  const [enteredLongitude, setEnteredLongitude] = useState('');

  const latitudeChangeHandler = event => {
    setEnteredLatitude(event.target.value);
  };

  const longitudeChangeHandler = event => {
    setEnteredLongitude(event.target.value);
  };

  const submitCoordenatesHandler = event => {
    event.preventDefault();
    props.onAddCoordenate(enteredLatitude, enteredLongitude);
  };

  return (
    <section id="new-product">
      <h2>Coordenate Input</h2>
      <form onSubmit={submitCoordenatesHandler}>
        <Input
          type="number"
          label="Latitude"
          id="latitude"
          value={enteredLatitude}
          onChange={latitudeChangeHandler}
        />
        <Input
          type="number"
          label="Longitude"
          step={0.01}
          id="longitude"
          value={enteredLongitude}
          onChange={longitudeChangeHandler}
        />
        <Button type="submit">ADD COORDENATE</Button>
      </form>
    </section>
  );
};

export default NewCoordenate;
