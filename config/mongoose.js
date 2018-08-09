require('dotenv').config();
const mongoose = require('mongoose');

module.exports = function () {
  const {
    MONGODB_URL,
    MONGODB_USER,
    MONGODB_PASSWORD,
  } = process.env;

  mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/web-dcs`, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;

  var db = mongoose.connection;
  
  /*eslint-disable-next-line no-console */
  db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
}
