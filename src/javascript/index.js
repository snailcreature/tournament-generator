/**
 * Main runtime process
 * @file
 * @requires ./rounds
 */

import '../css/index.css';

const { Tournament } = require('./rounds');

const configSection = document.querySelector('#config');
const winPoints = document.querySelector('#winpoints');
const drawPoints = document.querySelector('#drawpoints');
const losePoints = document.querySelector('#losepoints');
const editDesc = document.querySelector('#editdescription')
const tournamentSection = document.querySelector('#tournament');
const rounds = document.querySelector('#rounds');
const scores = document.querySelector('#scores');
const showDesc = document.querySelector('#showdescription');
const entrantList = document.querySelector('#entrant-list');
const create = document.querySelector('#create');
const edit = document.querySelector('#edit');

let tournament = undefined;

function sortByScore() {
  return tournament.entrants.sort().sort((a, b) => {
    return tournament.scores[a] > tournament.scores[b] ? -1 : 1;
  })
}

function makeScoreSheet() {
  scores.innerHTML = '';
  sortByScore().map((ent) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = ent;
    nameCell.classList = "name-cell";
    const scoreCell = document.createElement('td');
    scoreCell.textContent = tournament.scores[ent];
    scoreCell.addEventListener('scoresupdated', () => {
      scoreCell.textContent = tournament.scores[ent];
    });
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    scores.appendChild(row);
  });
}

function makeTournament(entrants) {
  tournament = new Tournament("tournament", entrants, parseInt(winPoints.value), parseInt(drawPoints.value), parseInt(losePoints.value));
  const roundList = tournament.getRounds();
  rounds.innerHTML = '';

  makeScoreSheet();

  for (let i = 1; i <= tournament.roundCount; i++) {
    rounds.innerHTML += `<h3>Round ${i}</h3>`;
    rounds.innerHTML += `<ol>`;
    roundList[i].getMatches().forEach(match => {
      rounds.innerHTML += `<li>${match.entA} vs ${match.entB}</li>`;

      const winSelect = document.createElement('select');
      winSelect.id = match.id;
      winSelect.classList = "border";
      const blankOpt = document.createElement('option');
      blankOpt.value = 'null';
      const entAOpt = document.createElement('option');
      entAOpt.value = match.entA;
      entAOpt.textContent = match.entA;
      const entBOpt = document.createElement('option');
      entBOpt.value = match.entB;
      entBOpt.textContent = match.entB;
      const drawOpt = document.createElement('option');
      drawOpt.value = 'draw';
      drawOpt.textContent = `It's a draw!`;
      winSelect.appendChild(blankOpt);
      winSelect.appendChild(entAOpt);
      winSelect.appendChild(entBOpt);
      winSelect.appendChild(drawOpt);
      rounds.appendChild(winSelect);
    });
    rounds.innerHTML += `</ol>`;
  }

}

function buildLayout() {
  const entrants = entrantList.value.split('\n');
  if (entrants.length >= 0 && entrants.every(ent => ent !== '' && ent !== 'draw')) {
    if (tournament === undefined || tournament.entrants.length !== entrants.length) {
      makeTournament(entrants);
    } else if (tournament.win !== parseInt(winPoints.value) || tournament.draw !== parseInt(drawPoints.value) || tournament.loss !== parseInt(losePoints.value)) {
      makeTournament(entrants);
    } else if (!entrants.every(ent => tournament.entrants.includes(ent))) {
      makeTournament(entrants);
    }
    
    showDesc.textContent = editDesc.value + `\nWin: ${winPoints.value}, Draw: ${drawPoints.value}, Loss: ${losePoints.value}`;

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

  if (e.target.value !== 'draw') {
    const match = tournament.getMatch(e.target.id);
    if (match.draw) match.toggleDraw();
    match.markWinner(e.target.value);
  } else {
    tournament.getMatch(e.target.id).toggleDraw();
  }
  tournament.updateScores();
  makeScoreSheet()
});