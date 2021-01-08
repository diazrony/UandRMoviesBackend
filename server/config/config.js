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
process.env.CLIENT_ID = '486105028590-uudenu4qbnencsiec6tb67fpmov3r0jj.apps.googleusercontent.com'
//============================
// DataBase
//============================
let urlDataBase= 'mongodb+srv://diazricardo:diazricardo@cluster0.pppul.mongodb.net/test?authSource=admin&replicaSet=atlas-6bwpx4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

process.env.URLDB = urlDataBase