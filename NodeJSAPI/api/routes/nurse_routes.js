const router = require('express').Router()
const {login}  = require('../controllers/nurse_contoller')
router.post('/login',login)
module.exports =  router