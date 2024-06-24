const express = require('express')
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const Myroutes = require('./routes/routes');
var cors = require('cors')


const app = express();
dotenv.config()

app.use(cors())

// set mongodb

mongo_url = "mongodb+srv://abones22:mydb24112001666@cluster0.amfoksf.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongo_url)

let db = mongoose.connection; // instancia de conexão do banco

db.on("error",()=>{
    console.log('Houve um erro')
})
db.once('open',()=>{
    console.log('Banco carregado')
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')))

app.use(Myroutes);

app.use((req, res)=>{
    res.render('pages/404')
});

app.listen(3333, function(){
    console.log('Server running...')
  });
