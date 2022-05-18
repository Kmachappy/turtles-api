require("dotenv").config()

// dependencies
const express = require('express')
const app = express()
const DATABASE_URL = process.env.DATABASE_URL
const Turtle = require("./models/turtle")

const turtlesSeed = [
    { name: "Leonardo", role: "ninja" },
    { name: "Michaelangelo", role: "ninja" },
    { name: "Donatello", role: "ninja" },
    { name: "Raphael", role: "ninja" },
    { name: "Master Oogway", role: "Sensei" },
    { name: "Franklin", role: "Strudent" },    
    { name: "crush", role: "nemo's ride" },
    { name: "Koopa Troope", role: "Mario's Foe" },
    { name: "Bowser", role: "King of evil turtles" },
    { name: "squirtle", role: "og starter pokemon" },
]

app.use(express.json())

const mongoose = require("mongoose")
mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{});

// database event listeners
const db = mongoose.connection;
db.on("error", err => console.log(`error\n${err.message}`));
db.on("connected", ()=> console.log("Mongo DB Connected"));
db.on("disconnected", ()=> console.log("Mongo DB Disconnected"));


// routes
app.get("/",(req,res)=> {
    Turtle.find({},(err,turtles)=>{
        res.json(turtles)
    })
})
// induces
//index
app.get("/turtles", (req,res)=> res.json(turtles))

//delete
app.delete("/turtles/:id", (req,res)=>{
    turtles.splice(req.params.index,1)
    res.json(turtles)
})
// update
app.put("/turtles/:id", (req,res)=>{
    turtles[req.params.id] = req.body
    res.json(turtles)
})
// create
app.post("/turtles", (req,res)=> {
    turtles.push(req.body)
    res.json(turtles)
})
//show
app.get("/turtles/:id", (req,res)=> res.json(turtles[req.params.id]))
//seed
app.get("/seed", (req,res)=>{
    Turtle.deleteMany({},(err,turtles)=>{
        Turtle.create(turtlesSeed, (err,data)=>
            res.redirect("/")
        )
    })
})


// listen 
app.listen(1337, ()=> console.log("running express server"))