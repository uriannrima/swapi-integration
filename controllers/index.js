const PlanetsRepository = require('../repositories/planets');
const planetsModel = require('../models/planets');

module.exports = function (app) {
  require('./health-status')(app);
  require('./planets/planets')(app, new PlanetsRepository({ model: planetsModel }));
};