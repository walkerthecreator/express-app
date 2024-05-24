const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/todos')

const db = mongoose.connection

db.on('open' , function(){
    console.log('connected with MongoDB')
})

db.on("error" , function (err){
    console.log('error connecting with database ! ' , err )
})