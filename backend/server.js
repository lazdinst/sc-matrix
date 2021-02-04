const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv').config();
require('./database');

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

app.use(bodyParser.json());
app.use(cors());

// API
const users = require('./api/users');
app.use('/api/users', users);

const games = require('./api/games')(io);
app.use('/api/games', games);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 5000;

http.listen(port, () => {
    console.log(`Listening on: ${port}`);
  });