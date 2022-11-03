const router = require('express').Router()
const {login}  = require('../controllers/specialist_controller')
router.post('/login',login)
module.exports =  router