const Url = require('../models/UrlModel')
const UrlGenerator = require('../models/UrlGenerator')

const home = (req, res)=>{
    res.render('pages/Home')
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

            let shortnerUrl = process.env.URL + newUlr.code;
            res.render('pages/Result',{shortnerUrl, url, click, code})

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
            res.render('pages/404')
            console.log(error.message)
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
                res.render('pages/Stats', {click: doc.click})
            }
            else{
                res.status(404).render('pages/404')
            }
            
        } catch (error) {
            res.status(404).render('pages/404', {error})
            console.log(error.message)   
        }
    }else{
       
    }
}

async function getClicks(req, res){
    let code = req.body.shortnerUrl.slice(process.env.URL.length);

    if(code){
        try {
            let doc = await Url.findOne({code})

            if(doc){
                res.redirect(`/${code}/Stats`)
                            
            }else{
                res.status(404).render('pages/404')
            }
        } catch (error) {
            res.status(404).render('pages/404', {error, body:req.body})
            console.log(error.message)
        }
    }else{
        res.status(404).render('pages/404')
    }
    

    
}

const Clicks = (req, res)=>{
    res.render('pages/Clicks')
}
module.exports = {home, newUrl, shortnerUrl, getStats, getClicks, Clicks    }
