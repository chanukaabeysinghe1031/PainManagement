const router = require('express').Router()
const {addPatient, login}  = require('../controllers/aestheticDoctor_controller')
router.post('/addPatient',addPatient)
router.post('/login',login)
module.exports =  router