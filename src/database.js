const mongoose = require("mongoose");


//const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;
const MONGODB_URI = 'mongodb+srv://BrayanBertel:brayandb2003@brayan.ju1jkh4.mongodb.net/DB_brayanb?retryWrites=true&w=majority';
//esto lo toman de la pagina de mongodb

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));