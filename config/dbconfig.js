const mongoose = require("mongoose")

const uri = process.env.MONGO_URI
mongoose.connect(uri)

const db = mongoose.connection

db.on('open' , function(){
    console.log('connected with MongoDB')
})

db.on("error" , function (err){
    console.log('error connecting with database ! ' , err )
})