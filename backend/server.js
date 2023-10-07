const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

const http = require('http').Server(app);

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { connectDB } = require('./database');
connectDB();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
console.log(allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let TOTAL_CONNECTIONS = 0;

const io = require('socket.io')(http, {
  cors: {
    origin: allowedOrigins, // Reuse the allowed origins from your Express CORS settings
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  TOTAL_CONNECTIONS += 1;
  io.emit('connections', { count: TOTAL_CONNECTIONS });
  socket.on('disconnect', () => {
    TOTAL_CONNECTIONS -= 1;
    io.emit('connections', { count: TOTAL_CONNECTIONS });
    console.log('Client disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const gameHistory = require('./api/game_history');
app.use('/api/game_history', gameHistory);

const unitsRoutes = require('./api/units');
app.use('/api/units', unitsRoutes);

const rollRoutes = require('./api/roll');
app.use('/api/roll', rollRoutes);

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist'));
});

const port = process.env.PORT || 5000;

http.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
