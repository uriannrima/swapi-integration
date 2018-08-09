const expect = require('chai').expect;
const SWAPI = require('./swapi');

describe('Star Wars API', () => {
  it('should be online', async () => {
    const status = await SWAPI.status();
    expect(status).to.be.equal('OK');
  })

  it('should list all planets', async () => {
    const planets = await SWAPI.listPlanets();
    expect(planets).not.be.empty;
  })

  it('should find planet by id', async () => {
    const planet = await SWAPI.findPlanetById(1);
    expect(planet).not.be.empty;
  })

  it('should find planet url', async () => {
    const url = await SWAPI.findPlanetUrl('Alderaan');
    expect(url).not.be.empty;
  })
})