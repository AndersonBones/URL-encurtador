const express = require('express')
const Controllers = require('../controllers/controllers')
const router = express.Router();


router.get('/', Controllers.home)
router.get('/clicks', Controllers.Clicks)
router.get('/:code',Controllers.shortnerUrl)
router.get('/:code/stats', Controllers.getStats)

router.post('/new',express.urlencoded({extended:true}),  Controllers.newUrl)
router.post('/clicks', express.urlencoded({extended:true}), Controllers.getClicks);

module.exports = router;