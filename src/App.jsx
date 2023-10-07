import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client'; // 1. Import socket.io-client
import GameHistory from './GameHistory';
import { getGameHistory, executeRoll, getUnits } from './api';

import Button from './components/Button';
import RollCard from './containers/RollCard';
const SOCKET_ENDPOINT =
  import.meta.env.VITE_RENDER_NODE_SOCKET_URI || 'http://localhost:5000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRace: '',
      selectedUnits: [],
      newGame: false,
      gameHistory: [],
      units: [],
      roll: null,
      loading: true,
    };
  }

  componentDidMount() {
    console.log('Socket: ', SOCKET_ENDPOINT);
    getGameHistory()
      .then((history) => {
        console.log(history);
        return this.setGameHistory(history);
      })
      .catch((err) => console.log(err));

    getUnits()
      .then((units) => {
        console.log(units);
        return this.setUnits({
          units: units,
        });
      })
      .catch((err) => console.log(err));

    this.handleSocketCreation();
  }

  handleSocketCreation = () => {
    this.socket = io(SOCKET_ENDPOINT, { withCredentials: true }); // 2. Initialize the connection
    this.socket.on('roll', (data) => {
      // 3. Listen to any events you want
      // Handle data received from the server
      console.log('Roll from server:', data);

      this.setState({
        roll: data,
      });
    });
    this.socket.on('connections', (data) => {
      // 3. Listen to any events you want
      // Handle data received from the server
      console.log('New Connection to server:', data);
    });
  };

  setGameHistory = (gameHistory) => {
    this.setState({ gameHistory: gameHistory });
  };

  setUnits = (units) => {
    this.setState(units);
  };

  handleRoll = () => {
    executeRoll()
      .then((roll) => {
        console.log(roll);
        return this.setRollResults(roll);
      })
      .catch((err) => console.log(err));
  };

  setRollResults = (roll) => {
    this.setState({
      roll: roll,
    });
  };

  render() {
    const { gameHistory, roll, units } = this.state;

    return (
      <div className="container">
        <div className="full-screen">
          <div className="header">
            <h2>Shiva's Matrix</h2>
          </div>
          <div className="main">
            <div className="left">
              <GameHistory history={gameHistory} />
            </div>
            <div className="middle">
              <div className="cards-container">
                {roll &&
                  roll.map((player) => {
                    console.log('PLAYER: ', player);
                    return (
                      <RollCard
                        key={uuidv4()}
                        player={player}
                        units={units.filter((unit) => {
                          return player.units.includes(unit.name);
                        })}
                      />
                    );
                  })}
              </div>
              <div className="button-container">
                <Button
                  theme="positive"
                  label="roll"
                  onClick={this.handleRoll}
                />
              </div>
            </div>
          </div>
          <div className="footer">Footer</div>
        </div>
      </div>
    );
  }
}

export default App;
