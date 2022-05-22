import '../css/index.css';

const { Set } = require('./set');
const { getRounds, random } = require('./helpers');

const entrants = [
  "Sam",
  "Hyrum",
  "Danielle",
  "Dan",
  "Dyllan",
  "Tom",
];

let matchings = new Set([]);

const rounds = {};

function generateMatchings() {
  entrants.forEach((ent1) => {
    entrants.forEach((ent2) => {
      let match = [ent1, ent2].sort();
      matchings.add(match);
    });
  });
  if (entrants.length % 2 === 0) {
    matchings = matchings.trim(match => match[0] !== match[1]);
  }
}

function generateRounds() {
  const roundCount = getRounds(entrants.length);
  let unmatched = new Set(matchings.get()).toArray();
  for (let i = 0; i < roundCount; i++) {
    const round = [];
    const taken = [];
    
    entrants.forEach((ent) => {
      if (!taken.includes(ent)) {
        console.log(taken)
        const possibleMatches = unmatched.filter(pair => pair.includes(ent))
        .filter(pair => pair.every(person => !(taken.includes(person))));
        console.log({ possibleMatches });
        const select = possibleMatches[random(0, possibleMatches.length-1)];
        if (select === undefined) { console.log({ ent }) }
        round.push(select);
        taken.push(select[0], select[1]);
        unmatched = unmatched.filter(pair => pair !== select);
      }
    })
    console.log({ round })
    rounds[i] = round;
  }
}

generateMatchings();
console.log({ matchings });

generateRounds();
console.log({ rounds })

console.log(getRounds(5));
console.log(getRounds(2));
console.log(getRounds(6));

console.log(matchings.toArray());