const express = require('express')
const SWAPI = require('../../services/swapi');

module.exports = function (app, repository) {
  const router = express.Router()

  app.use('/planets', router)

  router.get('/', async (req, res) => {
    try {
      const planets = await repository.list(req.query);
      await Promise.all(planets.map(async planet => {
        if (planet.swapiUrl) {
          const swapiPlanet = await SWAPI.getPlanetByUrl(planet.swapiUrl);
          planet.appearances = swapiPlanet.films.length;
        }
      }))
      res.json(planets);
    } catch (error) {
      throw error;
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const planet = await repository.findById(req.params.id)
      if (planet.swapiUrl) {
        const swapiPlanet = await SWAPI.getPlanetByUrl(planet.swapiUrl);
        planet.appearances = swapiPlanet.films.length;
      }
      res.json(planet);
    } catch (error) {
      if (error.message === 'Not found') {
        res.sendStatus(404);
      } else {
        console.log(error);
        res.sendStatus(500);
      }
    }
  })

  router.post('/', async (req, res) => {
    try {
      const { name, climate, terrain } = req.body;
      const swapiUrl = await SWAPI.findPlanetUrl(name);
      const planet = { name, climate, terrain, swapiUrl };
      const createdPlanet = await repository.create(planet);
      res.json(createdPlanet);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const planet = await repository.delete(req.params.id);
      res.json(planet);
    } catch (error) {
      if (error.message === 'Not found') {
        res.sendStatus(404);
      } else {
        console.log(error);
        res.sendStatus(500);
      }
    }
  })

  return router;
};