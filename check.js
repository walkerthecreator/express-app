const express = require("express")
const app = express()
app.use(express.json())
const joi = require('joi')

const db = []

const userJoiSchema = joi.object({
    username : joi.string().alphanum().min(3).max(12).required() ,
    email : joi.string().email().required() ,
    password : joi.string().min(5).max(18).required()
})

const data = {
    username : "nitin123" ,
    email : "nitin@gmail.com" ,
    password : "12345"
}

const ans = userJoiSchema.validate(data)
console.log(ans)