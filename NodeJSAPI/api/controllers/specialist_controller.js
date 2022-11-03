const Specialist  = require("../models/specialist")
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
