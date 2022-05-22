import '../css/index.css';

const { Tournament } = require('./rounds');

const rounds = document.querySelector('#rounds');

const entrants = [
  "Sam",
  "Hyrum",
  "Danielle",
  "Dan",
  "Dylan",
  "Tom",
];

let tourn = new Tournament("tourney", entrants);

const roundList = tourn.getRounds();
for (let i = 1; i <= tourn.roundCount; i++) {
  rounds.innerHTML += `<h2>Round ${i}</h2>`;
  rounds.innerHTML += `<ol>`;
  roundList[i].getMatches().forEach(match => {
    rounds.innerHTML += `<li>${match.entA} vs ${match.entB}</li>`;
  });
  rounds.innerHTML += `</ol>`
}