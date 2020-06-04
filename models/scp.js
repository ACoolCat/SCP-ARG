const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scpSchema = new Schema({
  img: {type: String, require: true},
  name: {type: String, require: true},
  found: {type: String, require: true},
  detained: {type: String, require: true},
  capabilities: {type: String, require: true},
  threat: {type: Number, minimum: 0, maximum: 10},
  experiment: {type: String, require: true},
  warning: {type: String, require: true},
})

const Scp = mongoose.model('Scp', scpSchema);

module.exports = Scp;
