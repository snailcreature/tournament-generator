import '../css/index.css';

const { Tournament } = require('./rounds');

const entrants = [
  "Sam",
  "Hyrum",
  "Danielle",
  "Dan",
  "Dyllan",
  "Tom",
];

let tourn = new Tournament("tourney", entrants);

console.log(tourn.getRounds());