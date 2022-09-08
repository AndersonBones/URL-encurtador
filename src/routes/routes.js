const express = require('express')
const Controllers = require('../controllers/controllers')
const router = express.Router();


router.get('/', Controllers.home)
router.get('/Clicks', Controllers.Clicks)
router.get('/:code',Controllers.shortnerUrl)
router.get('/:code/Stats', Controllers.getStats)

router.post('/New',express.urlencoded({extended:true}),  Controllers.newUrl)
router.post('/Clicks', express.urlencoded({extended:true}), Controllers.getClicks);

module.exports = router;