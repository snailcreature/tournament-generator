const Set = require('set');

let jsonMixin  = {
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
  }
}

Object.assign(Set.prototype, jsonMixin);

module.exports = {
  Set,
}