import React from 'react';
import Card from '../components/Card';

import { getSymbolImageByRace } from '../utils';

const RollCard = ({ player, units }) => {
  return (
    <Card
      imageUrl={getSymbolImageByRace(player.race).symbol}
      imageAlt={player.race}
      headerText={player.race}
      units={units}
    />
  );
};

export default RollCard;
