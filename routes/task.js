const {Router} = require("express")
const Task = require("../models/task")
const router = Router()


router.get("/edit/:id", (req, res)=>{
    const id = req.params.id
    Task.findById(id)
    .then((result) => {
        res.render("edit", {tasks: result, task: result})
    })
    .catch((err) => {
        console.log("Code error: "+err)
        res.render("404")
    })
});

router.post("/", async (req, res)=>{
    const tasks = new Task({
        task: req.body.task
    })

    try{
        await tasks.save()
        res.redirect("/")
    }catch(e){
        console.log(`Code error: ${e}`)
        res.render("404")
    }
});

router.put("/:id", (req, res)=>{
    const task = Task.findByIdAndUpdate(req.params.id, req.body)
    .then((result)=>{
        res.redirect("/")
    })
    .catch((err)=>{
        console.log("Edit Error: "+ err)
        res.render("404")
    })
});

router.delete('/:id', (req, res)=>{
    Task.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.json({result: result})
    })
    .catch((err)=>{
        console.log(`Delete Error: ${err}`)
    })
})

router.use((req, res)=>{
    res.status(404).render("404")
});


module.exports = router