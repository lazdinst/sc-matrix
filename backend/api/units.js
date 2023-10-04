// routes/units.js

const express = require('express');
const router = express.Router();

const Unit = require('../models/Unit');  // Adjust the path

const data = require('../data');

router.get('/', async (req, res) => {
    res.json(data.units)
});

router.post('/', async (req, res) => {
    try {
        // Delete all current units
        await Unit.deleteMany();

        // Insert the new units
        const insertedUnits = await Unit.insertMany(data.units);

        res.json(insertedUnits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
