const jwt = require('jsonwebtoken');
//============================
// Check Token
//============================
let checkToken =  ( req, res, next ) => {
    let token = req.get('Authorization')
    jwt.verify(token,process.env.SEED, ( err , payload ) => {
        if ( err ) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = payload.user
        next()
    })
}

module.exports = {
    checkToken
}