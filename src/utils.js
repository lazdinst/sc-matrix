import protoss from './images/protoss.png';
import terran from './images/terran.png';
import zerg from './images/zerg.png';
import sc from './images/sc.png';

export function getSymbolImageByRace(race) {
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
