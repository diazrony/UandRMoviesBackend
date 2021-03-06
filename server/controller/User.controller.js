const express = require('express');
const Movie = require('../models/Movie');
const User = require('../models/User');
const app = express();

app.get('/user', async (req,res) => {
    try {
        let users = await User.find().populate('movies').exec()
        res.json({ok: true, users})
    }catch (e){
        console.error(`Error in DB`)
        res.json({err:e,message:'Data Base Down'})
    }
})
app.get('/user/:id', async (req,res) => {
    let id = req.params.id
    try {
        let user = await User.findById(id).populate('movies').exec()
        res.json({ok: true, user})
    }catch (e){
        console.error(`Error in DB`)
        res.json({err:e,message:'Data Base Down'})
    }
})
app.post('/user', async ( req , res ) => {
    let body = req.body
    let user = new User({
        name: body.name,
        username: body.username,
        password: body.password,
    })
    try {
        let userDB = await user.save();
        res.json({ok:true,user: userDB})
    }catch (e){
        console.error(`Error in DB`)
        res.json({ok:false,message: 'Error in DB'})
    }
})
app.put('/user/:id', async ( req , res ) => {
    let id = req.params.id
    let idMovie = req.body.idMovie
    try {
        let userDB = await User.findById(id).exec();
        let MovieDB = await Movie.findById(idMovie).exec()
        userDB.movies.push(MovieDB)
        let userNew = await userDB.save()
        res.json({ok:true, user:userNew})
    }catch (e){
        console.error(`Error in DB`)
        res.json({ok:false,message: 'Error in DB'})
    }
})
module.exports = app;