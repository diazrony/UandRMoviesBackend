//============================
// Port
//============================
process.env.PORT = process.env.PORT || 3001
//============================
// Enviroment
//============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
//============================
// Expiration token
//============================
process.env.EXPIRATION_TOKEN = '48h'
//============================
// Seed autentication
//============================
process.env.SEED = process.env.SEED || 'this-is-secret-dev'
//============================
// DataBase
//============================
let urlDataBase;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDataBase = 'mongodb://localhost:27017/uandrmovies'
}else{
    urlDataBase = process.env.MONGO_URI
}

process.env.URLDB = urlDataBase