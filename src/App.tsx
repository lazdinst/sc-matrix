import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io, { Socket } from 'socket.io-client';
import GameHistory from './GameHistory';
import { getGameHistory, executeRoll, getUnits } from './api';
import Button from './components/Button';
import RollCard from './containers/RollCard';

const SOCKET_ENDPOINT =
  process.env.REACT_APP_RENDER_NODE_SOCKET_URI || 'http://localhost:5000';

interface Player {
    name: string;
    race: string;
    units: string[];
  }

const App: React.FC = () => {
  const [gameHistory, setGameHistory] = useState<any[]>([]); // Be more specific if possible
  const [units, setUnits] = useState<any[]>([]); // Be more specific if possible
  const [roll, setRoll] = useState<Player[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getGameHistory()
      .then(setGameHistory)
      .catch(console.log);

    getUnits()
      .then(setUnits)
      .catch(console.log);

    const socket: Socket = io(SOCKET_ENDPOINT, { withCredentials: true });

    socket.on('roll', (data: Player[]) => {
      console.log('Roll from server:', data);
      setRoll(data);
    });

    socket.on('connections', (data: any) => {
      console.log('New Connection to server:', data);
    });

    return () => {
      socket.off('roll');
      socket.off('connections');
      socket.close();
    };
  }, []);

  const handleRoll = () => {
    executeRoll()
      .then(setRoll)
      .catch(console.log);
  };

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
                roll.map((player: Player) => {
                  console.log('PLAYER: ', player);
                  return (
                    <RollCard
                      key={uuidv4()}
                      player={player}
                      units={units.filter((unit: any) => // Be more specific if possible
                        player.units.includes(unit.name)
                      )}
                    />
                  );
                })}
            </div>
            <div className="button-container">
              <Button theme="positive" label="roll" onClick={handleRoll} />
            </div>
          </div>
          <div className="footer">Footer</div>
        </div>
      </div>
    </div>
  );
};

export default App;
