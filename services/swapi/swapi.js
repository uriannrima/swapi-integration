const fetch = require('node-fetch');

class SWAPI {
  constructor({ url } = {}) {
    this.url = url || "https://swapi.co/api"
  }

  status() {
    return fetch(this.url).then(response => {
      return 'OK'
    }).catch(reason => {
      return 'Fail'
    })
  }

  getPlanetByUrl(url) {
    return fetch(url)
      .then(res => res.json());
  }

  listPlanets() {
    return fetch(`${this.url}/planets`)
      .then(res => res.json())
      .then(body => body.results);
  }

  findPlanetById(id) {
    return fetch(`${this.url}/planets/${id}`)
      .then(res => res.json());
  }

  async findPlanetUrl(name) {
    var planets = await this.listPlanets();

    planets = planets.map(planet => {
      const { name, url } = planet;
      return { name, url };
    });

    const swapiPlanet = planets.find(planet => planet.name.toLowerCase() === name.toLowerCase())
    if (swapiPlanet) return swapiPlanet.url;

    return '';
  }
};

module.exports = new SWAPI();