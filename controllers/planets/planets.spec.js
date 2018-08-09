const app = require('../../app');
const request = require('supertest');
const chai = require('chai');
chai.use(require('chai-like'));
const expect = chai.expect;
const registerController = require('./planets');

describe('Planets controller', () => {
  const fakeRepository = {
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
      return this.planets.find(planet => planet._id.toString() === id)
    }
  };

  const mockPlanet = {
    name: 'Alderaan',
    climate: ['arid', 'temparetae'],
    terrain: ["desert"]
  };

  it('should register itself on application', (done) => {
    registerController(app, fakeRepository);
    request(app)
      .get('/planets')
      .expect(200, done)
  })

  it('should create new planets with SWAPI Url', (done) => {
    request(app)
      .post('/planets')
      .send(mockPlanet)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).to.have.property('swapiUrl').not.be.empty;
      })
      .then(done)
      .catch(done)
  }).timeout(2500)

  it('should list planets with total appearances', (done) => {
    request(app)
      .get('/planets')
      .expect(200)
      .then(response => {
        expect(response.body).to.be.like([mockPlanet]);
        expect(response.body[0]).to.have.property('appearances').not.equal(0);
      })
      .then(done)
      .catch(done)
  }).timeout(2500)

  describe('should filter planets', () => {
    it('by valid name', (done) => {
      request(app)
        .get('/planets?name=' + mockPlanet.name.substring(0, 3))
        .expect(200)
        .then(response => {
          expect(response.body).to.be.like([mockPlanet]);
        })
        .then(done)
    })

    it('by unvalid name', (done) => {
      request(app)
        .get('/planets?name=rock')
        .expect(200)
        .then(response => {
          expect(response.body).to.be.empty;
        })
        .then(done)
    })
  })

  it('should find planet by id', (done) => {
    request(app)
      .get('/planets/0')
      .expect(200)
      .then(response => {
        expect(response.body).to.be.like(mockPlanet);
      })
      .then(done)
  })

  it('should delete existing planets', (done) => {
    request(app)
      .delete('/planets/0')
      .expect(200)
      .then(response => {
        expect(response.body).to.be.like(mockPlanet);
      })
      .then(done)
  })

});