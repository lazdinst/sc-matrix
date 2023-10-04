// models/Unit.js

const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    race: {
        type: String,
        required: true,
        enum: ['protoss', 'zerg', 'terran']
    },
    name: {
        type: String,
        required: true
    },
    mins: {
        type: Number,
        required: true
    },
    gas: {
        type: Number,
        required: true
    }
});

const Unit = mongoose.model('Unit', UnitSchema);

module.exports = Unit;
