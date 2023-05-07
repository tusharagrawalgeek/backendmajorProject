const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    profile:String,
    dp:String
})
const Admin=mongoose.model('ADMIN',schema);
module.exports=Admin;