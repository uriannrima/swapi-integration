const chai = require('chai');
chai.use(require('chai-like'));
const expect = chai.expect;
const Repository = require('./planets');

describe('Planets reposity', () => {

  const fakeModel = {
    planets: [],
    async findById(id) {
      const planet = this.planets.find(planet => planet._id.toString() === id);
      if (!planet) throw Error('Not found');
      return planet;
    },
    async create(planet) {
      planet._id = this.planets.length;
      this.planets.push(planet);
      return planet;
    },
    async list(filter) {
      filter = filter || {};
      const { name } = filter;
      if (name !== undefined) {
        return this.planets.filter(planet => planet.name.includes(name));
      }
      return this.planets;

    },
    async delete(id) {
      return this.planets.find(planet => planet._id === id)
    }
  };

  const repository = new Repository({ model: fakeModel });

  const mockPlanet = {
    name: 'Planet XPTO',
    climate: ['arid', 'temparetae'],
    terrain: ["desert"]
  };

  it('should create new planets', async () => {
    const createPlanet = await repository.create(mockPlanet);
    expect(createPlanet).to.deep.equal(mockPlanet);
  })

  it('should list planets', async () => {
    const planets = await repository.list();
    expect(planets.length).greaterThan(0);
  })

  describe('should filter planets', () => {
    it('by valid name', async () => {
      const planets = await repository.list({ name: mockPlanet.name.substring(0, 3) });
      expect(planets).to.be.like([mockPlanet]);
    })

    it('by unvalid name', async () => {
      const planets = await repository.list({ name: 'rock' });
      expect(planets).to.be.empty;
    })
  })

  it('should find planet by id', async () => {
    const planet = await repository.findById('0');
    expect(planet).to.be.like(mockPlanet);
  })

  it('should delete existing planets', async () => {
    const deletedPlanet = await repository.delete(mockPlanet._id);
    expect(deletedPlanet).to.deep.equal(mockPlanet);
  })
});