const express = require('express');
const BikeRentController = require('./controllers/BikeRentController');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log('connected to DB!');
});
//App setup
const app = express();
const server = require('http').createServer(app);
server.listen(process.env.PORT || 4000, function () {
    console.log('Server is up!');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/api/BikeRentController', BikeRentController);
