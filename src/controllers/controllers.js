const Url = require('../models/UrlModel')
const UrlGenerator = require('../models/UrlGenerator')

const home = (req, res)=>{
    res.render('pages/home')
}

async function newUrl(req, res){
    let url = req.body.url;
    let code = UrlGenerator.GenerateCode();
    let click = 0;

    if(url){
        
        try {
    
            let newUlr = await new Url({
                code,
                url,
                click
            }).save();

            let shortnerUrl = process.env.APP_URL + newUlr.code;
            res.render('pages/result',{shortnerUrl, url, click, code})

        } catch (error) {
            console.log(error.message)
        }

    }

}


async function shortnerUrl(req, res, next){
    let code = req.params.code;

    if(code){
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
    }else{
        
    }
}

async function getStats(req, res){
    let code = req.params.code;

    if(code){
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
    }else{
       
    }
}

async function getClicks(req, res){
    let code = req.body.shortnerUrl.slice(process.env.APP_URL.length);

    if(code){
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
    }else{
        res.status(404).render('pages/404')
    }

}

const Clicks = (req, res)=>{
    res.render('pages/clicks')
}
module.exports = {home, newUrl, shortnerUrl, getStats, getClicks, Clicks}
