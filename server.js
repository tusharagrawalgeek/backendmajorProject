const express=require("express");
const fs=require('fs')
const fsPromise=require('fs').promises;
const mongoose = require("mongoose");
const app=express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
const db="mongodb+srv://tushar9:Tushar123@cluster0.tggkt2q.mongodb.net/";
mongoose
  .connect(db, {
    // useNewUrlParser:true,
    // useCreateIndex: true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
  })
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log(err);
    console.log("Couldn't connect to database");
  });


var cors = require('cors')
app.use(cors())
const bp=require('body-parser');
const { log } = require("console");
const Students = require("./Models/Students/students");
const Teachers=require("./Models/Teachers/teachers");
const Admin=require("./Models/Admin/admin")
app.use(bp.json());
app.use(bp.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    fs.readFile('data.json',"utf-8",(err,data)=>{
        
        res.send(data);
    })
}) 
app.get("/user",(req,res)=>{
    fs.readFile('currentUser.json',"utf-8",(err,data)=>{
        console.log(data); 
        res.send(data);
    })
})

app.post("/setstudent",(req,res)=>{
    const student=new Students(req.body);
    student.save()
    .then(() => {
        res.status(200).json({ message:"Student added successfully" });
      })
      .catch((err) => {
        console.log("Could not add");
        res.status(500).json({ message: "server error" });
      });
    console.log(req.body);

})
app.post("/postimg",(req,res)=>{
    console.log(res.body);
    fs.writeFile('userImages.json',JSON.stringify(req.body), (err) => {
                if (err) throw err;
            })
    res.send("OK");
})
app.post("/user",(req,res)=>{
    console.log(JSON.stringify(req.body));
            fs.writeFile('currentUser.json',JSON.stringify(req.body), (err) => {
                if (err) throw err;
            })
    res.send("OK");
    
})


app.post("/finduser",async (req,res)=>{
    var user={};
    const id=req.body.id, pswd=req.body.pswd;
    const student=await Students.find({"username": id, "password": pswd});
    console.log(student);
    if(student.length!==0){
        user=student[0];
    }else{
        const teacher=await Teachers.find({"username": id, "password": pswd});
        if(teacher.length!==0){
            user=teacher[0];
        }else{
            const admin=await Admin.find({"username": id, "password": pswd});
            if(admin.length!==0){
                user=admin[0];
            }else
            res.status(500).send({user:user,message:"No user found"});
        }
    }
    console.log(user);
    res.status(200).send({user:user,message:"User found"});
})
app.get("/getTeachers",async (req,res)=>{
    console.log("here");
    const teachers=await Teachers.find();
    console.log(teachers);
    if(teachers.length!==0){
        res.status(200).send({teachers:teachers,message:"Found"});
    }else
    res.status(200).send({teachers:[],message:"No teachers"});
})
app.post("/uploadTeacher",async(req,res)=>{
    console.log(req.body);
    const resp=await Teachers.insertMany(req.body);
    console.log(resp);
    res.status(200).send({message:"Added successfully"});
})
app.post("/uploadStudent",async(req,res)=>{
    console.log(req.body);
    const resp=await Students.insertMany(req.body);
    console.log(resp);
    res.status(200).send({message:"Added successfully"});
})
app.get("/getStudents",async (req,res)=>{
    console.log("here");
    const students=await Students.find();
    console.log(students);
    if(students.length!==0){
        res.status(200).send({students:students,message:"Found"});
    }else
    res.status(200).send({students:[],message:"No teachers"});
})
app.post("/fetchStudents",async (req,res)=>{
    console.log("heressss");
    const students=await Students.find();
    console.log(req.body);
    
    var data=[];
    students.map(i=>{
        if(i.subjects.includes(req.body.subject)&&(i.year+i.section).toString().toUpperCase()===req.body.class){
            // console.log(i);
            data.push(i);
        }
    })
    console.log(data.length);
    if(data.length!==0){
        res.status(200).send({students:data,message:"Found"});
    }else
    res.status(200).send({students:[],message:"No students"});
})
app.put("/updateMarks/:id", async (req, res) => {
    console.log(req.params.id, req.body);
    const result = await Students.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated data" + result);
  });
app.listen(3001, ()=>{
    console.log("Server is running on port 3000");
})