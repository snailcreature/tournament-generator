const { Set } = require('./set');
const { getRounds } = require('./helpers');

class Tournament {
  constructor(id, entrants) {
    this.id = id;

    this.entrants = entrants.sort();

    this.matchSet = this.createMatchSet();

    this.roundCount = getRounds(entrants.length);
    this.rounds = {};
    this.createRounds();
  }

  createMatchSet() {
    const matchings = new Set([]);
    this.entrants.forEach((ent1) => {
      this.entrants.forEach((ent2) => {
        let match = [ent1, ent2].sort();
        matchings.add(match);
      });
    });
    return matchings;
  }

  createRounds() {
    for (let i = 0; i < this.roundCount; i++) {
      this.rounds[i+1] = new Round(i);
    }
    let start = 1;
    this.entrants.forEach((entrant) => {
      const leading = this.matchSet.filter(pair => pair[0] === entrant);

      for (let i = 0; i < leading.length; i++) {
        let index = start + i;
        if (index > this.roundCount) index -= this.roundCount;

        if (leading[i][0] !== leading[i][1]) this.rounds[index].addMatch(new Match(leading[i].join('-'), leading[i][0], leading[i][1]));
      }

      start += 2;
      if (start > this.roundCount) start -= this.roundCount;
    });
  }

  getRounds() {
    return this.rounds;
  }

  getRound(i) {
    if (i > 0 && i <= this.roundCount) return this.rounds[i];
    return null;
  }
}

class Round {
  constructor(id) {
    this.id = id;
    this.matches = [];
  }

  addMatch(match) {
    this.matches.push(match);
  }

  getMatches() {
    return this.matches;
  }

  getMatch(id) {
    const filter = this.matches.filter(match => match.id === id);
    if (filter.length >= 1) return filter[0];
    return null;
  }
}

class Match {
  constructor(id, entrantA, entrantB) {
    this.id = id;

    this.entA = entrantA;
    this.entB = entrantB;

    this.entrants = arguments;

    this.winner = null;
    this.draw = false;
  }

  markWinner(entrant) {
    this.winner = entrant;
  }

  toggleDraw() {
    this.draw = !this.draw;
  }
}

module.exports = {
  Tournament,
  Round,
  Match,
}