const expect = require('chai').expect;
const model = require('./planets');

describe('Planets models', () => {
  const mockPlanet = {
    name: 'Planet XPTO',
    climate: ['arid', 'temparetae'],
    terrain: ["desert"]
  };

  it('should create new planets', async () => {
    const createPlanet = await model.create(mockPlanet);
    expect(createPlanet).to.deep.equal(mockPlanet);
  })

  it('should list planets', async () => {
    const planets = await model.list();
    expect(planets.length).greaterThan(0);
  })

  it('should delete existing planets', async () => {
    const deletedPlanet = await model.delete(mockPlanet._id);
    expect(deletedPlanet).to.deep.equal(mockPlanet);
  })
});