const UserMoodRecords= require('../models/userMoodRecord')

// ************************* To predict body fat **************************
exports.predictMood= (req,res) => {
    const {
        userId
     } = req.body 

    if(userId===""||req.file===null){
            res.json({Status: "Unsuccessful", Message: "All the data must be entered."})
    }else{
        // Take the prediction for the mood from the flask api
        let moodPrediction = "Happy";
        const newRecord  = new UserMoodRecords({
            userId,image:req.file.path
        })
        newRecord.save()
        .then(result=>{
            res.json({
                Status: "Successful",
                Message: 'Record  has been saved successfully.',
                prediction : moodPrediction
            })
        })
        .catch(error=>{
            res.json({
                Status: "Unsuccessful",
                Message: "Happened saving the record in " +
                    "DB.",
                error: error.Message
            })
        })
    }
}