
// Temporary Planets
var planets = [];

exports.list = function () {
  return new Promise(res => {
    res(planets);
  });
}

exports.create = function (planet) {
  return new Promise(res => {
    planet._id = planets.length;
    planets.push(planet);
    res(planet);
  });
};

exports.delete = function (id) {
  return new Promise((res, rej) => {
    const foundPlanet = planets.find(planet => planet._id.toString() === id);
    if (!foundPlanet) {
      rej(new Error('Not found'));
    } else {
      planets = planets.filter(planet => planet._id === id);
      res(foundPlanet);
    }
  });
};
