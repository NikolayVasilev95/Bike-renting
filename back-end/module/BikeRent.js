const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BikeRentSchema = new Schema({
    price_per_day: Number,
    from: Date,
    to: Date,
    added: Date
});

module.exports = mongoose.model('BikeRent', BikeRentSchema);
