const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  result: {
    type: String,
    required: true
  },
  units: {
    type: [String],
    required: true
  }
})
module.exports = mongoose.model("Game", gameSchema, "games")