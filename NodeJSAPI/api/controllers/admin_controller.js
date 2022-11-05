const AestheticDoctor  = require('../models/aestheticDoctor')
const Nurse =  require("../models/nurse")
const Admin =  require("../models/admin")
const Patient =  require("../models/patient")
const Specialist = require("../models/specialist")

const bcrypt = require("bcryptjs");
const {add} = require("nodemon/lib/rules");

// ************************* To register an admin  account **************************
exports.addAdmin =  async  (req,res) => {
    const {
        fullName,email,password
    } = req.body

    if(
        fullName===""||email===""||password===""
    ){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        console.log(email)

        Admin.find({email:email})
            .then(admin=>{
                if(admin.length>0){
                    res.json({
                        Status: "Unsuccessful",
                        Message: "There is a aesthetic doctor with this email address already."
                    })
                }else{
                    const newAdmin= new Admin({fullName,email,password})
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                            if (err) throw err;
                            newAdmin.password = hash;
                            newAdmin.save()
                                .then(responseSavingAdmin => {
                                    console.log(responseSavingAdmin)
                                    res.json({
                                        Status: "Successful",
                                        Message: 'Admin has been registered successfully.',
                                        User: responseSavingAdmin
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                    res.json({
                                        Status: "Unsuccessful",
                                        Message: "Happened saving the admin in " +
                                            "DB.",
                                        error: error.Message
                                    })
                                })
                        })
                    })
                }
            })
            .catch(error=>{
                console.log(error)
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened finding the aesthetic doctor in " +
                        "DB.",
                    error: error
                })
            })
    }
}

// ************************* To register a aesthetic  account **************************
exports.addAestheticDoctor =  async  (req,res) => {
    const {
       fullName,email,password
    } = req.body

    if(
        fullName===""||email===""||password===""
    ){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        console.log(email)

        AestheticDoctor.find({email:email})
            .then(aestheticDoctor=>{
                if(aestheticDoctor.length>0){
                    res.json({
                        Status: "Unsuccessful",
                        Message: "There is a aesthetic doctor with this email address already."
                    })
                }else{
                    const newAestheticDoctor= new AestheticDoctor({fullName,email,password})
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newAestheticDoctor.password, salt, (err, hash) => {
                            if (err) throw err;
                            newAestheticDoctor.password = hash;
                            newAestheticDoctor.save()
                                .then(responseSavingAestheticDoctor => {
                                    console.log(responseSavingAestheticDoctor)
                                    res.json({
                                        Status: "Successful",
                                        Message: 'Aesthetic Doctor has been registered successfully.',
                                        User: responseSavingAestheticDoctor
                                    })
                                })
                                .catch(error => {
                                    res.json({
                                        Status: "Unsuccessful",
                                        Message: "Happened saving the aesthetic doctor in " +
                                            "DB.",
                                        error: error.Message
                                    })
                                })
                        })
                    })
                }
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened finding the aesthetic doctor in " +
                        "DB.",
                    error: error
                })
            })
    }
}

// ************************* To register a specialist  account **************************
exports.addSpecialist =  async  (req,res) => {
    const {
        fullName,email,password
    } = req.body

    if(
        fullName===""||email===""||password===""
    ){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        console.log(email)

        Specialist.find({email:email})
            .then(specialist=>{
                if(specialist.length>0){
                    res.json({
                        Status: "Unsuccessful",
                        Message: "There is a specialist with this email address already."
                    })
                }else{
                    const newSpecialist = new Specialist({fullName,email,password})
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newSpecialist.password, salt, (err, hash) => {
                            if (err) throw err;
                            newSpecialist.password = hash;
                            newSpecialist.save()
                                .then(responseSpecialist => {
                                    console.log(responseSpecialist)
                                    res.json({
                                        Status: "Successful",
                                        Message: 'Specialist  Doctor has been registered successfully.',
                                        User: responseSpecialist
                                    })
                                })
                                .catch(error => {
                                    console.log(error)
                                    res.json({
                                        Status: "Unsuccessful",
                                        Message: "Happened saving the specialist in " +
                                            "DB.",
                                        error: error.Message
                                    })
                                })
                        })
                    })
                }
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened finding the aesthetic doctor in " +
                        "DB.",
                    error: error
                })
            })
    }
}

// ************************* To register a nurse account **************************
exports.addNurse =  async  (req,res) => {
    const {
        fullName,email,password
    } = req.body

    if(
        fullName===""||email===""||password===""
    ){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        console.log(email)

        Nurse.find({email:email})
            .then(nurse=>{
                if(nurse.length>0){
                    res.json({
                        Status: "Unsuccessful",
                        Message: "There is a nurse with this email address already."
                    })
                }else{
                    const newNurse = new Nurse({fullName,email,password})
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newNurse.password, salt, (err, hash) => {
                            if (err) throw err;
                            newNurse.password = hash;
                            newNurse.save()
                                .then(responseNurse => {
                                    console.log(responseNurse)
                                    res.json({
                                        Status: "Successful",
                                        Message: 'Nurse has been registered successfully.',
                                        User: responseNurse
                                    })
                                })
                                .catch(error => {
                                    res.json({
                                        Status: "Unsuccessful",
                                        Message: "Happened saving the specialist in " +
                                            "DB.",
                                        error: error.Message
                                    })
                                })
                        })
                    })
                }
            })
            .catch(error=>{
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened finding the nurse in " +
                        "DB.",
                    error: error
                })
            })
    }
}

// ****************************** To login to a admin account ******************************
exports.login = async (req, res) => {
    const {email, password} = req.body;

    //Validation
    if (!email || !password) {
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }

    //Check for existing user
    Admin.findOne({email: req.body.email})
        .then(admin => {
            if (!admin) {
                res.json({Status: "Unsuccessful", Message: 'Invalid user email.'})
            } else {
                //Validating password
                bcrypt.compare(password, admin.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.json({Status: "Unsuccessful", Message: "Password is incorrect."})
                        } else {
                            res.json({
                                Status: "Successful",
                                Message: 'Admin has been logged successfully.',
                                User: admin
                            })
                        }
                    });
            }
        })
}

