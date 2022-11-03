const express = require("express");
const app = express();
const connectDB = require('./db/connection')
const cors = require('cors')

const adminRouter = require('./api/routes/admin_routes')
const specialistRouter = require('./api/routes/specialist_routes')
const nurseRouter = require('./api/routes/nurse_routes')
const aestheticDoctorRouter = require('./api/routes/aestheticDoctor_routes')


// ROUTES
app.get('/',(req,res)=>{
    res.send("This is pain management App's API")
})


connectDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'));

app.use('/api/admin',adminRouter)
app.use('/api/specialists',specialistRouter )
app.use('/api/nurses',nurseRouter )
app.use('/api/doctors',aestheticDoctorRouter)
app.listen(3006);