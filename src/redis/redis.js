const redis=require('redis')
const { promisify } = require("util")
const redisClient = redis.createClient(
    18352,
    "redis-18352.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }

);
redisClient.auth("kNjuUtWBjtyCMSPKnwNNMFHoAJAGT3yb", (err) => {
    if (err) {
        return res.send({ status: false, message: err.message })
    }
})


redisClient.on("connect", async () => { console.log("Redis connection is successful....") });

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient)
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient)

module.exports={SET_ASYNC,GET_ASYNC}