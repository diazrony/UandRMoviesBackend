const express = require('express');
const Movie = require('../models/Movie');
const app = express();

app.get('/movie', async (req,res) => {
    try {
        let movie = await Movie.find().populate('qualifications').populate('user').exec()
        res.json({ok: true, movie})
    }catch (e){
        console.error(`Error in DB`)
        res.json({err:e,message:'Data Base Down'})
    }
})
app.get('/movie/:id', async (req,res) => {
    let id = req.params.id
    try {
        let movie = await Movie.findById(id).exec()
        res.json({ok: true, movie})
    }catch (e){
        console.error(`Error in DB`)
        res.json({err:e,message:'Data Base Down'})
    }
})
app.post('/movie', async ( req , res ) => {
    let body = req.body
    let movie = new Movie({
        name: body.name,
        description: body.description,
        categorie: body.categorie,
        urlMovie: body.urlMovie,
        urlImage: body.urlImage
    })
    try {
        let movieDB = await movie.save();
        res.json({ok:true,movie: movieDB})
    }catch (e){
        console.error(`Error in DB`)
        res.json({ok:false,message: 'Error in DB'})
    }
})

app.put('/movie/:id', async ( req, res ) => {
    let id = req.params.id
    let body = req.body
    try {
        let movie = await Movie.findById(id).exec()
        movie.name = body.name
        movie.description = body.description
        movie.categorie = body.categorie
        movie.urlMovie = body.urlMovie
        movie.qualifications = body.qualifications
        movie.urlImage = body.urlImage
        let movieDB = await movie.save();
        res.json({ok:true,movie: movieDB})
    } catch (error) {
        res.json({ ok:false , message: 'Error in DB', error })
    }
})

app.delete('/movie/:id', async ( req, res ) => {
    let id = req.params.id
    // try {
    //     let movie = await Movie.findById(id).exec()
    //     movie.status = false 
    //     let movieDB = await movie.save();
    //     res.json({ok:true,movie: movieDB})
    // } catch (error) {
    //     res.json({ ok:false , message: 'Error in DB', error })
    // }
    try {
        let movie = await Movie.findById(id).exec()
        let movieDelete = await Movie.deleteOne(movie).exec()
        res.json({ok:true,movie: movieDelete})
    } catch (error) {
        res.json({ ok:false , message: 'Error in DB', error })
    }
})

module.exports = app;