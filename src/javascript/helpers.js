
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

/**
 * @classdesc - A base object that enables event handling.
 */
class BasicObject {
  constructor() {}

  /**
   * Creates an event listener for the named event.
   * @param {String} eventName - Name of the event to listen for
   * @param {Function} handler - Callback function
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  }

  /**
   * Removes a handler for the given event.
   * @param {String} eventName - Name of the event
   * @param {Function} handler - Callback function
   * @returns {null}
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  }

  /**
   * Triggers the handler for a given event using the given arguments.
   * @param {String} eventName - Name of the event to trigger
   * @param  {...any} args - Arguments to pass to the handler
   * @returns {null}
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) return;

    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
}

module.exports = {
  getRounds,
  random,
  BasicObject,
}