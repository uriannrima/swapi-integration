const express = require('express')

module.exports = function (app, repository) {
  const router = express.Router()

  app.use('/planets', router)

  router.get('/', async (req, res) => {
    try {
      const planets = await repository.list(req.query);
      res.json(planets);
    } catch (error) {
      throw error;
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const planet = await repository.findById(req.params.id)
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
      const planet = { name, climate, terrain };
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