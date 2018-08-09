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
      if (name !== undefined) return this.planets.filter(planet => planet.name === name);
      return this.planets;
    },
    async delete(id) {
      return this.planets.find(planet => planet._id.toString() === id)
    }
  };

  const mockPlanet = {
    name: 'Planet XPTO',
    climate: ['arid', 'temparetae'],
    terrain: ["desert"]
  };

  it('should register itself on application', (done) => {
    registerController(app, fakeRepository);
    request(app)
      .get('/planets')
      .expect(200, done)
  })

  it('should create new planets', (done) => {
    request(app)
      .post('/planets')
      .send(mockPlanet)
      .set('Accept', 'application/json')
      .expect(200, done)
  })

  it('should list planets', (done) => {
    request(app)
      .get('/planets')
      .expect(200, done)
  })

  describe('should filter planets', () => {
    it('by valid name', (done) => {
      request(app)
        .get('/planets?name=' + mockPlanet.name)
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

  it('should list planets by id', (done) => {
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