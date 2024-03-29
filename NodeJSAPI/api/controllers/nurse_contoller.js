const Nurse  = require("../models/nurse")
const bcrypt = require("bcryptjs");
const Patient = require("../models/patient");

// ****************************** To login to a nurse account ******************************
exports.login = async (req, res) => {
    const {email, password} = req.body;

    //Validation
    if (!email || !password) {
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }

    //Check for existing user
    Nurse.findOne({email: req.body.email})
        .then(nurse => {
            if (!nurse) {
                res.json({Status: "Unsuccessful", Message: 'Invalid user email.'})
            } else {
                //Validating password
                bcrypt.compare(password, nurse.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.json({Status: "Unsuccessful", Message: "Password is incorrect."})
                        } else {
                            res.json({
                                Status: "Successful",
                                Message: 'Nurse has been logged successfully.',
                                User: nurse
                            })
                        }
                    });
            }
        })
}

// ************************* To register a seller account **************************
exports.addPainRecord =  async  (req,res) => {
    const {
        patientId,date,details,treatment
    } = req.body

    if(
        patientId===""||date===""||details===""||treatment===""
    ){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{

        Patient.findById(patientId)
            .then(patient=>{
                if(patient===null){
                    res.json({
                        Status: "Unsuccessful",
                        Message: "There is no patient with this id."
                    })
                }else{
                    let newPains =patient.painsDetected
                    console.log(date)
                    newPains = patient.painsDetected
                    newPains.push({
                        date:date,
                        details:"fasfsafas",
                        treatment:treatment
                    })
                    patient.painsDetected = newPains
                    console.log("NEW PATIENT",newPains)
                    Patient.findByIdAndUpdate(patientId,patient)
                        .then(savedPatient=>{
                            res.json({
                                Status: "Successful",
                                Message: 'Pain record has been recorded.',
                                User: savedPatient
                            })
                        })
                        .catch(error=>{
                            console.log(error)
                            res.json({
                                Status: "Unsuccessful",
                                Message: "Happened saving the patient in " +
                                    "DB.",
                                error: error
                            })
                        })
                }
            })
            .catch(error=>{
                console.log("HI"+error)
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened finding the patient in " +
                        "DB.",
                    error: error
                })
            })
    }
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
