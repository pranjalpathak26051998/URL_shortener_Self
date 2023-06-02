const urlModel = require('../models/urlModel')
const validURl = require('valid-url');
const shortId = require('shortid');
const {SET_ASYNC,GET_ASYNC}=require('../redis/redis')

// const redis = require('redis')
// const { promisify } = require("util")
// const redisClient = redis.createClient(
//     18352,
//     "redis-18352.c212.ap-south-1-1.ec2.cloud.redislabs.com",
//     { no_ready_check: true }

// );
// redisClient.auth("kNjuUtWBjtyCMSPKnwNNMFHoAJAGT3yb", (err) => {
//     if (err) {
//         return res.send({ status: false, message: err.message })
//     }
// })
//            redisClient.on("connect", async () => { console.log("Redis connection is successful.@post...") });

//            const SET_ASYNC = promisify(redisClient.SET).bind(redisClient)
//            const GET_ASYNC = promisify(redisClient.GET).bind(redisClient)

// -----------------------------------------------------------------

const urlControl = async (req, res) => {
    try {
        const { longUrl } = req.body
        if (!longUrl) return res.status(400).send({ status: false, message: "Url not found or URL not provided" })
        ///  if(typeof longUrl !== String) return res.status(400).send({status:false,message:"Url not in a String"})

        if (!validURl.isWebUri(longUrl)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        //check if the url exists in cache ,yes =return the shortUrl else No= save the url in the cache
        //using the get function of redis

        let cacheUrl = await GET_ASYNC(longUrl);
        if (cacheUrl) {
            //const { shortUrl } = JSON.parse(cacheUrl)
            //console.log(shortUrl)
            return res.status(200).send({ status: true, data: JSON.parse(cacheUrl)})
        } else {
            //check if the url already exists in DB
            let checkUrl = await urlModel.findOne({ longUrl: longUrl })
            // console.log(checkUrl)
            if (checkUrl)
            { 
                //if present in the DB but cache expired reSet....
                await SET_ASYNC(longUrl,JSON.stringify({
                    longUrl:checkUrl.longUrl,
                    shortUrl:checkUrl.shortUrl,
                    urlCode:checkUrl.urlCode}))                      
              
             return res.status(200).send({status: true, data: `URL Already exist therefore in Db  but not in cache
                hence sharing the already generated shortUrl ${checkUrl.shortUrl}`})  
            }     
                    // reconfirm status code
        }

        const baseUrl = "http://localhost:3000/"
        if (!baseUrl) return res.status(400).send({ status: false, message: "Invalid request, please provide baseUrl" })
        //shortURl=baseUrl+urlCode concatenate
        //generate urlCode
        const urlCode = shortId.generate(longUrl);
        const shortUrl = `${baseUrl}${urlCode}`;
          

        await SET_ASYNC(longUrl, JSON.stringify({shortUrl:shortUrl,urlCode:urlCode,longUrl:longUrl})) 
        //setting into the cache after creating 


        console.log(urlCode); // Output: Something like "r4rGze22"
        //"http://localhost:3000/ghfgfg",
        
        //const response={longUrl:longUrl,shortUrl:shortUrl,urlCode:urlCode}
        savedResponse = await urlModel.create({
            longUrl,
            shortUrl,
            urlCode,
        })
        return res.status(201).send({ status: true, data: savedResponse })
       
    } catch (error) {
        res.status(500).send({ status: false, message: `Error detected : ${error.message}` })
    }
}
module.exports.urlControl = urlControl


