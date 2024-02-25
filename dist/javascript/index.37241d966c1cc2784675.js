/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktournament_generator"] = self["webpackChunktournament_generator"] || []).push([["index"],{

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://tournament-generator/./src/css/index.css?");

/***/ }),

/***/ "./src/javascript/helpers.js":
/*!***********************************!*\
  !*** ./src/javascript/helpers.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { EventEmitter } = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n\n/**\n * Takes the number of participants and calculates the minimum number of rounds requires to find a winner.\n * @param {Number} x - Number of participants\n * @returns {Number}\n */\nfunction getRounds (x) { return (((x**2-x)/2)+x)/(Math.floor(x/2)+x%2); }\n\n/**\n * Generates a random integer value between two values.\n * @param {Number} min - Minimum value\n * @param {Number} max - Maximum value\n * @returns {Number}\n */\nfunction random (min=0, max=50) { return Math.floor(Math.random() * (max - min) + min); }\n\nmodule.exports = {\n  getRounds,\n  random,\n}\n\n//# sourceURL=webpack://tournament-generator/./src/javascript/helpers.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _assets_16x16_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/16x16.png */ \"./src/assets/16x16.png\");\n/* harmony import */ var _assets_32x32_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/32x32.png */ \"./src/assets/32x32.png\");\n/* harmony import */ var _assets_128x128_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/128x128.png */ \"./src/assets/128x128.png\");\n/* harmony import */ var _assets_256x256_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/256x256.png */ \"./src/assets/256x256.png\");\n/* harmony import */ var _assets_500x500_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/500x500.png */ \"./src/assets/500x500.png\");\n/* harmony import */ var _assets_favicon_ico__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/favicon.ico */ \"./src/assets/favicon.ico\");\n/**\n * Main runtime process\n * @file\n * @requires ./rounds\n */\n\n\n\n\n\n\n\n\n\nconst { Tournament } = __webpack_require__(/*! ./rounds */ \"./src/javascript/rounds.js\");\n\nconst configSection = document.querySelector('#config');\nconst winPoints = document.querySelector('#winpoints');\nconst drawPoints = document.querySelector('#drawpoints');\nconst losePoints = document.querySelector('#losepoints');\nconst editDesc = document.querySelector('#editdescription')\nconst tournamentSection = document.querySelector('#tournament');\nconst rounds = document.querySelector('#rounds');\nconst scores = document.querySelector('#scores');\nconst showDesc = document.querySelector('#showdescription');\nconst entrantList = document.querySelector('#entrant-list');\nconst create = document.querySelector('#create');\nconst edit = document.querySelector('#edit');\n\nlet tournament = undefined;\n\nfunction sortByScore() {\n  return tournament.entrants.sort().sort((a, b) => {\n    return tournament.scores[a] > tournament.scores[b] ? -1 : 1;\n  })\n}\n\nfunction makeScoreSheet() {\n  scores.innerHTML = '';\n  sortByScore().map((ent) => {\n    const row = document.createElement('tr');\n    const nameCell = document.createElement('td');\n    nameCell.textContent = ent;\n    nameCell.classList = \"name-cell\";\n    const scoreCell = document.createElement('td');\n    scoreCell.textContent = tournament.scores[ent];\n    scoreCell.addEventListener('scoresupdated', () => {\n      scoreCell.textContent = tournament.scores[ent];\n    });\n    row.appendChild(nameCell);\n    row.appendChild(scoreCell);\n    scores.appendChild(row);\n  });\n}\n\nfunction makeTournament(entrants) {\n  tournament = new Tournament(\"tournament\", entrants, parseInt(winPoints.value), parseInt(drawPoints.value), parseInt(losePoints.value));\n  const roundList = tournament.getRounds();\n  rounds.innerHTML = '';\n\n  makeScoreSheet();\n\n  for (let i = 1; i <= tournament.roundCount; i++) {\n    rounds.innerHTML += `<h3>Round ${i}</h3>`;\n    rounds.innerHTML += `<ol>`;\n    roundList[i].getMatches().forEach(match => {\n      rounds.innerHTML += `<li>${match.entA} vs ${match.entB}</li>`;\n\n      const winSelect = document.createElement('select');\n      winSelect.id = match.id;\n      winSelect.classList = \"border\";\n      const blankOpt = document.createElement('option');\n      blankOpt.value = 'null';\n      const entAOpt = document.createElement('option');\n      entAOpt.value = match.entA;\n      entAOpt.textContent = match.entA;\n      const entBOpt = document.createElement('option');\n      entBOpt.value = match.entB;\n      entBOpt.textContent = match.entB;\n      const drawOpt = document.createElement('option');\n      drawOpt.value = 'draw';\n      drawOpt.textContent = `It's a draw!`;\n      winSelect.appendChild(blankOpt);\n      winSelect.appendChild(entAOpt);\n      winSelect.appendChild(entBOpt);\n      winSelect.appendChild(drawOpt);\n      rounds.appendChild(winSelect);\n    });\n    rounds.innerHTML += `</ol>`;\n  }\n\n}\n\nfunction buildLayout() {\n  const entrants = entrantList.value.split('\\n');\n  if (entrants.length >= 0 && entrants.every(ent => ent !== '' && ent !== 'draw')) {\n    if (tournament === undefined || tournament.entrants.length !== entrants.length) {\n      makeTournament(entrants);\n    } else if (tournament.win !== parseInt(winPoints.value) || tournament.draw !== parseInt(drawPoints.value) || tournament.loss !== parseInt(losePoints.value)) {\n      makeTournament(entrants);\n    } else if (!entrants.every(ent => tournament.entrants.includes(ent))) {\n      makeTournament(entrants);\n    }\n    \n    showDesc.textContent = editDesc.value + `\\nWin: ${winPoints.value}, Draw: ${drawPoints.value}, Loss: ${losePoints.value}`;\n\n    tournamentSection.hidden = false;\n    configSection.hidden = true;\n  }\n}\n\ncreate.addEventListener('click', buildLayout);\n\nedit.addEventListener('click', () => {\n  configSection.hidden = false;\n  tournamentSection.hidden = true;\n});\n\ndocument.addEventListener('input', (e) => {\n  if (e.target.localName !== 'select' || e.target.tagName !== 'SELECT') return;\n\n  if (!e.target[0].hidden) e.target[0].hidden = true;\n\n  if (e.target.value !== 'draw') {\n    const match = tournament.getMatch(e.target.id);\n    if (match.draw) match.toggleDraw();\n    match.markWinner(e.target.value);\n  } else {\n    tournament.getMatch(e.target.id).toggleDraw();\n  }\n  tournament.updateScores();\n  makeScoreSheet()\n});\n\n//# sourceURL=webpack://tournament-generator/./src/javascript/index.js?");

