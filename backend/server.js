const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4'); //unique value

const app = express();

const COORDENATES = [{"id":"","latitude":"","longitude":""}]; // not a database, just some in-memory storage for the cuates:D

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication - IMPORTANT!
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/coordenates', (req, res, next) => {
  res.status(200).json({ coordenates: COORDENATES });
});





app.post('/coordenate', (req, res, next) => {
  const { latitude, longitude } = req.body;

  if ( !latitude || !longitude) {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid latitude, longitude.'
    });
  }

  const createdCoordenate = {
    id: uuid(),
    latitude,
    longitude
  };

  COORDENATES.push(createdCoordenate);

  res
    .status(201)
    .json({ message: 'new coordenate.', coordenate: createdCoordenate });
});

app.listen(5000); // start Node + Express server on port 5000
