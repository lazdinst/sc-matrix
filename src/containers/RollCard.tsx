import React, { ReactElement } from 'react';
import Card from '../components/Card';
import { getSymbolImageByRace } from '../utils';

interface Player {
  race: string;
  // You can add other properties of player if needed
}

interface Unit {
  // As an example structure; adjust to fit actual structure of unit
  name: string;
  // Add other properties as necessary
}

interface RollCardProps {
  player: Player;
  units: Unit[];
}

const RollCard: React.FC<RollCardProps> = ({ player, units }): ReactElement => {
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
