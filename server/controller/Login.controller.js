const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const User = require('../models/User');
const client = new OAuth2Client(process.env.CLIENT_ID);
//============================
// Config Google
//============================
async function verify( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
        name: payload.name,
        username: payload.email,
        imagen: payload.picture,
        google: true
    }
} 
//POST
app.post('/google', async ( req , res ) => {
    let token = req.body.idtoken;
    let userGoogle = await verify(token).catch(e => {
        return res.status(403).json({ok:false,err:e})
    })
    try {
        let userDB = await User.findOne({username: userGoogle.username}).exec();
        if (userDB) {
            let token = jwt.sign({user: userDB}, process.env.SEED, {expiresIn: process.env.EXPIRATION_TOKEN})
            return res.json({
                ok:true,
                user: userDB,
                token
            })
        }else {
            //if the user doesn´t exist in DataBase is the new user
            let user = new User();
            user.name = userGoogle.name
            user.username = userGoogle.username
            user.imagen = userGoogle.imagen
            user.google = true
            user.password = ':)'
            user.save((err , userDb) => {
                if (err) {
                    return res.status(500).json({
                        ok:false,
                        err
                    })
                }
                let token = jwt.sign({user: userDb}, process.env.SEED, {expiresIn: process.env.EXPIRATION_TOKEN})
                return res.json({
                    ok:true,
                    user: userDb,
                    token
                })
            })
        }
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        })
    }

})
module.exports = app;