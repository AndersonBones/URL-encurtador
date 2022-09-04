const express = require('express')
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose')
const Myroutes = require('./routes/routes');
var cors = require('cors')

var corsOptions = {
    origin:process.env.URL ,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();

app.use(cors(corsOptions))

// set mongodb
mongoose.connect('mongodb://localhost:27017/URL')

let db = mongoose.connection;

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

app.listen(3000,()=>{
    console.log('Server running...')
})