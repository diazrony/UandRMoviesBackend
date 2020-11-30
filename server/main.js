require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
//Use controller index
app.use( require('./controller/routes') )
//==================
//DataBase
//==================
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URLDB, (err, res) => {
    if(err) throw err;
    console.log('Data Base Online')
})
//====================
//Server
//====================
app.listen(process.env.PORT , () => {
    console.log(` listen in port ${process.env.PORT}`)
});