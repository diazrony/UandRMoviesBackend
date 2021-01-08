const mongoose = require('mongoose');
const Qualification = require('./Qualification');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    name: {
        type: String,
        require: [true, 'The name is necesary']
    },
    description: {
        type: String,
        require: [true, 'The description is necesary']
    },
    categorie: {
        type: String,
        require: [true, 'The categorie is necesary']
    },
    urlMovie: {
        type: String,
        require: [true, 'The categorie is necesary']
    },
    qualifications: [
        { type: Schema.Types.ObjectId, ref: 'Qualification',required: false }
    ]
})

module.exports = mongoose.model('Movie', movieSchema);