const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'user';
const DB_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@nodejscourse.emndc.mongodb.net/NodejsCourse?retryWrites=true&w=majority`;

const db = {
  start: () => {
    mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
};

module.exports = db