const User  = require('../models/aestheticDoctor')
const bcrypt = require("bcryptjs");

// ************************* To register a seller account **************************
exports.addUser =  async  (req,res) => {
    const {fullName,address,contactNo,email,password} = req.body

    if(fullName===""||email===""||password===""){
        res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        console.log(email)
        const user = new User({
            fullName,
            email,
            password
        })

        User.find({email:email})
        .then(user=>{
            console.log(user)
            if(user.length>0){
                res.json({
                    Status: "Unsuccessful",
                    Message: "There is a user with this email address already."
                })
            }else{
                const newUser = new User({fullName,email,password})
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(responseSavingUser => {
                            console.log(responseSavingUser)
                            res.json({
                                Status: "Successful",
                                Message: 'User has been registered successfully.',
                                User: responseSavingUser
                            })
                        })
                        .catch(error => {
                            res.json({
                                Status: "Unsuccessful",
                                Message: "Happened saving the user in " +
                                    "DB.",
                                error: error.Message
                            })
                        })
                    })
                })
            }
        })
        .catch(error=>{
            console.log("HI"+error)
            res.json({
                Status: "Unsuccessful",
                Message: "Happened finding the user in " +
                    "DB.",
                error: error
            })
        })
    }
}
// ****************************** To login to a user account ******************************
exports.signin = async (req, res) => {
    const {email, password} = req.body;

    //Validation
    if (!email || !password) {
        res.json({Status: "Unsuccessful", Message: 'Email and password must be entered.'});
    }

    //Check for existing user
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                res.json({Status: "Unsuccessful", Message: 'Invalid user email.'})
            } else {
                //Validating password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.json({Status: "Unsuccessful", Message: "Password is incorrect."})
                        } else {
                            res.json({
                                Status: "Successful",
                                Message: 'User has been registered successfully.',
                                User: user
                            })
                        }
                    });
            }
        })
}

exports.getUsers = async (req,res) =>{
    User.find()
        .then(users=>{
            res.json({
                "Status":"Successful",
                "Users": users
            })
        })
        .catch(error=>{
            res.json({
                "Status":"Unsuccessful",
                "Error": error
            })
        })
}