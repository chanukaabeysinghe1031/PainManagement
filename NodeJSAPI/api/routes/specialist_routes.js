const router = require('express').Router()
const {login, getPatients, addRecord, addPrescription}  = require('../controllers/specialist_controller')
router.post('/login',login)
router.post('/addRecord',addRecord)
router.post('/addPrescription',addPrescription)
router.post('/getPatients',getPatients)

module.exports =  router