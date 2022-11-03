const router = require('express').Router()
const {addSpecialist,addNurse,addAestheticDoctor,login,addAdmin}  = require('../controllers/admin_controller')
router.post('/addAdmin',addAdmin)
router.post('/addNurse',addNurse)
router.post('/addAestheticDoctor',addAestheticDoctor)
router.post('/addSpecialist',addSpecialist)
router.post('/login',login)
module.exports =  router