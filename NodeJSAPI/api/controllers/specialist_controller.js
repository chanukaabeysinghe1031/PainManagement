const Specialist  = require("../models/specialist")
const Patient  = require("../models/patient")

const bcrypt = require("bcryptjs");

// ****************************** To login to a doctor account ******************************

exports.login = async (req, res) => {
    const {email, password} = req.body;

    //Validation
    if (!email || !password) {
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }

    //Check for existing user
    Specialist.findOne({email: req.body.email})
        .then(doctor => {
            if (!doctor) {
                res.json({Status: "Unsuccessful", Message: 'Invalid user email.'})
            } else {
                //Validating password
                bcrypt.compare(password, doctor.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.json({Status: "Unsuccessful", Message: "Password is incorrect."})
                        } else {
                            res.json({
                                Status: "Successful",
                                Message: 'Specialist has been registered successfully.',
                                User: doctor
                            })
                        }
                    });
            }
        })
}

exports.getPatients = async (req,res) => {
    Patient.find()
        .then(response => {
            res.json({
                Status: "Successful",
                Message: 'Patients have been received',
                Patients: response
            })
        })
        .catch(error=>{
            console.log(error)
            res.json({
                Status: "Unsuccessful",
                Message: "Happened getting the patients from " +
                    "DB.",
                error: error.Message
            })
        })
}
