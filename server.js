if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}


const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose")
const taskRouter = require('./routes/task')
const Task = require("././models/task")
const methodOverride = require("method-override")


let app = express()
const db = process.env.DATABASE_URL
try {
  // This configuration is better
  mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }, err => {
    if (err) throw err;

    console.log("connected to MongoDB");
  });
} catch (error) {
  console.log(error);
}
/* mongoose.connect(
  db,
  { useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true },
  function (err, res) {
      try {
          console.log('Connected to Database');
      } catch (err) {
          throw err;
      }
}); */


//"mongodb://localhost:27017/nodelist"
/* mongoose.connect(db, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true
})
const dbs = mongoose.connection
dbs.on('error', error=> console.error(error))
dbs.once('open', ()=> console.log("DB Connected :)")) */



app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.use(morgan("tiny"))
app.get("/", (req, res)=>{
  
  Task.find({}).sort({createdAt: "desc"})
  .then((result)=>{
    res.render("index", {tasks: result})
  })
  .catch((err)=> console.log(`Code error: ${err}`))
})

app.use("/tasks", taskRouter)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Running On Port: "+port);
});