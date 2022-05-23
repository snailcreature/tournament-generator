/**
 * Main runtime process
 * @file
 * @requires ./rounds
 */

import '../css/index.css';

const { Tournament } = require('./rounds');

const configSection = document.querySelector('#config');
const tournamentSection = document.querySelector('#tournament');
const rounds = document.querySelector('#rounds');
const entrantList = document.querySelector('#entrant-list');
const create = document.querySelector('#create');
const edit = document.querySelector('#edit');

let tournament = undefined;

create.addEventListener('click', () => {
  const entrants = entrantList.value.split('\n');
  if (entrants.length >= 0 && entrants.every(ent => ent !== '')) {
    if (tournament === undefined || tournament.entrants.length !== entrants.length) {
      tournament = new Tournament("tournament", entrants);
    } else if (!entrants.every(ent => tournament.entrants.includes(ent))) {
      tournament = new Tournament("tournament", entrants);
    }
    const roundList = tournament.getRounds();
    rounds.innerHTML = '<h2>Tournament</h2>';
    for (let i = 1; i <= tournament.roundCount; i++) {
      rounds.innerHTML += `<h3>Round ${i}</h3>`;
      rounds.innerHTML += `<ol>`;
      roundList[i].getMatches().forEach(match => {
        rounds.innerHTML += `<li>${match.entA} vs ${match.entB}</li>`;
      });
      rounds.innerHTML += `</ol>`
    }
    tournamentSection.hidden = false;
    configSection.hidden = true;
  }
});

edit.addEventListener('click', () => {
  configSection.hidden = false;
  tournamentSection.hidden = true;
});