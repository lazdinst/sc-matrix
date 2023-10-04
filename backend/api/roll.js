const express = require('express');
const router = express.Router();

const roll = require('../utils');  // Adjust the path

const GameRoll = require('../models/GameRoll');

router.get('/', async (req, res) => {
    console.log('Retrieveing rolls. [GET api/roll]')
    GameRoll.find()
        .then(rolls => {
            res.json(rolls); // Return all rolls
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve rolls from database' });
        });
});


router.post('/', async (req, res) => {
    console.log('Executed a new roll. [POST api/roll]')
    const playerOne = roll('playerOne');
    const playerTwo = roll('playerTwo');

    // Remove all documents from the collection
    GameRoll.deleteMany({})
        .then(() => {
            // Create and save the new game roll to MongoDB
            const gameRoll = new GameRoll({
                players: [playerOne, playerTwo]
            });
            return gameRoll.save();
        })
        .then(savedRoll => {
            console.log('Roll Save Successful!')
            res.json([playerOne, playerTwo]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to save roll to database' });
        });
});


module.exports = router;
