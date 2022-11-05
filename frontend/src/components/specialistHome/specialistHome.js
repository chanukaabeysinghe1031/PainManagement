import React, {Component} from 'react';
import './specialistHome.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import doctorImage from "../../images/doctor.jpeg";


class SpecialistHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients:[],
            patientDetails:{
                id:"",
                admissionNo: "",
                admissionDate: "",
                firstName: "",
                lastName: "",
                dob: "",
                address: "",
                email: "",
                contactNo: "",
                disease: "",
                treatment: "",
                additionalDetails: "",
            },
            reDirectToAccountSelect: false,
            reDirectToAdminHome: false,
        }
    }
    componentDidMount() {
        console.log("OK")
        axios.get("http://localhost:3006/api/specialists/getPatients")
            .then(response => {
            const status = response.data.Status
            const message = response.data.Message
            if (status === "Successful") {
                const data = response.data.Patients;
                this.setState({patients:data})
            } else {
                this.setState({error: message})
            }
        }).catch(err => {
            console.log(err)
            this.setState({error: err})
        });
    }


    render() {
        if (this.state.reDirectToAdminHome) {
            return <Navigate to="/adminHome"/>
        } else if (this.state.reDirectToAccountSelect) {
            return <Navigate to="/selectAccount"/>
        } else {
            return (
                <div className="specialistHome">
                    <h4 className="specialistTitle">See Patients' Details</h4>
                    <div className="specialistSubDiv">
                        <div className="patientSelectionPane">
                            {
                                this.state.patients.map((element,index)=>{
                                    return (
                                        <div className="patientContainer" onClick={()=>{
                                            this.setState({
                                                patientDetails:element
                                            })
                                        }}>
                                            <h6 className="patientName">{element.firstName} {element.lastName}</h6>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="patientDetails">
                            {
                                this.state.patientDetails.firstName===""?
                                    <h5 className="selectMessage">Please select a patient.</h5>
                                    :
                                    <div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">First Name</h4>
                                            <h3 className="data">{this.state.patientDetails.firstName}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Last Name</h4>
                                            <h3 className="data">{this.state.patientDetails.lastName}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Admission No</h4>
                                            <h3 className="data">{this.state.patientDetails.admissionNo}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Admission Date</h4>
                                            <h3 className="data">{this.state.patientDetails.admissionDate}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Date of Birth</h4>
                                            <h3 className="data">{this.state.patientDetails.dob}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Address</h4>
                                            <h3 className="data">{this.state.patientDetails.address}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Contact No</h4>
                                            <h3 className="data">{this.state.patientDetails.contactNo}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Disease</h4>
                                            <h3 className="data">{this.state.patientDetails.disease}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Treatment</h4>
                                            <h3 className="data">{this.state.patientDetails.treatment}</h3>
                                        </div>
                                        <div className="patientDataRow">
                                            <h4 className="dataHeader">Additional Details</h4>
                                            <h3 className="data">{this.state.patientDetails.additionalDetails}</h3>
                                        </div>
                                        <div className="patientDataRow">

                                        </div>
                                    </div>

                            }
                        </div>
                    </div>
                    <div className="logoutButton" onClick={()=>{
                        this.setState({
                            reDirectToAccountSelect:true
                        })
                    }}>
                        <h4 className="logoutText">Logout</h4>
                    </div>
                </div>
            );
        }
    }
}

export default SpecialistHome;