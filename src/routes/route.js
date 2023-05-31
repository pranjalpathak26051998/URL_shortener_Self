const express = require('express')
const router = express.Router()



router.get('test-api',(req,res)=>{
    res.status(200).send("everything is working fine")
})




module.exports = router