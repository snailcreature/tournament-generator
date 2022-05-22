
function getRounds (x) { return (((x**2-x)/2)+x)/(Math.floor(x/2)+x%2); }

function random (min=0, max=50) { return Math.floor(Math.random() * (max - min) + min); }

module.exports = {
  getRounds,
  random,
}