const express = require('express');
const router = express.Router();

const GameHistory = require('../models/GameHistory');

router.get('/', async (req, res) => {
    console.log('You tried to get game_history. [api/route]')
    try {
        const gameHistories = await GameHistory.find();
        console.log('History Found: ', gameHistories[0].history)
        res.json(gameHistories[0].history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newGameHistory = new GameHistory(req.body);
        const savedGameHistory = await newGameHistory.save();
        res.json(savedGameHistory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
