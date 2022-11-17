const router = require('express').Router()
const {addPatient, login, getPatients, deletePatient, getDoctorsAndSpecialist, getSpecialists}  = require('../controllers/aestheticDoctor_controller')
router.post('/addPatient',addPatient)
router.post('/getPatients',getPatients)
router.post('/deletePatient',deletePatient)
router.post('/login',login)
module.exports =  router