const router = require('express').Router()
const {login, addPainRecord, getPatients}  = require('../controllers/nurse_contoller')

router.post('/login',login)
router.post('/addPainRecord',addPainRecord)
router.get('/getPatients',getPatients)

module.exports =  router