/***/ }),

/***/ "./src/javascript/rounds.js":
/*!**********************************!*\
  !*** ./src/javascript/rounds.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * @file - Contains handlers for Tournaments, Rounds, and Matches\n * @requires ./set\n * @requires ./helpers\n */\nconst { Set } = __webpack_require__(/*! ./set */ \"./src/javascript/set.js\");\nconst { getRounds, random } = __webpack_require__(/*! ./helpers */ \"./src/javascript/helpers.js\");\n\n/**\n * Tournament object\n * @class\n */\nclass Tournament extends EventTarget {\n  /**\n   * Creates a Tournament object that manages the rounds and matches\n   * @param {String} id - Unique identifier\n   * @param {String[]} entrants - List of entrants\n   * @param {Boolean} shuffle - Should the round order be shuffled\n   */\n  constructor(id, entrants, win=1, draw=0, loss=0, shuffle=true) {\n    super();\n    this.id = id;\n\n    this.entrants = entrants.sort();\n\n    this.scores = {};\n    this.entrants.map((ent) => {this.scores[ent] = 0});\n    this.win = win;\n    this.draw = draw;\n    this.loss = loss;\n\n    this.matchSet = this.createMatchSet();\n\n    this.roundCount = getRounds(entrants.length);\n    this.rounds = [];\n    this.createRounds();\n    if (shuffle) this.shuffleRounds();\n  }\n\n  /**\n   * Creates a set containing all the possible matches\n   * @returns {Set}\n   */\n  createMatchSet() {\n    const matchings = new Set([]);\n    this.entrants.forEach((ent1) => {\n      this.entrants.forEach((ent2) => {\n        let match = [ent1, ent2].sort();\n        matchings.add(match);\n      });\n    });\n    return matchings;\n  }\n\n  /**\n   * Creates the rounds using each of the matches\n   */\n  createRounds() {\n    for (let i = 0; i < this.roundCount; i++) {\n      this.rounds[i+1] = new Round(i);\n    }\n    let start = 1;\n    this.entrants.forEach((entrant) => {\n      const leading = this.matchSet.filter(pair => pair[0] === entrant);\n\n      for (let i = 0; i < leading.length; i++) {\n        let index = start + i;\n        if (index > this.roundCount) index -= this.roundCount;\n\n        if (leading[i][0] !== leading[i][1]) this.rounds[index].addMatch(\n          new Match(leading[i].join('-'), leading[i][0], leading[i][1])\n          );\n      }\n\n      start += 2;\n      if (start > this.roundCount) start -= this.roundCount;\n    });\n  }\n\n  /**\n   * Shuffle the round order.\n   * @param {Number} shifts - How many times should things be switched around\n   */\n  shuffleRounds(shifts=10) {\n    for (let i = 0; i < shifts; i++) {\n      const x = random(1, this.roundCount);\n      const y = random(1, this.roundCount);\n\n      const hold = this.rounds[x];\n      this.rounds[x] = this.rounds[y];\n      this.rounds[y] = hold;\n    }\n  }\n\n  /**\n   * \n   */\n  updateScores() {\n    this.entrants.map((ent) => {this.scores[ent] = 0});\n    this.rounds.map((round) => {\n      round.matches.map((match) => {\n        let loser = match.entA === match.winner ? match.entB : match.entA;\n        if (!match.draw && match.winner !== null ){\n          this.scores[match.winner] += this.win;\n          this.scores[loser] += this.loss;\n        }\n        if (match.draw) {\n          this.scores[match.entA] += this.draw;\n          this.scores[match.entB] += this.draw\n        }\n      });\n    });\n  }\n\n  /**\n   * Returns the list of rounds.\n   * @returns {Round[]}\n   */\n  getRounds() {\n    return this.rounds;\n  }\n\n  /**\n   * Returns the given round, if it exists\n   * @param {Number} i - Round number\n   * @returns {Round|null}\n   */\n  getRound(i) {\n    if (i > 0 && i <= this.roundCount) return this.rounds[i];\n    return null;\n  }\n\n  /**\n   * Attempts to find a given match\n   * @param {String} matchId - ID for match\n   * @returns {Match|null}\n   */\n  getMatch(matchId) {\n    const matches = this.rounds.filter((round) => round.getMatch(matchId) !== null);\n    if (matches.length >= 1) return matches[0].getMatch(matchId);\n    return null;\n  }\n}\n\n/**\n * A round in the tournament\n * @class\n */\nclass Round {\n  /**\n   * Create a new round for the tournament\n   * @param {String} id - Unique identifier\n   */\n  constructor(id) {\n    this.id = id;\n    this.matches = [];\n  }\n\n  /**\n   * Adds a match to this round.\n   * @param {Match} match - Match to add\n   */\n  addMatch(match) {\n    this.matches.push(match);\n  }\n\n  /**\n   * Returns a list of the matches in this round.\n   * @returns {Match[]}\n   */\n  getMatches() {\n    return this.matches;\n  }\n\n  /**\n   * Returns the requested match, if it exists\n   * @param {String} id - Match id\n   * @returns {Match|null}\n   */\n  getMatch(id) {\n    const filter = this.matches.filter(match => match.id === id);\n    if (filter.length >= 1) return filter[0];\n    return null;\n  }\n}\n\n/**\n * A match in the tournament between two entrants\n * @class\n */\nclass Match {\n  /**\n   * Creates a new match within the tournament\n   * @param {String} id - Unique identifier\n   * @param {String} entrantA - First entrant\n   * @param {String} entrantB - Second entrant\n   */\n  constructor(id, entrantA, entrantB) {\n    this.id = id;\n\n    this.entA = entrantA;\n    this.entB = entrantB;\n\n    this.entrants = arguments;\n\n    this.winner = null;\n    this.draw = false;\n  }\n\n  /**\n   * Marks this match as won\n   * @param {String} entrant - Winner of this match\n   */\n  markWinner(entrant) {\n    this.winner = entrant;\n  }\n\n  /**\n   * Toggles whether the round was a draw\n   */\n  toggleDraw() {\n    this.draw = !this.draw;\n  }\n}\n\nmodule.exports = {\n  Tournament,\n  Round,\n  Match,\n}\n\n//# sourceURL=webpack://tournament-generator/./src/javascript/rounds.js?");

