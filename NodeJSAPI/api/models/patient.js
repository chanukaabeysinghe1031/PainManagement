const mongoose = require('mongoose')
const patientsSchema = new mongoose.Schema({
    admissionNo:{
        type:String,
        required:true
    },
    admissionDate:{
        type: Date,
        required : Date.now()
    },
    specialist:{
        type:String,
        required:true
    },
    doctor:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    dob:{
        type: Date,
        required :  true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    disease:{
        type:String,
        required:true
    },
    treatment:{
        type:String,
        required:true
    },
    additionalDetails:{
        type:String,
        required:true
    },
    painsDetected: [{
        date:{
            type: Date,
            required : Date.now()
        },
        details:{
            type: String,
            required: true
        },
        treatment:{
            type: String,
            required: true
        }
      }],
    records:[{
        date:{
            type: Date,
            required :  true
        },
        details:{
            type: String,
            required: true
        },
    }],
    prescriptions:[{
        date:{
            type: Date,
            required :  true
        },
        prescription:{
            type: String,
            required: true
        },
        remarks:{
            type: String,
            required: true
        },
    }]
})


module.exports =  mongoose.model('Patients',patientsSchema)