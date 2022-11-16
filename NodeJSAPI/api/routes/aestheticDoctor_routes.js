const router = require('express').Router()
const {addPatient, login, getPatients}  = require('../controllers/aestheticDoctor_controller')
router.post('/addPatient',addPatient)
router.post('/getPatients',getPatients)
router.post('/login',login)
module.exports =  router