/***/ }),

/***/ "./src/javascript/set.js":
/*!*******************************!*\
  !*** ./src/javascript/set.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Set = __webpack_require__(/*! set */ \"./node_modules/set/set.js\");\n\nlet jsonMixin  = {\n  /**\n   * Converts set with unparsed JSON elements into an array\n   * @returns {Array}\n   */\n  toArray() {\n    const arr = [];\n    try {\n      this.get().forEach(element => {\n        arr.push(JSON.parse(element));\n      });\n      return arr;\n    } catch (error) {\n      console.log(error);\n    }\n  },\n\n  /**\n   * Filters the contents of the set by a given predicate\n   * @param {Function} predicate \n   * @returns {Array}\n   */\n  filter(predicate) {\n    try {\n      const arr = this.toArray();\n      return arr.filter(predicate);\n    } catch (error) {\n      const arr = this.get();\n      return arr.filter(predicate);\n    }\n  },\n\n  /**\n   * Removes elements based on a predicate\n   * @param {Function} predicate - Predicate to assess whether the element should be kept\n   */\n  trim(predicate) {\n    const out = new Set(this.filter(predicate));\n    return out;\n  }\n}\n\nObject.assign(Set.prototype, jsonMixin);\n\nmodule.exports = {\n  Set,\n}\n\n//# sourceURL=webpack://tournament-generator/./src/javascript/set.js?");

