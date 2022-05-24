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

function buildLayout() {
  const entrants = entrantList.value.split('\n');
  if (entrants.length >= 0 && entrants.every(ent => ent !== '')) {
    if (tournament === undefined || tournament.entrants.length !== entrants.length) {
      tournament = new Tournament("tournament", entrants);
      const roundList = tournament.getRounds();
      rounds.innerHTML = '<h2>Tournament</h2>';
      for (let i = 1; i <= tournament.roundCount; i++) {
        rounds.innerHTML += `<h3>Round ${i}</h3>`;
        rounds.innerHTML += `<ol>`;
        roundList[i].getMatches().forEach(match => {
          rounds.innerHTML += `<li>${match.entA} vs ${match.entB}</li>`;

          const winSelect = document.createElement('select');
          winSelect.id = match.id;
          const blankOpt = document.createElement('option');
          blankOpt.value = 'null';
          const entAOpt = document.createElement('option');
          entAOpt.value = match.entA;
          entAOpt.textContent = match.entA;
          const entBOpt = document.createElement('option');
          entBOpt.value = match.entB;
          entBOpt.textContent = match.entB;
          winSelect.appendChild(blankOpt);
          winSelect.appendChild(entAOpt);
          winSelect.appendChild(entBOpt);
          rounds.appendChild(winSelect);
        });
        rounds.innerHTML += `</ol>`;
      }
    } else if (!entrants.every(ent => tournament.entrants.includes(ent))) {
      tournament = new Tournament("tournament", entrants);
      const roundList = tournament.getRounds();
      rounds.innerHTML = '<h2>Tournament</h2>';
      for (let i = 1; i <= tournament.roundCount; i++) {
        rounds.innerHTML += `<h3>Round ${i}</h3>`;
        rounds.innerHTML += `<ol>`;
        roundList[i].getMatches().forEach(match => {
          rounds.innerHTML += `<li>${match.entA} vs ${match.entB}</li>`;

          const winSelect = document.createElement('select');
          winSelect.id = match.id;
          const blankOpt = document.createElement('option');
          blankOpt.value = 'null';
          const entAOpt = document.createElement('option');
          entAOpt.value = match.entA;
          const entBOpt = document.createElement('option');
          entBOpt.value = match.entB;
          entBOpt.textContent = match.entB;
          winSelect.appendChild(blankOpt);
          winSelect.appendChild(entAOpt);
          winSelect.appendChild(entBOpt);
          rounds.appendChild(winSelect);
        });
        rounds.innerHTML += `</ol>`;
      }
    }
    
    tournamentSection.hidden = false;
    configSection.hidden = true;
  }
}

create.addEventListener('click', buildLayout);

edit.addEventListener('click', () => {
  configSection.hidden = false;
  tournamentSection.hidden = true;
});

document.addEventListener('input', (e) => {
  if (e.target.localName !== 'select' || e.target.tagName !== 'SELECT') return;

  if (!e.target[0].hidden) e.target[0].hidden = true;

  tournament.getMatch(e.target.id).markWinner(e.target.value);
  tournament.updateScores();
  console.log(tournament.scores);
});