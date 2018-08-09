const express = require('express')

module.exports = function (app) {
  const router = express.Router()
  
  router.get('/', (req, res) => {
    res.status(200).json({
      Status: 'OK',
      Database: 'Off',
      StarWarsAPI: 'Off'
    });
  })

  app.use('/health-status', router)
}