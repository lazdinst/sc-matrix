import React from "react";
// import "./styles.css";
import axios from 'axios';
import socketIOClient from "socket.io-client";

import protoss from "./images/protoss.png";
import terran from "./images/terran.png";
import zerg from "./images/zerg.png";
import sc from "./images/sc.png";

import data from "./data";

import Race from "./Race";
import Units from "./Units";
import GameHistory from "./GameHistory";

const ENDPOINT = "http://localhost:5000";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectedRace: "",
      selectedUnits: [],
      games: [],
      newGame: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/game_history")
      .then((response) => {
        const games = response.data;
        console.log(games)
        return this.setGameHistory(games)
      })
      .catch((err) => console.log(err));

    console.log('trying to open socket')
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      console.log(data);
    });

  }

  setGameHistory = (games) => {
    // const filteredGamesData = games.map(game => {

    //   return {result: game.result, units }
    // })
    console.log(games)
    this.setState({games: games})
  }

  handleRoll = () => {
    const { data } = this.state;

    const getRandom = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const getRandomFromRange = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    const getRace = (races) => {
      const rand = getRandom(3);
      const raceName = Object.keys(races).filter((race, idx) => {
        return rand === idx;
      });
      return raceName[0] || "";
    };

    const getUnits = (units) => {
      const firstRange = getRandomFromRange(0, 5);
      const secondRange = getRandomFromRange(6, 10);
      const thirdRange = getRandomFromRange(10, 15);

      const randomIndicies = [firstRange, secondRange, thirdRange];

      return randomIndicies.map(
        (unitIdx) => units.filter((unit, idx) => idx === unitIdx)[0]
      );
    };

    const selectedRace = getRace(data);
    const selectedUnits = getUnits(data[selectedRace]);

    console.log("SelectedUnits: ", selectedUnits);
    this.setState({
      selectedRace: selectedRace,
      selectedUnits: selectedUnits,
      newGame: true
    });
  };

  

  handleGameUpdate = (result) => {
    const { selectedUnits } = this.state;
    const units = selectedUnits.map(unit => unit.name);

    const game = { result: result, units: units};

    axios
      .post("/api/games", game)
      .then((response) => {
        console.log("Games Updated");
        return response;
      })
      .catch((err) => {
        console.log("Failed to update Games. Please try again");
      });

    this.setState({
      games: [...this.state.games, game],
      newGame: false,
      selectedRace: "",
      selectedUnits: []
    });
  };

  getRaceSymbolImage = (race) => {
    console.log(race);
    let raceSymbol = sc;
    switch (race) {
      case "protoss":
        raceSymbol = protoss;
        break;
      case "terran":
        raceSymbol = terran;
        break;
      case "zerg":
        raceSymbol = zerg;
        break;
      default:
        break;
    }
    return <img className="symbol" alt={race} src={raceSymbol} />;
  };

  render() {
    const { selectedRace, selectedUnits, games, newGame } = this.state;
    const raceSymbolImage = this.getRaceSymbolImage(selectedRace);

    return (
      <div className="container">
        <div className="full-screen">
          <div className="header">
            <div>StarCraft Unit Roller - test</div>
          </div>
          <div className="main">
            <div className="left">
              <GameHistory games={games} />
            </div>
            <div className="middle">
              <div className="symbol-container">
                {raceSymbolImage}
                <div className="symbol-button-container">
                  {!newGame ? (
                    <button onClick={this.handleRoll}>Roll</button>
                  ) : (
                    <>
                      <div>
                        <button onClick={() => this.handleGameUpdate(1)}>
                          Win
                        </button>
                        <button onClick={() => this.handleGameUpdate(0)}>
                          Loss
                        </button>
                      </div>
                      <div>
                        <button onClick={this.handleRoll}>Re-roll</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Units units={selectedUnits} />
            </div>
          </div>
          <div className="footer">Footer</div>
        </div>
      </div>
    );
  }
}

export default App;
