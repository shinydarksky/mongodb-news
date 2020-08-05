const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const pathData = 'mongodb://localhost:27017/mongodb-news'
app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.listen(port)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect(pathData, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('Mongodb connect success')
    } else {
        console.log('Mongodb connect fail')
    }
});
mongoose.set('useFindAndModify', false)
//models
const Category = require('./models/category')
//
app.get('/', (req, res) => res.send('test'))
app.get('/menu/add', (req, res) => {
    res.render('mainAdmin',{page:'add'})
})