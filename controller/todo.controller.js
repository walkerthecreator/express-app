const Todo = require("../model/todo.model");

async function getTodos(req , res){
    const todo = await Todo.find({ user : req.user._id});   
    res.render("todo.ejs" , { todos : todo , username : req.user.username  })
}

async function getSingleTodo(req , res){
    const {id} = req.params
    const todo = await Todo.findOne({ _id : id })
    res.render("singleTodo.ejs" , { todo : todo.todo ,
        status : todo.status ,
        id : todo._id ,
        username : req.user.username ,
        createdAt : todo.createdAt ,
        updatedAt : todo.updatedAt
         } )
}


// @method PUT
// @route /todo/update/:id
async function updateTodo(req , res){
    const { id } = req.params
    const { task , status } = req.body 
    
    let statusValue = status == 'on' ? true : false ;

    let item = await Todo.updateOne({ _id : id  } , { todo : task , status : statusValue })
    res.redirect('/todo')
}

async function addTodo(req , res){
    const { task , setPublic } = req.body
    let isPublic = setPublic == "on" ? true  : false 
    await Todo.create({ todo : task , user : req.user._id , isPublic : isPublic  })
    res.redirect('/todo')
}

async function getPublicTodos(req ,res){
    const todos = await Todo.find({ isPublic : true }).populate("user")
    console.log(todos)
    res.render('publicTodos' , { todos : todos , username : req.user.username })
}

async function deleteTodo(req ,res){
    const {id} = req.params
    const todo = await Todo.deleteOne({ _id : id })
    res.redirect('/todo')
}

module.exports = {
    getSingleTodo , updateTodo , getTodos , addTodo , deleteTodo  , getSingleTodo , 
    getPublicTodos
}