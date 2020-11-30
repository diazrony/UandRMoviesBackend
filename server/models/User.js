const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let rolesValid = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE}, no is role valid'
}
const userShema = new Schema({
    username: {
        type: String,
        require: [true, 'The username is necesary']
    },
    password: {
        type: String,
        required: [true, 'Password is necesary']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValid
    },
    google: {
        type: Boolean,
        default:false
    }
},{timestamps: true});

userShema.methods.toJSON = function () {
    let usuario = this;
    let usuarioObject = usuario.toObject();
    delete usuarioObject.password;
    return usuarioObject;
}
userShema.plugin( uniqueValidator, {message: '{PATH}  It must be unique'} );
module.exports = mongoose.model('user', userShema);