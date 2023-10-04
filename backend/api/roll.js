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
    const playerOne = roll();
    const playerTwo = roll();
    
    // Create a new game roll
    const gameRoll = new GameRoll({
        playerOne: playerOne,
        playerTwo: playerTwo
    });

    // Save the game roll to MongoDB
    gameRoll.save()
        .then(savedRoll => {
            res.json(savedRoll);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to save roll to database' });
        });
});

module.exports = router;
