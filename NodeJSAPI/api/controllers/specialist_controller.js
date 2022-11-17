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
    const {userId} = req.body
    Patient.find({specialist:userId})
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

exports.addRecord = (req,res) => {
    const {patientId,record}  = req.body

    if(patientId === "" || record ===""){
        res.json({Status: "Unsuccessful", Message: 'All data must be entered.'});
    }else{
        Patient.findById(patientId)
            .then(patient=>{
                let newRecords = patient.records
                newRecords.push({
                    date: Date.now(),
                    details: record
                })
                patient.records = newRecords
                Patient.findByIdAndUpdate(patientId,patient)
                    .then(savedPatient=>{
                        res.json({
                            Status: "Successful",
                            Message: 'Record has been added.',
                            Patients: savedPatient
                        })
                    })
                    .catch(error=>{
                        console.log(error)
                        res.json({
                            Status: "Unsuccessful",
                            Message: "Happened saving the patient to the " +
                                "DB.",
                            error: error.Message
                        })
                    })
            })
            .catch(error=>{
                console.log(error)
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened getting the patient from " +
                        "DB.",
                    error: error.Message
                })
            })
    }
}

exports.addPrescription = (req,res) => {
    const {patientId,prescription,remarks}  = req.body

    if(patientId === "" || prescription ===""||remarks === ""){
        console.log(patientId,prescription,remarks)
        res.json({Status: "Unsuccessful",
            Message: 'All data must be entered.' +
                patientId +" Pres "+prescription+" Remarks "+remarks});
    }else{
        console.log("OKOKOKO")
        Patient.findById(patientId)
            .then(patient=>{
                let newPrescriptions = patient.prescriptions
                newPrescriptions.push({
                    date: Date.now(),
                    prescription: prescription,
                    remarks:remarks
                })
                patient.prescriptions = newPrescriptions
                Patient.findByIdAndUpdate(patientId,patient)
                    .then(savedPatient=>{
                        res.json({
                            Status: "Successful",
                            Message: 'Prescription has been added.',
                            Patients: savedPatient
                        })
                    })
                    .catch(error=>{
                        console.log(error)
                        res.json({
                            Status: "Unsuccessful",
                            Message: "Happened saving the patient to the " +
                                "DB.",
                            error: error.Message
                        })
                    })
            })
            .catch(error=>{
                console.log(error)
                res.json({
                    Status: "Unsuccessful",
                    Message: "Happened getting the patient from " +
                        "DB.",
                    error: error.Message
                })
            })
    }
}

exports.getSpecialists = (req, res) => {
    Specialist.find()
        .then(specialists => {
            res.json({
                Status: "Successful",
                Message: 'Specialists have been deleted',
                Specialists: specialists
            })
        })
        .catch(error => {
            console.log(error)
            res.json({
                Status: "Unsuccessful",
                Message: "Happened finding the specialists from " +
                    "DB.",
                error: error.Message
            })
        })
}