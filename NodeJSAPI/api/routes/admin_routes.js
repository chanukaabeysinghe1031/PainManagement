const router = require('express').Router()
const {addSpecialist,addNurse,addAestheticDoctor,login,addAdmin, getPersons, deleteDoctor, deleteSpecialist,
    deleteNurse
}  = require('../controllers/admin_controller')
router.post('/addAdmin',addAdmin)
router.post('/addNurse',addNurse)
router.post('/addAestheticDoctor',addAestheticDoctor)
router.post('/addSpecialist',addSpecialist)
router.post('/deleteDoctor',deleteDoctor)
router.post('/deleteSpecialist',deleteSpecialist)
router.post('/deleteNurse',deleteNurse)
router.get('/getPersons',getPersons)
router.post('/login',login)
module.exports =  router