/***/ }),

/***/ "./src/assets/128x128.png":
/*!********************************!*\
  !*** ./src/assets/128x128.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"63199c3af1fe0262fe13.png\";\n\n//# sourceURL=webpack://tournament-generator/./src/assets/128x128.png?");

/***/ }),

/***/ "./src/assets/16x16.png":
/*!******************************!*\
  !*** ./src/assets/16x16.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"cec3cb2dac9a15e0b52f.png\";\n\n//# sourceURL=webpack://tournament-generator/./src/assets/16x16.png?");

/***/ }),

/***/ "./src/assets/256x256.png":
/*!********************************!*\
  !*** ./src/assets/256x256.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"e8dc298af4ab56cbe45a.png\";\n\n//# sourceURL=webpack://tournament-generator/./src/assets/256x256.png?");

/***/ }),

/***/ "./src/assets/32x32.png":
/*!******************************!*\
  !*** ./src/assets/32x32.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"826b3759b3f82df44081.png\";\n\n//# sourceURL=webpack://tournament-generator/./src/assets/32x32.png?");

/***/ }),

/***/ "./src/assets/500x500.png":
/*!********************************!*\
  !*** ./src/assets/500x500.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"35e141f9a27ce1b72469.png\";\n\n//# sourceURL=webpack://tournament-generator/./src/assets/500x500.png?");

/***/ }),

/***/ "./src/assets/favicon.ico":
/*!********************************!*\
  !*** ./src/assets/favicon.ico ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"3665a6f88ce09405e3ba.ico\";\n\n//# sourceURL=webpack://tournament-generator/./src/assets/favicon.ico?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/javascript/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);