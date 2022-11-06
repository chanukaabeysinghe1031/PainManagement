const router = require('express').Router()
const {login, addPainRecord}  = require('../controllers/nurse_contoller')

router.post('/login',login)
router.post('/addPainRecord',addPainRecord)

module.exports =  router