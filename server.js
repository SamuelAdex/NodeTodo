const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose")
const taskRouter = require('./routes/task')
const Task = require("././models/task")
const methodOverride = require("method-override")


let app = express()

mongoose.connect("mongodb://localhost:27017/nodelist", {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true
})
.then((result)=> console.log("DB Connected"))
.catch((err)=> console.log("DB Error: "+err))


app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.use(morgan("tiny"))
app.get("/", (req, res)=>{
  
  Task.find().sort({createdAt: "desc"})
  .then((result)=>{
    res.render("index", {tasks: result})
  })
  .catch((err)=> console.log(`Code error: ${err}`))
})

app.use("/tasks", taskRouter)

app.listen(5000, ()=>{
    console.log("Running On Port: 5000");
});