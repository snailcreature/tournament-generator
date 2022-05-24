const { EventEmitter } = require('events');

/**
 * Takes the number of participants and calculates the minimum number of rounds requires to find a winner.
 * @param {Number} x - Number of participants
 * @returns {Number}
 */
function getRounds (x) { return (((x**2-x)/2)+x)/(Math.floor(x/2)+x%2); }

/**
 * Generates a random integer value between two values.
 * @param {Number} min - Minimum value
 * @param {Number} max - Maximum value
 * @returns {Number}
 */
function random (min=0, max=50) { return Math.floor(Math.random() * (max - min) + min); }

module.exports = {
  getRounds,
  random,
}