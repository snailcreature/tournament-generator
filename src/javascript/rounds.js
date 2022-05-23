const { Set } = require('./set');
const { getRounds, random, BasicObject } = require('./helpers');

class Tournament extends BasicObject {
  constructor(id, entrants, shuffle=true) {
    super();
    this.id = id;

    this.entrants = entrants.sort();

    this.matchSet = this.createMatchSet();

    this.roundCount = getRounds(entrants.length);
    this.rounds = {};
    this.createRounds();
    if (shuffle) this.shuffleRounds();
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

        if (leading[i][0] !== leading[i][1]) this.rounds[index].addMatch(
          new Match(leading[i].join('-'), leading[i][0], leading[i][1])
          );
      }

      start += 2;
      if (start > this.roundCount) start -= this.roundCount;
    });
  }

  shuffleRounds(shifts=10) {
    for (let i = 0; i < shifts; i++) {
      const x = random(1, this.roundCount);
      const y = random(1, this.roundCount);

      const hold = this.rounds[x];
      this.rounds[x] = this.rounds[y];
      this.rounds[y] = hold;
    }
  }

  getRounds() {
    return this.rounds;
  }

  getRound(i) {
    if (i > 0 && i <= this.roundCount) return this.rounds[i];
    return null;
  }
}

class Round extends BasicObject {
  constructor(id) {
    super();
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

class Match extends BasicObject {
  constructor(id, entrantA, entrantB) {
    super();
    this.id = id;

    this.entA = entrantA;
    this.entB = entrantB;

    this.entrants = arguments;

    this.winner = null;
    this.draw = false;

    this.on('markwin', (e) => { 
      if (e.detail.matchId === this.id) {
        this.markWinner(e.detail.entrant);
      }
    });
    this.on('toggledraw', (e) => {
      if (e.detail.matchId === this.id) {
        this.toggleDraw();
      }
    });
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