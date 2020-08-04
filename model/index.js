const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const pathData = 'mongodb://localhost:27017/mongodb-popular'
app.listen(port)
mongoose.connect(pathData, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(!err)
    {
        console.log('Mongodb connect success')
    }else
    {
        console.log('Mongodb connect fail')
    }
});
mongoose.set('useFindAndModify', false)
app.get('/',(req,res)=>res.send('test'))
const Level1 = require('./level1')
const Level2 = require('./level2')
app.get('/level1/:name',(req,res)=>{
    let level =  new Level1({
        name:req.params.name
    })
    level.save((err)=>{
        if(err){
            res.json('errMgs: '+err)
        }else{
            res.json('success')
        }
    })
})
app.get('/level2/:id/:name',(req,res)=>{
    let level2 = new Level2({
        name:req.params.name,
        parent:req.params.id
    }) 
    level2.save((err)=>{
        if(err){
            res.json('errMgs: '+err)
        }else{
            res.json('success')
        }
    })
})

app.get('/home', (req, res) => {
    Level2.aggregate([{
        $lookup:{
            from:'level1',
            localField:'parent',
            foreignField:'_id',
            as:'level1'
        }
    }],(err,data)=>{
        if(err)
        {
            res.json('errMgs: '+err)
        }else
        {
            res.json(data)
        }
    })
})