const Set = require('set');

let jsonMixin  = {
  /**
   * Converts set with unparsed JSON elements into an array
   * @returns {Array}
   */
  toArray() {
    const arr = [];
    try {
      this.get().forEach(element => {
        arr.push(JSON.parse(element));
      });
      return arr;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Filters the contents of the set by a given predicate
   * @param {Function} predicate 
   * @returns {Array}
   */
  filter(predicate) {
    try {
      const arr = this.toArray();
      return arr.filter(predicate);
    } catch (error) {
      const arr = this.get();
      return arr.filter(predicate);
    }
  },

  /**
   * Removes elements based on a predicate
   * @param {Function} predicate - Predicate to assess whether the element should be kept
   */
  trim(predicate) {
    const out = new Set(this.filter(predicate));
    return out;
  }
}

Object.assign(Set.prototype, jsonMixin);

module.exports = {
  Set,
}