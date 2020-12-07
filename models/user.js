const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Events } = require('./event')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: value => value.indexOf('@') > 0,
      message: props => `${props.value} is not a valid mail`,
    },
    index: {
      unique: true, sparse: true,
    },
  },
  firstName: String,
  lastName: String
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;