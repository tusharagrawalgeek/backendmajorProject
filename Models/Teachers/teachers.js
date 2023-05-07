const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    name:String,
    // roll:Number,
    // department:String,
    // year:Number,
    // section:String,
    username:String,
    password:String,
    department:String,
    profile:String,
    dp:String,
    sections:Array
})
const Teachers=mongoose.model('TEACHERS',schema);
module.exports=Teachers;