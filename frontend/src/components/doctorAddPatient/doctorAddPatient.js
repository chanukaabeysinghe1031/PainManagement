import React, {Component} from 'react';
import './doctorAddPatient.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import doctorImage from "../../images/doctor.jpeg";
import Dropdown from 'react-bootstrap/Dropdown';

class DoctorAddPatient extends Component {
    constructor(props) {
        super(props);
        const user = localStorage.getItem("user")
        const userParsed = JSON.parse(user)
        this.state = {
            patientDetails: {
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
                selectedSpecialist:"",
                doctor:userParsed._id
            },
            specialists:[],
            reDirectToAccountSelect: false,
            reDirectToDoctorHome:false
        }
    }

    componentDidMount() {
        console.log("OK")
        const user = localStorage.getItem("user")
        const userParsed = JSON.parse(user)
        this.setState({userId:userParsed._id})
        axios.post("http://localhost:3006/api/specialists/getSpecialists")
            .then(response => {
                const status = response.data.Status
                const message = response.data.Message
                if (status === "Successful") {
                    const data = response.data.Specialists;
                    this.setState({specialists: data})
                } else {
                    console.log("GOT PATIENS")
                    this.setState({error: message},()=>{
                        this.handleErrorModalShow();
                    })
                }
            }).catch(err => {
            console.log(err)
            this.setState({error: err})
        });
    }


    login = (event) => {
        event.preventDefault();
        if (this.state.patientDetails.email === "" || this.state.patientDetails.password === "") {
            this.setState({error: "Please Fill all Required Fields"})
        } else {
            axios.post("http://localhost:3006/api/doctors/addPatient", this.state.patientDetails)
                .then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        const data = response.data.User;
                        console.log(data)
                        localStorage.setItem('user', JSON.stringify(data))
                        this.setState({
                            patientDetails: {
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
                            error: "Successfully registered the patient."
                        })
                    } else {
                        this.setState({error: message})
                    }
                }).catch(err => {
                console.log(err)
                this.setState({error: err})
            });
        }
    }


    render() {
        if (this.state.reDirectToDoctorHome) {
            return <Navigate to="/doctorHome"/>
        } else if (this.state.reDirectToAccountSelect) {
            return <Navigate to="/selectAccount"/>
        } else {
            return (
                <div className="doctorForm">
                    <img src={doctorImage} alt="logo" className="doctorHomeImage"/>
                    <form className="subDoctorHomeForm" onSubmit={this.login}>
                        <h1 className="doctorHomeFormTitle">Registration of Patients</h1>
                        <div className="loginError">{this.state.error}</div>
                        <div className="doctorHomeRow">
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Admission No</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                admissionNo: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.admissionNo}
                                    type="text"
                                />
                            </div>
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Admission Date</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                admissionDate: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.admissionDate}
                                    type="text"
                                    placeholder="yyyy.mm.dd"
                                />
                            </div>
                        </div>
                        <div className="doctorHomeRow">
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">First Name</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                firstName: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.firstName}
                                    type="text"
                                />
                            </div>
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Last Name</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                lastName: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.lastName}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="doctorHomeRow">
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Date of Birth</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                dob: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.dob}
                                    type="text"
                                    placeholder="yyyy.mm.dd"
                                />
                            </div>
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Address</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                address: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.address}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="doctorHomeRow">
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Email</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                email: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.email}
                                    type="text"
                                />
                            </div>
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Contact Number</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                contactNo: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.contactNo}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="doctorHomeRow">
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Disease</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                disease: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.disease}
                                    type="text"
                                />
                            </div>
                            <div className="doctorTextInputContainer">
                                <h5 className="doctorFormLabel">Treatment</h5>
                                <input
                                    className="doctorFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            patientDetails: {
                                                ...this.state.patientDetails,
                                                treatment: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.patientDetails.treatment}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="doctorTextInputContainer2">
                            <h5 className="doctorFormLabel">Additional Details</h5>
                            <input
                                className="doctorFormTextInput"
                                onChange={(e) =>
                                    this.setState({
                                        patientDetails: {
                                            ...this.state.patientDetails,
                                            additionalDetails: e.target.value
                                        }
                                    })
                                }
                                value={this.state.patientDetails.additionalDetails}
                                type="text"
                            />
                        </div>

                        <div className="doctorTextInputContainer2">
                            <h5 className="doctorFormLabel">Select the Specialist</h5>
                            <Dropdown className="dropDown">
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        this.state.specialists.map((specialist,index)=>{
                                            return(
                                                <Dropdown.Item onClick={()=>{
                                                    this.setState({
                                                        patientDetails: {
                                                            ...this.state.patientDetails,
                                                            specialist: specialist._id
                                                        }
                                                    })
                                                }}>

                                                    {specialist.fullName}
                                                </Dropdown.Item>

                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <input
                            type="submit"
                            className="doctorAddPatientButton"
                            value="Save Patient"
                        />
                        <input
                            type="button"
                            onClick={() => this.setState({reDirectToDoctorHome: true})}
                            className="goToDoctorHomeButton"
                            value="Back"
                        />
                    </form>

                </div>
            );
        }
    }
}

export default DoctorAddPatient;