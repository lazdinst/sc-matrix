import React from "react";

const GameHistory = ({ games }) => {
  return (
    <>
      {games.map((game, idx) => (
        <div key={`${JSON.stringify(game)}${idx}`}>
          <div>
            {idx}: <span>{game.result ? "W" : "L"}</span>
            {game.units.map((unit) => (
              <span> {unit.name} |</span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default GameHistory;
