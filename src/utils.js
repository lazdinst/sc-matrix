import protoss from "./images/protoss.png";
import terran from "./images/terran.png";
import zerg from "./images/zerg.png";
import sc from "./images/sc.png";

const { REACT_APP_API_PROTOCOL, REACT_APP_API_HOST, REACT_APP_API_PORT } = process.env;

export function uriGenerator() {
  return `${REACT_APP_API_PROTOCOL}://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;
}

export function getSymbolImageByRace(race) {
  let symbol = sc;
  switch (race) {
    case "protoss":
      symbol = protoss;
      break;
    case "terran":
      symbol = terran;
      break;
    case "zerg":
      symbol = zerg;
      break;
    default:
      break;
  }
  return {race, symbol}
}