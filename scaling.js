const express = require('express')
const cors = require('cors')
const app = express()
const cpus = require('os').cpus().length
const cluster = require('cluster')


if(cluster.isMaster){
    console.log("Master length is running")
    cluster.fork()
}

app.use(cors())

const todos = ['eat fruits' , 'drink water' , 'run everyday' , 'exercise' ]
let requests = 0

app.get('/', async (req , res) => {
    // await new Promise((req , res)=>{ setTimeout(()=>{} ) }) 
    requests++
    res.json({ data :  todos})
})

app.get('/check' , (req , res) =>{
    return res.json({ total : requests })
})

app.listen(3500 , ()=>{
    console.log('server started on 3500 ')
})