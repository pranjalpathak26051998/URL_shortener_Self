const app = require('./utils/app')
const mongoose = require('mongoose')

require('dotenv').config();
// require("./.env").config();

const { PORT, MONGODB_URL } = process.env


const startServer = async()=>{
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(MONGODB_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log("Database Connected")
        app.listen(PORT,()=>{
            console.log(`Server Started At Port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()