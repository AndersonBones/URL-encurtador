const Url = require('../models/linkzinModel')
const UrlGenerator = require('../models/linkzin')

const home = (req, res)=>{
    res.render('pages/home')
}

async function newUrl(req, res){
    let code = UrlGenerator.GenerateCode();
    let click = 0;

    let data = await new Url({
        code,
        url:req.body.url,
        click
    })

    try {
        let url = new URL(req.body.url)
        let shortnerUrl = process.env.APP_URL + newUrl.code;
        let newUlr = data.save();

        res.render('pages/result',{shortnerUrl, url, click, code})
        
      } catch(err) {
        res.status(400).redirect('/invalid-url')
      }



}


async function shortnerUrl(req, res, next){
    let code = req.params.code;

    try {
        let doc = await Url.findOneAndUpdate({code}, {$inc:{click:1}})

        if(doc){
            res.redirect(doc.url);
        }
        else{
            res.status(404).render('pages/404')
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
    let code = req.body.shortnerUrl.slice(process.env.APP_URL.length);

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
module.exports = {home, newUrl, shortnerUrl, getStats, getClicks, Clicks}
