const urlModel=require('../models/urlModel')
const nodeCache=require('node-cache')

const cache=new nodeCache() // initializing a cache memory

const getUrl=async (req,res)=>{
    try {
        let {urlCode}=  req.params

        if(!urlCode) return res.status(400).send({status:false,message:"please provide the urlCode"})
    
//cache enters here
  //get the cache memory here and get the data into it
  const cachedUrl = cache.get(urlCode);
  if(cachedUrl){
    return res.status(200).redirect(cachedUrl)
  }

       let url = await urlModel.findOne({urlCode:urlCode})
     //add url not found validation
     if(!url){
        return res.status(404).send({status:false,message:`URL NOT FOUND`})
     }
     cache.set(urlCode,url.longUrl,60) //set the timer and response via cache
     
        let resultant=url.longUrl
    return res.status(200).redirect(resultant)  
        
    } catch (error) {
        res.status(500).send({status:false,message:`error detected${error.message}`})
        
    }
    
}
module.exports.getUrl=getUrl