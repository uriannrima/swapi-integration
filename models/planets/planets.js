const PlanetModel = require('../../mongoose/models/planet');

// Temporary Planets
var planets = [];

exports.list = async function (filter) {
  filter = filter || {};
  return await PlanetModel.find(filter).lean();
}

exports.findById = async function (id) {
  try {
    return await PlanetModel.findOne({ _id: id }).lean();
  } catch (error) {
    throw error;
  }
}

exports.create = async function (model) {
  try {
    const planet = new PlanetModel(model);
    await planet.validate();
    return await planet.save();
  } catch (error) {
    throw error;
  }
};

exports.delete = async function (id) {
  try {
    return await PlanetModel.findOneAndRemove({ _id: id });
  } catch (error) {
    throw error;
  }
};
