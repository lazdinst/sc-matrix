// routes/units.js

const express = require('express');
const router = express.Router();

const data = require('../data');

const Unit = require('../models/Unit');  // Adjust the path

router.get('/', async (req, res) => {
    try {
        // Get units from MongoDB
        const units = await Unit.find();  
        res.json(units);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve units' });
    }
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
