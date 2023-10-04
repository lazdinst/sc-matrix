const data = require('./data.js');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roll() {
    // Randomly select a race
    const races = ['zerg', 'terran', 'protoss'];
    const randomRace = races[Math.floor(Math.random() * races.length)];

    // Filter units by random race
    const filteredByRandomRace = data.units.filter((unit) => unit.race === randomRace)
    
    // Generate the unit tiers
    const tier1 = filteredByRandomRace[getRandomNumber(0, 4)].name;
    const tier2 = filteredByRandomRace[getRandomNumber(5, 9)].name;
    const tier3 = filteredByRandomRace[getRandomNumber(10, filteredByRandomRace.length - 1)].name;

    return {
        race: randomRace,
        units: [
            tier1,
            tier2,
            tier3
        ],
    };
}

module.exports = roll;
