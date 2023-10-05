// Assuming you are using ES Modules and have the respective image files.
import protoss from './images/protoss.png';
import terran from './images/terran.png';
import zerg from './images/zerg.png';
import sc from './images/sc.png';

type Race = 'protoss' | 'terran' | 'zerg';

interface SymbolResult {
  race: Race | string; // Using Race | string to account for the default case where race might not be one of the three known types.
  symbol: string;
}

export function getSymbolImageByRace(race: Race | string): SymbolResult {
  let symbol = sc;
  switch (race) {
    case 'protoss':
      symbol = protoss;
      break;
    case 'terran':
      symbol = terran;
      break;
    case 'zerg':
      symbol = zerg;
      break;
    default:
      break;
  }
  return { race, symbol };
}
