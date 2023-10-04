const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the RollResult sub-schema
const RollResultSchema = new Schema({
    race: {
        type: String,
        required: true,
        enum: ['terran', 'zerg', 'protoss']
    },
    name: {
        type: String,
        required: true
    },
    units: [{
        type: String,
        required: true
    }]
});

// Define the GameRoll schema

const GameRollSchema = new Schema({
    players: [RollResultSchema],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const GameRoll = mongoose.model('game_roll', GameRollSchema);

module.exports = GameRoll;
