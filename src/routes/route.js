const express = require('express')
const router = express.Router()
const URLcontroller=require('../controllers/urlController')



router.get('test-api',(req,res)=>{
    res.status(200).send("everything is working fine")
})
router.post('/createURLShortener',URLcontroller.urlControl)
module.exports = router