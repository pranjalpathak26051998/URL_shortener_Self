const express = require('express')
const router = express.Router()
const URLcontroller=require('../controllers/urlController')
const getUrlController=require('../controllers/getUrlController')



router.get('test-api',(req,res)=>{
    res.status(200).send("everything is working fine")
})
router.post('/url/shorten',URLcontroller.urlControl)
router.get('/:urlCode',getUrlController.getUrl)
module.exports = router

