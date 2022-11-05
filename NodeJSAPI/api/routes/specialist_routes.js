const router = require('express').Router()
const {login, getPatients}  = require('../controllers/specialist_controller')
router.post('/login',login)
router.get('/getPatients',getPatients)

module.exports =  router