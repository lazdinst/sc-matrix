// TODO: read this from the database
const data = require('./data.js');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roll(name) {
    // Randomly select a race
    const races = ['zerg', 'terran', 'protoss'];
    const randomRace = races[Math.floor(Math.random() * races.length)];

    // Filter units by random race
    const filteredByRandomRace = data.units.filter((unit) => unit.race === randomRace)

    // Terran
    // Core Units - Marine, Marauder
    // Harass -  Hellion, Banshees, Cyclone
    // Devastators - Widdow Mine, Liberator
    // Casters - Raven, Ghost
    // Massives - Thor, Siege Tank
    // Air Massives - Battle Cruiser
    // Air Support - Viking

    // Protoss
    // Core Units - Zealot, stalker
    // Harass - Adept, Oracle
    // Devastators - Dark Templars, Void
    // Casters - High Templar, Sentry,
    // Massives - Immortal, Colossus
    // Air Massives - Carrier, Tempest
    // Air Support - Pheonix
    
    // Zerg
    // Core Units - Zerglings, Roach, Hydra
    // Harass - Banelings
    // Devastators - Mutalisk, Swarm Host, 
    // Casters - Infestor, Viper,
    // Massives - Ultralisk, Luker
    // Air Massives - Brood
    // Air Support - Corruptor

    // Queens, dt || ht == Archon, Hellion == Hellbat

    // Always a Core Unit
    // Roll all types 2 x times. Cant be the same type from the two rolls. Cant have same core unit
    // Re-rolls 1 reroll on click of selected item

    // Stretch progression
    const tier1 = filteredByRandomRace[getRandomNumber(0, 4)].name;
    const tier2 = filteredByRandomRace[getRandomNumber(5, 9)].name;
    const tier3 = filteredByRandomRace[getRandomNumber(10, filteredByRandomRace.length - 1)].name;

    const player = {
        name: name || '', 
        race: randomRace,
        units: [
            tier1,
            tier2,
            tier3
        ],
    };
    
    console.log("Player Roll Generated: ", player)
    return player;
}

module.exports = roll;
