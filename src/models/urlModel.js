const {mongoose} =require('mongoose')
const {validator}=require('validator')
const urlSchema = new mongoose.Schema({
    urlCode:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    longUrl:{
        type:String,
        required:true,
        // validate:{
        //     validator:function(value){
        //         if(validator.isURL(value)){
        //             console.log(value)
        //         }else{
        //             console.log("invalid value")
        //         }
                
        //     },
        //     //why to use this
        //     message:"invalid url"  //is it compulsory
        // }
    },
    shortUrl:{
        type:String,
        unique:true,
        required:true

    }
},{timestamps:true})
const urlModel=mongoose.model('URL',urlSchema)
module.exports=urlModel   
// -----------------
// // { urlCode: { mandatory, unique, lowercase, trim },
//  longUrl: {mandatory, valid url}, 
//  shortUrl: {mandatory, unique} }