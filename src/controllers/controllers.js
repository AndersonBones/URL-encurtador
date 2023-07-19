const Url = require('../models/linkzinModel')
const UrlGenerator = require('../service/generateCode')

const home = (req, res)=>{
    res.render('pages/home')
}

async function newUrl(req, res){ // cria um novo link encurtado 
    let code = UrlGenerator.GenerateCode(); // gera um código aleatório 
    let click = 0; // contador de cliques

    let data = await new Url({ // objeto URL
        code, // código
        url:req.body.url, // 
        click // quantidade de cliques
    })

    try {
        let url = new URL(req.body.url)
        let shortnerUrl = `${process.env.APP_URL}/${code}`; // cria a url encurtada
        let newUlr = data.save(); // salva os dados no banco

        res.render('pages/result',{shortnerUrl, url, click, code})
        
      } catch(err) {
        res.status(400).redirect('/invalid-url')
      }
}


async function shortnerUrl(req, res, next){
    let code = req.params.code;

    try {
        let doc = await Url.findOneAndUpdate({code}, {$inc:{click:1}}) // incrimenta em 1 a contagem dos cliques 

        if(doc){ // redireciona o usuário para o link encurtado
            res.redirect(doc.url);
        }
        else{ 
            res.status(404).render('pages/404') // redireciona para a página de erro caso nâo encontre o codigo no banco de dados
        }
        
    } catch (error) {
        res.status(404).render('pages/404')
    }
}

async function getStats(req, res){
    let code = req.params.code;

    try {
        let doc = await Url.findOne({code})

        if(doc){
            res.render('pages/stats', {click: doc.click})
        }
        else{
            res.status(404).render('pages/404')
        }
        
    } catch (error) {
        res.status(404).render('pages/404', {error}) 
    }
}

async function getClicks(req, res){
    let code = req.body.shortnerUrl.slice(process.env.DOMAIN.length);
    console.log(code);

    try {
        let doc = await Url.findOne({code})

        if(doc){
            res.redirect(`/${code}/stats`)
                        
        }else{
            res.status(404).render('pages/404')
        }
    } catch (error) {
        res.status(404).render('pages/404', {error, body:req.body})
    }

}

const Clicks = (req, res)=>{
    res.render('pages/clicks')
}


const invalidUrl = (req, res) =>{
    res.render('pages/invalidUrl')
}
module.exports = {
    home, 
    newUrl, 
    shortnerUrl, 
    getStats, 
    getClicks, 
    Clicks, 
    invalidUrl
}
