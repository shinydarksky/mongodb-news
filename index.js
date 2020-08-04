const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const pathData = 'mongodb://localhost:27017/mongodb-news'
app.listen(port)
const controller = require('./controllers/controller')
const level1 = require('./models/level1')
mongoose.connect(pathData, { useNewUrlParser: true, useUnifiedTopology: true }, controller.connect);
mongoose.set('useFindAndModify', false)
app.get('/', (req, res) => res.send('test'))
app.get('/level1/:name', controller.level1)
app.get('/level2/:id/:name', controller.level2)
app.get('/home', controller.home)