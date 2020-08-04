const mongoose = require('mongoose')
const Schema = mongoose.Schema

const level2Schema = new Schema({
    name:String
})

module.exports = mongoose.model('level2',level2Schema)