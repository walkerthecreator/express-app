const mongoose = require('mongoose')

// new mongoose.schema(schema design , { timestamps : true / false  })
const todoSchema = new mongoose.Schema({
    todo : {
        type : String ,
        required : true ,
    } ,
    status : {
        type : Boolean ,
        default  : false 
    } ,
} , {
    timestamps : true 
})

let Todo = mongoose.model('todos' , todoSchema )

module.exports = Todo 