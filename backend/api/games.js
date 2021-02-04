const express = require('express');
const router = express.Router()

const Game = require('../models/Game');

const returnRouter = (io) => {
  router.get('/', (req, res, next) => {
    Game.find()
        .then(games => {
          return res.json(games)
        })
        .catch(err => console.log(err))
  });

  router.post('/', (req, res) => {
    const { result, units } = req.body;
    const newGame = new Game({
        result: result, 
        units: units
    })
    newGame.save()
      .then(() => {
        io.emit('chat message', 'test');
        return res.json({message: "Post successful"})
      })
      .catch(err => {
        console.log(err); 
        return res.status(400).json({
          "error": err,
          "message": "Error creating account"
        })
      })
    });
    
  return router;
}

module.exports = returnRouter; 