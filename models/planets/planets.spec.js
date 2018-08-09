const chai = require('chai');
chai.use(require('chai-like'));
const expect = chai.expect;
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

  describe('should filter planets', () => {
    it('by valid name', async () => {
      const planets = await model.list({ name: mockPlanet.name });
      expect(planets).to.be.like([mockPlanet]);
    })

    it('by unvalid name', async () => {
      const planets = await model.list({ name: 'rock' });
      expect(planets).to.be.empty;
    })
  })

  it('should find planet by id', async () => {
    const planet = await model.findById('0');
    expect(planet).to.be.like(mockPlanet);
  })

  describe('after executing previous tests', () => {
    it('should delete existing planets', async () => {
      const deletedPlanet = await model.delete('0');
      expect(deletedPlanet).to.deep.equal(mockPlanet);
    })
  })
});