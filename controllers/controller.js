const mongoose = require('mongoose')
let Level1 = require('../models/level1')
let Level2 = require('../models/level2')
module.exports = {
    connect:(err)=>{
        if(!err)
        {
            console.log('Mongodb connect success')
        }else
        {
            console.log('Mongodb connect fail')
        }
    },
    level1:(req,res)=>{
        var level1 = new Level1({
            name:req.params.name
        })
        level1.save((err)=>{
            if(err)
            {
                res.json("errMgs: "+err)
            }else
            {
                res.json('success')
            }
        })    
    },
    level2:(req,res)=>{
        var level2 = new Level2({
            name:req.params.name
        })
        level2.save((err)=>{
            if(!err)
            {
                Level1.findOneAndUpdate({_id:req.params.id},{$push:{kids:level2._id}},(err)=>{
                    if(err){
                        res.json('errMgs: '+err)
                    }
                    else{
                        res.json('success')
                    }
                })
            }else
            {
                res.json('errMgs: '+err)
            }
        })
    }
}