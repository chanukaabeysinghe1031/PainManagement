const router = require('express').Router()
const {login, getPatients, addRecord, addPrescription,getSpecialists}  = require('../controllers/specialist_controller')
router.post('/login',login)
router.post('/addRecord',addRecord)
router.post('/addPrescription',addPrescription)
router.post('/getPatients',getPatients)
router.post('/getSpecialists',getSpecialists)

module.exports =  router