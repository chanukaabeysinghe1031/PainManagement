const Nurse  = require("../models/nurse")
const bcrypt = require("bcryptjs");

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
