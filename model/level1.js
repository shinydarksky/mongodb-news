const mongoose = require('mongoose')
const Schema = mongoose.Schema
const level1Schema = new Schema({
    name:String
})

module.exports = mongoose.model('level1',level1Schema)