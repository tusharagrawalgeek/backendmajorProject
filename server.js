const express=require("express");
const fs=require('fs')

const app=express();
// const fs = require('fs')
// import fs from 'fs-react';
// const { json } = require('react-router-dom')
// const react=require('react');

var cors = require('cors')
app.use(cors())
const bp=require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    fs.readFile('data.json',"utf-8",(err,data)=>{
        // console.log(data);
        res.send(data);
    })
    // res.send("Hola Amigos, I got data from your ")
})
app.get("/user",(req,res)=>{
    fs.readFile('currentUser.json',"utf-8",(err,data)=>{
        console.log(data);  
        res.send(data);
    })
    // res.send("Hola Amigos, I got data from your ")
})

app.post("/",(req,res)=>{
    res.send("Here is the response");
    // function addStudent(student){
        fs.readFile('data.json','utf-8',function (err,data){
            students=JSON.parse(data);
            students.push(req.body);
            fs.writeFile('data.json',JSON.stringify(students), (err) => {
                if (err) throw err;
            })
        })
        
    // }

    console.log(req.body);

})
app.post("/user",(req,res)=>{
    console.log(JSON.stringify(req.body));
            fs.writeFile('currentUser.json',JSON.stringify(req.body), (err) => {
                if (err) throw err;
            })
    res.send("OK");
    // function addStudent(student){
        // console.log(req.body);
        // fs.readFile('currentUser.json','utf-8',function (err,data){
            // users=JSON.parse(data);
            // users.push(req.body);
            // console.log(users);
            
            // res.send("OK")
        // })
        
    // }

    // console.log(req.body);

})
// app.get("/",(req,res)=>{
//     res.send("Changed without restarting")
//     console.log("Getting request");
// })
app.listen(3001, ()=>{
    console.log("Server is running on port 3000");
})