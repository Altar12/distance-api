// imports
const express = require('express');

// configs
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const staticPosition = {
    lat: 28.612894,
    long: 77.229446
};

// route handlers
app.get('/distance', (req, res) => {
    // verify whether user input is correct or not
    const { lat, long } = req.body;
    if (!lat || !long) {
        res.status(400).send('Latitude and longitude need to be specified', req.body);
        return;
    }
    if (typeof lat !== 'number' || typeof long !== 'number') {
        res.status(400).send('Latitude and longitude must be numbers');
        return;
    }
    // calculate distance
    const distance = getDistanceInKm(staticPosition.lat, staticPosition.long, lat, long);
    if (distance < 0.1) res.send({ result: true, distance: distance * 1000 });
    else res.send({ result: false, distance: distance * 1000 });
});

// server initiation
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// helper functions
function getDistanceInKm(lat1,lon1,lat2,lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = degToRad(lat2-lat1);
  let dLon = degToRad(lon2-lon1); 
  let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let d = R * c; // Distance in km
  return d;
}

function degToRad(deg) {
  return deg * (Math.PI/180)
}