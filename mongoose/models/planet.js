const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanetSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3
  },
  terrain: [String],
  climate: [String],
  swapiUrl: String
})

module.exports = mongoose.model('planet', PlanetSchema);