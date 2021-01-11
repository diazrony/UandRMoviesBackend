const express = require('express');
const Qualification = require('../models/Qualification');
const app = express();

app.get('/qualification', async (req,res) => {
    try {
        let qualification = await Qualification.find().populate('user').populate('movie').exec()
        res.json({ok: true, qualification})
    }catch (error){
        console.error(`Error in DB`)
        res.json({err:e,message:'Data Base Down',error})
    }
})
app.get('/qualification/:id', async (req,res) => {
    let id = req.params.id
    try {
        let qualification = await Qualification.findById(id).exec()
        res.json({ok: true, qualification})
    }catch (error){
        console.error(`Error in DB`)
        res.json({err:e,message:'Data Base Down',error})
    }
})
app.post('/qualification', async ( req , res ) => {
    let body = req.body
    let qualification = new Qualification({
        movie: body.movie,
        user: body.user,
        score: body.score,
    })
    try {
        let qualificationDB = await qualification.save();
        res.json({ok:true,qualification: qualificationDB})
    }catch (error){
        console.error(`Error in DB`)
        res.json({ok:false,message: 'Error in DB', error})
    }
})

app.put('/qualification/:id', async ( req, res ) => {
    let id = req.params.id
    let body = req.body
    try {
        let qualification = Qualification.findById(id).exec()
        movie = body.movie
        user = body.user
        score = body.score
        let qualificationDB = await qualification.save();
        res.json({ok:true,qualification: qualificationDB})
    } catch (error) {
        res.json({ ok:false , message: 'Error in DB', error })
    }
})

module.exports = app;