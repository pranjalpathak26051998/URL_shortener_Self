// const {mongoose} =require('mongoose')
// const {validator}=require('validator')
// const urlSchema = new mongoose.Schema({
//     urlCode:{
//         type:String,
//         required:true,
//         lowercase:true,
//         trim:true
//     },
//     longUrl:{
//         required:true,
//         validator:{
//             validator:function(value){
//                 (validator.isURL(value))?value:"invalid URL";
//             }
//         }
//     },
//     shortURL:{

//     }

// })

// // -----------------
// // // { urlCode: { mandatory, unique, lowercase, trim },
// //  longUrl: {mandatory, valid url}, 
// //  shortUrl: {mandatory, unique} }