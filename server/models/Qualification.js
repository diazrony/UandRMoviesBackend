const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let qualificationSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie',required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    score: {type: Number,  require: [true, 'The score is necesary']}
})

module.exports = mongoose.model('Qualification', qualificationSchema);