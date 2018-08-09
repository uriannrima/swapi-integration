const chai = require('chai');
chai.use(require('chai-like'));
const expect = chai.expect;

require('../../config/mongoose')();
const model = require('./planets');

describe('Planets models', () => {
  var mockPlanetId = '';
  var mockPlanet = {
    name: 'Planet XPTO',
    climate: ['arid', 'temparetae'],
    terrain: ["desert"]
  };

  it('should create new valid planets', async function () {
    const createPlanet = await model.create(mockPlanet);
    expect(createPlanet).to.be.like(mockPlanet);
    mockPlanetId = createPlanet._id;
  });

  it('should not create invalid planets', async () => {
    try {
      await model.create({});
    } catch (error) {
      return expect(error).to.not.be.empty;
    }
  });

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
    const planet = await model.findById(mockPlanetId);
    expect(planet).to.be.like(mockPlanet);
  })

  describe('after executing previous tests', () => {
    it('should delete existing planets', async () => {
      const deletedPlanet = await model.delete(mockPlanetId);
      expect(deletedPlanet).to.be.like(mockPlanet);
    })
  })
});