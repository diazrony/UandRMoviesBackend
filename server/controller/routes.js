const express = require('express');
const app = express();
//==================
//Routes
//==================
app.use(require('./User.controller'))
app.use(require('./Login.controller'))
app.use(require('./Movie.controller'))
app.use(require('./Qualification.controller'))


module.exports = app;