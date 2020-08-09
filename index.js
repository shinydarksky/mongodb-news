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
const category = require('./models/category')
//
app.get('/', (req, res) => res.send('test'))
app.get('/menu/add', (req, res) => {
    res.render('mainAdmin', { page: 'add' })
})
app.post('/menu/add', (req, res) => {
    var category = new Category({
        name: req.body.txtName,
        ordering: req.body.txtOrdering,
        active: req.body.txtActive
    })
    category.save((err) => {
        if (err) {
            res.json('errMgs: ' + err)
        } {
            console.log('success')
        }
    })
    res.redirect('/menu/add')
})

app.get('/menu/list', (req, res) => {
    Category.find((err, data) => {
        if (err) {
            res.json('errMgs: ' + err)
        }
        else {
            res.render('mainAdmin', { page: 'list', data: data.sort() })
        }
    })
})
app.get('/menu/list/edit/:id', (req, res) => {
    Category.findById(req.params.id, (err, data) => {
        if (err) {
            res.json('errMgs: ' + err)
        }
        else {
            res.render('mainAdmin', { page: 'edit', data: data })
        }
    })
})
app.post('/menu/list/edit', (req, res) => {
    Category.findByIdAndUpdate(req.body.id, {
        name: req.body.txtName,
        ordering: req.body.txtOrdering
    }, (err, data) => {
        if(err)
            {
                console.log('errMgs: '+err)
                res.redirect('/menu/list/edit') 
            }
        else
            {
                res.redirect('/menu/list') 
            }
    })
})
app.get('/menu/list/delete/:id', (req, res) => {
    console.log(req.params.id)
    Category.findByIdAndDelete(req.params.id, (err, data) => {
        if (err)
            console.log('errMgs: ' + err)
    })
    res.redirect('/menu/list')
})
