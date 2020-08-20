const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const pathData = 'mongodb://localhost:27017/mongodb-news'
// const pathData = 'mongodb+srv://thanhloc:9nq3mBEx3iSu6tAk@cluster0.cbei7.gcp.mongodb.net/mongodb-news?retryWrites=true&w=majority'
// pass 9nq3mBEx3iSu6tAk
app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'ejs')
app.listen(process.env.PORT || port)
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
const New = require('./models/new')
const { response } = require('express')
//
app.get('/', (req, res) => res.redirect('/menu/list'))
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
            res.redirect('/menu/add')
        } {
            res.redirect('/menu/list')
        }
    })

})

app.get('/menu/list', (req, res) => {
    Category.find((err, data) => {
        if (err) {
            res.json('errMgs: ' + err)
            res.redirect('/menu/add')
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
            res.redirect('/menu/add')
        }
        else {
            res.render('mainAdmin', { page: 'edit', data: data })
        }
    })
})
app.post('/menu/list/edit', (req, res) => {
    Category.findByIdAndUpdate(req.body.id, {
        name: req.body.txtName,
        ordering: req.body.txtOrdering,
        active: req.body.txtActive
    }, (err, data) => {
        if (err) {
            console.log('errMgs: ' + err)
            res.redirect('/menu/list/edit')
        }
        else {
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
app.get('/new/add', (req, res) => {
    Category.find((err, data) => {
        if (err) {
            res.json('errMgs: ' + err)
            res.redirect('/new/add')
        } else {
            // res.json(data)
            res.render('mainAdmin', { page: 'newAdd', data: data })
        }
    })
})
app.post('/new/add', (req, res) => {
    var multer = require('multer');
    var upload = require('./controllers/uploadFile')
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.json('Upload file error')
        } else if (err) {
            res.json('errMgs: ' + err)
        } else {
            var filename = 'Empty'
            if (req.file) {
                filename = req.file.filename
            }
            var news = new New({
                title: req.body.txtTitle,
                description: req.body.txtDescription,
                image: filename,
                content: req.body.txtContent,
                ordering: req.body.txtOrdering,
                active: req.body.txtActive
            })
            news.save((err) => {
                if (err) {
                    res.json('errmgs: ' + err)
                } else {
                    Category.findOneAndUpdate({ _id: req.body.txtCategory }, { $push: { kids: news._id } }, (err) => {
                        res.json(req.body.txtCategory)
                    })
                }

            })
        }
    })
})

app.get('/new/list', (req, res) => {
    Category.aggregate([{
        $lookup: {
            from: 'news',
            localField: 'kids',
            foreignField: '_id',
            as: 'Category'
        }
    }], (err, data) => {
        if (err) {
            res.json('errMgs: ' + err)
        } else {
            // res.json(data)
            res.render('mainAdmin', { page: 'newList', data: data })
        }
    })
})




app.get('/test', (req, res) => {
    Category.findOneAndUpdate("5f3e7037cd53ca4740c35f58",{ $pull:{kids:"5f3e7055cd53ca4740c35f5b"}} ,(err) => {
        res.json('success')
    })
})