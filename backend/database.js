const mongoose = require('mongoose');
// const connection = "mongodb+srv://nauda:chodejuggler@cluster0.fnwbd.mongodb.net/naudadb?retryWrites=true&w=majority";
const connection = process.env.REACT_APP_DATABASE_CONNECTION;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

