/**
 * @file - Contains handlers for Tournaments, Rounds, and Matches
 * @requires ./set
 * @requires ./helpers
 */
const { Set } = require('./set');
const { getRounds, random } = require('./helpers');

/**
 * Tournament object
 * @class
 */
class Tournament {
  /**
   * Creates a Tournament object that manages the rounds and matches
   * @param {String} id - Unique identifier
   * @param {String[]} entrants - List of entrants
   * @param {Boolean} shuffle - Should the round order be shuffled
   */
  constructor(id, entrants, win=1, draw=0, loss=0, shuffle=true) {
    this.id = id;

    this.entrants = entrants.sort();

    this.scores = {};
    this.entrants.map((ent) => {this.scores[ent] = 0});
    this.win = win;
    this.draw = draw;
    this.loss = loss;

    this.matchSet = this.createMatchSet();

    this.roundCount = getRounds(entrants.length);
    this.rounds = [];
    this.createRounds();
    if (shuffle) this.shuffleRounds();
  }

  /**
   * Creates a set containing all the possible matches
   * @returns {Set}
   */
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

  /**
   * Creates the rounds using each of the matches
   */
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

  /**
   * Shuffle the round order.
   * @param {Number} shifts - How many times should things be switched around
   */
  shuffleRounds(shifts=10) {
    for (let i = 0; i < shifts; i++) {
      const x = random(1, this.roundCount);
      const y = random(1, this.roundCount);

      const hold = this.rounds[x];
      this.rounds[x] = this.rounds[y];
      this.rounds[y] = hold;
    }
  }

  /**
   * 
   */
  updateScores() {
    this.entrants.map((ent) => {this.scores[ent] = 0});
    this.rounds.map((round) => {
      round.matches.map((match) => {
        let loser = match.entA === match.winner ? match.entB : match.entA;
        if (!match.draw && match.winner !== null ){
          this.scores[match.winner] += this.win;
          this.scores[loser] += this.loss;
        }
        if (match.draw) {
          this.scores[match.entA] += this.draw;
          this.scores[match.entB] += this.draw
        }
      });
    });
  }

  /**
   * Returns the list of rounds.
   * @returns {Round[]}
   */
  getRounds() {
    return this.rounds;
  }

  /**
   * Returns the given round, if it exists
   * @param {Number} i - Round number
   * @returns {Round|null}
   */
  getRound(i) {
    if (i > 0 && i <= this.roundCount) return this.rounds[i];
    return null;
  }

  /**
   * Attempts to find a given match
   * @param {String} matchId - ID for match
   * @returns {Match|null}
   */
  getMatch(matchId) {
    const matches = this.rounds.filter((round) => round.getMatch(matchId) !== null);
    if (matches.length >= 1) return matches[0].getMatch(matchId);
    return null;
  }
}

/**
 * A round in the tournament
 * @class
 */
class Round {
  /**
   * Create a new round for the tournament
   * @param {String} id - Unique identifier
   */
  constructor(id) {
    this.id = id;
    this.matches = [];
  }

  /**
   * Adds a match to this round.
   * @param {Match} match - Match to add
   */
  addMatch(match) {
    this.matches.push(match);
  }

  /**
   * Returns a list of the matches in this round.
   * @returns {Match[]}
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the requested match, if it exists
   * @param {String} id - Match id
   * @returns {Match|null}
   */
  getMatch(id) {
    const filter = this.matches.filter(match => match.id === id);
    if (filter.length >= 1) return filter[0];
    return null;
  }
}

/**
 * A match in the tournament between two entrants
 * @class
 */
class Match {
  /**
   * Creates a new match within the tournament
   * @param {String} id - Unique identifier
   * @param {String} entrantA - First entrant
   * @param {String} entrantB - Second entrant
   */
  constructor(id, entrantA, entrantB) {
    this.id = id;
    console.log(this.id);

    this.entA = entrantA;
    this.entB = entrantB;

    this.entrants = arguments;

    this.winner = null;
    this.draw = false;
  }

  /**
   * Marks this match as won
   * @param {String} entrant - Winner of this match
   */
  markWinner(entrant) {
    this.winner = entrant;
  }

  /**
   * Toggles whether the round was a draw
   */
  toggleDraw() {
    this.draw = !this.draw;
  }
}

module.exports = {
  Tournament,
  Round,
  Match,
}