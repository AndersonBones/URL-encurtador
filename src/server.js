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
mongoose.connect(process.env.MONGO_URL)

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
