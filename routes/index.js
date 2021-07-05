const {Router} = require("express")
const Task = require("../models/task")
const router = Router()



router.get("/", (req, res)=>{  
    Task.find({}).sort({createdAt: "desc"})
    .then((result)=>{
      res.render("index", {tasks: result})
    })
    .catch((err)=> console.log(`Code error: ${err}`))

})


module.exports = router;