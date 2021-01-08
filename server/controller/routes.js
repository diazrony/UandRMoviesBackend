const express = require('express');
const app = express();
//==================
//Routes
//==================
app.use(require('./User.controller'))
app.use(require('./Login.controller'))

module.exports = app;