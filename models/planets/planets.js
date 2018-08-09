
// Temporary Planets
var planets = [];

exports.list = function (filter) {
  filter = filter || {};
  const { name } = filter;
  return new Promise(res => {
    var selectedPlanets = planets;
    if (name !== undefined) {
      selectedPlanets = planets.filter(p => p.name === name);
    }
    res(selectedPlanets);
  });
}

exports.findById = function (id) {
  return new Promise((res, rej) => {
    const planet = planets.find(p => p._id.toString() === id)
    if (!planet) rej(new Error('Not found'))
    res(planet);
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
      planets = planets.filter(planet => planet._id !== foundPlanet._id);
      res(foundPlanet);
    }
  });
};
