import '../css/index.css';

const { Set } = require('./set');

const entrants = [
  "Sam",
  "Hyrum",
  "Danielle",
  "Dan",
  "Dyllan",
  "Tom",
];

const matchings = new Set([]);

const rounds = {};
const matched = new Set([])

function generateMatchings() {
  entrants.forEach((ent1) => {
    entrants.forEach((ent2) => {
      let match = [ent1, ent2].sort();
      matchings.add(match);
    });
  });
}

function getRounds (x) { return (((x**2-x)/2)+x)/(Math.floor(x/2)+x%2); }

function generateRounds() {
  const roundCount = getRounds(entrants.length);
  for (let i = 0; i < entrants.length; i++) {
    const round = [];
    const taken = [];
    entrants.forEach((ent) => {
      if (!taken.includes(ent)) {
        
      }
    })
  }
}

generateMatchings();
console.log({ matchings });

console.log(getRounds(5));
console.log(getRounds(2));
console.log(getRounds(6));

console.log(matchings.toArray());