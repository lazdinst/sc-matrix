import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const GameHistory = ({ history }) => {
  return (
    <>
      {history.map((game, idx) => (
        <div key={uuidv4()}>
          <div>
            {idx}: <span>{game.victory ? 'W' : 'L'}</span>
            {game.races.map((races) => (
              <span key={uuidv4()}> {races} |</span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default GameHistory;
