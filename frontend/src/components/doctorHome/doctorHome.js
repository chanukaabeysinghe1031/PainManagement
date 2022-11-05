import React, {Component} from 'react';
import './doctorHome.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import doctorImage from "../../images/doctor.jpeg";


class DoctorHome extends Component {
    constructor(props) {
        super(props);
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
            },
            reDirectToAccountSelect: false,
            reDirectToAdminHome: false,
        }
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
        if (this.state.reDirectToAdminHome) {
            return <Navigate to="/adminHome"/>
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
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Admission No</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Admission No"
                                />
                            </div>
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Admission Date</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Admission Date"
                                />
                            </div>
                        </div>
                        <div className="doctorHomeRow">
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">First Name</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="FirstName"
                                />
                            </div>
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Last Name</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div className="doctorHomeRow">
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Date of Birth</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Date of Birth"
                                />
                            </div>
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Address</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Address"
                                />
                            </div>
                        </div>
                        <div className="doctorHomeRow">
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Email</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Email"
                                />
                            </div>
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Contact Number</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Contact Number"
                                />
                            </div>
                        </div>
                        <div className="doctorHomeRow">
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Disease</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Disease"
                                />
                            </div>
                            <div className="loginformtextbox">
                                <h5 className="loginLabel">Treatment</h5>
                                <input
                                    className="loginFormTextInput"
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
                                    placeholder="Treatment"
                                />
                            </div>
                        </div>
                        <div className="loginformtextbox">
                            <h5 className="loginLabel">Additional Details</h5>
                            <input
                                className="loginFormTextInput"
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
                                placeholder="Additional Details"
                            />
                        </div>
                        <div className="loginformtextbox">
                            <input
                                type="submit"
                                className="loginbutton"
                                value="Save Patient"
                            />
                        </div>
                        <input
                            type="button"
                            onClick={() => this.setState({reDirectToAccountSelect: true})}
                            className="gotoRegisterButton"
                            value="Logout"
                        />
                    </form>

                </div>
            );
        }
    }
}

export default DoctorHome;