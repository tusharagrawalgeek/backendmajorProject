const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    name:String,
    roll:Number,
    department:String,
    year:Number,
    section:String,
    username:String,
    password:String,
    profile:String,
    dp:String,
    subjects:Array,
    marks:Array
})
const Students=mongoose.model('STUDENTS',schema);
module.exports=Students;