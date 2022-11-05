const AestheticDoctor  = require('../models/aestheticDoctor')
const Patient = require('../models/patient')
const bcrypt = require("bcryptjs");

// ************************* To register a seller account **************************
exports.addPatient =  async  (req,res) => {
    const {
        admissionNo,admissionDate,firstName,lastName,dob,address,email,
        contactNo, disease, treatment,additionalDetails
    } = req.body

    if(
        admissionNo===""||admissionDate===""||firstName===""||lastName===""||dob===""||address===""||
        email===""||contactNo===""||disease===""||treatment===""||additionalDetails===""
    ){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        console.log(email)
        const patient = new Patient({
            admissionNo,admissionDate,firstName,lastName,dob,address,email,
            contactNo, disease, treatment,additionalDetails
        })

        Patient.find({email:email})
        .then(oldPatient=>{
            if(oldPatient.length>0){
                res.json({
                    Status: "Unsuccessful",
                    Message: "There is a patient with this email address already."
                })
            }else{
                patient.save()
                    .then(response=>{
                        res.json({
                            Status: "Successful",
                            Message: 'Patient has been savedsuccessfully.',
                            User: response
                        })
                    })
                    .catch(error=>{
                        res.json({
                            Status: "Unsuccessful",
                            Message: "Happened saving the patient in " +
                                "DB.",
                            error: error.Message
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
// ****************************** To login to a doctor account ******************************
exports.login = async (req, res) => {
    const {email, password} = req.body;

    //Validation
    if (!email || !password) {
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }

    //Check for existing user
    AestheticDoctor.findOne({email: req.body.email})
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
                                Message: 'The Aesthetic doctor has been logged successfully.',
                                User: doctor
                            })
                        }
                    });
            }
        })
}
