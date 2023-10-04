import React from "react";

const GameHistory = ({ games }) => {
  return (
    <>
      {games.map((game, idx) => (
        <div key={`${JSON.stringify(game)}${idx}`}>
          <div>
            {idx}: <span>{game.victory ? "W" : "L"}</span>
            {game.races.map((races) => (
              <span> {races} |</span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default GameHistory;
