const express = require('express');
const bikeRentController = express.Router();
const BikeRent = require('../module/BikeRent');
const bikeRentService = require('../services/BikeRentService');

bikeRentController.get('/total-price', async (req, res) => {
    try {
        await bikeRentService.loadData(await BikeRent.find());
        res.json(bikeRentService.wholeRentPeriodStartAndEndDaysAndTotalPrice());
    } catch (err) {
        res.json({message: err});
    }
});

bikeRentController.get('/periods', async (req, res) => {
    try {
        const data = await BikeRent.find();
        res.json(data);
    } catch (err) {
        res.json({message: err});
    }
});

bikeRentController.get('/period/:id', async (req, res) => {
    try {
        const data = await BikeRent.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.json({message: err});
    }
});

bikeRentController.post('/add-period', async (req, res) => {
    console.log(req)
    const bikeRent = new BikeRent({
        price_per_day: req.body.price_per_day,
        from: req.body.from,
        to: req.body.to,
        added: req.body.added
    });
    try {
        const data = await bikeRent.save();
        res.json(data);
    } catch (err) {
        res.json({message: err});
    }
});

bikeRentController.delete('/delete-period/:id', async (req, res) => {
    try {
        const removedData = await BikeRent.deleteOne({_id: req.params.id});
        res.json(removedData);
    } catch (err) {
        res.json({message: err});
    }
});

bikeRentController.patch('/update-period/:id', async (req, res) => {
    try {
        const updatePeriod = await BikeRent.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    price_per_day: req.body.price_per_day,
                    from: req.body.from,
                    to: req.body.to,
                    added: req.body.added
                }
            }
        );
        res.json(updatePeriod);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = bikeRentController;
