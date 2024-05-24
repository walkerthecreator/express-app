const express = require('express')
const { login, signup , getLogin , getSignup } = require('../controller/user.controller')

const router = express.Router()


router.get('/login' , getLogin)
router.get('/signup' , getSignup)

router.post('/login' , login)
router.post('/signup' , signup )



module.exports = router