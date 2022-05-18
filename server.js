require("dotenv").config()

// dependencies
const express = require('express')
const app = express()
const DATABASE_URL = process.env.DATABASE_URL
const Turtle = require("./models/turtle")
const PORT = process.env.PORT

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
app.get("/turtles",(req,res)=> {
    Turtle.find({},(err,turtles)=>{
        res.json(turtles)
    })
})

//seed
app.get("/seed", (req,res)=>{
    Turtle.deleteMany({},(err,turtles)=>{
        Turtle.create(turtlesSeed, (err,data)=>
            res.redirect("/turtles")
        )
    })
})


//delete
app.delete("/turtles/:id", (req,res)=>{
    Turtle.findByIdAndDelete(req.params.id, (err,deletedTurtle)=>{
        res.json(deletedTurtle)
    })
})

// update
app.put("/turtles/:id", (req,res)=>{
    Turtle.findByIdAndUpdate(req.params.id,req.body,(err,updatedTurtle)=>{
        if(err) console.log(err)
        res.json(updatedTurtle)
    })
})

// create
app.post("/turtles", (req,res)=> {
    Turtle.create(req.body, (err,createdTurtle)=>{
        res.json(createdTurtle)
    })
})


//show
app.get("/turtles/:id", (req,res)=> {
    Turtle.findById(req.params.id,(err,turtleFound)=>{
        res.json(turtleFound)
    })
})


// listen 
app.listen(PORT, ()=> console.log("running express server"))