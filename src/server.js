const express = require('express')
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const Myroutes = require('./routes/routes');
var cors = require('cors')

var corsOptions = {
    origin:process.env.URL ,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
dotenv.config()

app.use(cors(corsOptions))

// set mongodb
mongoose.connect(process.env.dbURL)

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

app.listen(process.env.PORT || 21059, function(){
    console.log('Server running...')
  });
