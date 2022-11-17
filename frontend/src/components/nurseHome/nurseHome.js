import React, {Component} from 'react';
import './nurseHome.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import doctorImage from "../../images/doctor.jpeg";


class NurseHome extends Component {
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
            reDirectToAddPainRecord:false
        }
    }
    componentDidMount() {
        console.log("OK")
        axios.get("http://localhost:3006/api/nurses/getPatients")
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
        } else if(this.state.reDirectToAddPainRecord){
            return <Navigate to="/addPainRecord"/>
        }else {
            return (
                <div className="nurseHome">
                    <h4 className="nurseTitle">Observe Patients</h4>
                    <div className="nurseSubDiv">
                        <div className="nursePatientSelectionPane">
                            {
                                this.state.patients.map((element,index)=>{
                                    return (
                                        <div className="nursePatientContainer" onClick={()=>{
                                            this.setState({
                                                patientDetails:element
                                            })
                                        }}>
                                            <h6 className="nursePatientName">{element.firstName} {element.lastName}</h6>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="nursePatientDetails">
                            {
                                this.state.patientDetails.firstName===""?
                                    <h5 className="selectMessage">Please select a patient.</h5>
                                    :
                                    <div>
                                        <div className="nursePatientDataRow">
                                            <a
                                                href="localhost:8501"
                                                target="_blank"
                                                className="nurseObserveButton">
                                                Observe
                                            </a>
                                            <h4 className="nurseObserveButton" onClick={()=>{
                                                localStorage.setItem('patientId', this.state.patientDetails._id)
                                               this.setState({reDirectToAddPainRecord:true})
                                            }}>
                                                Add Pain Record
                                            </h4>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">First Name</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.firstName}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Last Name</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.lastName}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Admission No</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.admissionNo}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Admission Date</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.admissionDate}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Date of Birth</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.dob}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Address</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.address}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Contact No</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.contactNo}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Disease</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.disease}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Treatment</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.treatment}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">
                                            <h4 className="nurseDataHeader">Additional Details</h4>
                                            <h3 className="nurseData">{this.state.patientDetails.additionalDetails}</h3>
                                        </div>
                                        <div className="nursePatientDataRow">

                                        </div>
                                    </div>

                            }
                        </div>
                    </div>
                    <div className="nurseLogoutButton" onClick={()=>{
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

export default NurseHome;