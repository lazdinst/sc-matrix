const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    races: {
        type: [[String]],
        required: true
    },
    victory: {
        type: Boolean,
        required: true
    }
});

const gameHistorySchema = new mongoose.Schema({
    history: [gameSchema]
}, {
    collection: 'game_history'  // explicitly set the collection name
});

const GameHistory = mongoose.model('GameHistory', gameHistorySchema);

module.exports = GameHistory;
