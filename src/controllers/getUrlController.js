const urlModel=require('../models/urlModel')
const validURl=require('valid-url');
const shortId=require('shortid');


const getUrl=async (req,res)=>{
    try {
        let {urlCode}=  req.params
        if(!urlCode) return res.status(400).send({status:false,message:"please provide the urlCode"})
    let url = await urlModel.findOne({urlCode:urlCode})
    let resultant=url.longUrl
    return res.redirect(resultant)  
        
    } catch (error) {
        res.status(500).send({status:false,message:`error detected${error.message}`})
        
    }
    
}
module.exports.getUrl=getUrl