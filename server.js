if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}


const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose")
const methodOverride = require("method-override")


let app = express()
const db = process.env.DATABASE_URL
// This configuration is better
 

//"mongodb://localhost:27017/nodelist"
mongoose.connect(db, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: true,
  useCreateIndex: true
})
.then((result)=>{
  console.log("DB Connected")
})
.catch((error)=> console.log(`DB Error: ${error}`))




app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.use(morgan("tiny"))

const indexRouter = require('./routes/index')
app.use('', indexRouter)

const taskRouter = require('./routes/task')
app.use("/tasks", taskRouter)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Running On Port: "+port);
});