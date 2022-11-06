import React, {Component} from 'react';
import './addPainRecord.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";


class AddPainRecord extends Component {

    constructor(props) {
        let patientId = localStorage.getItem('patientId')
        super(props);
        this.state = {
            painDetails: {
                patientId:patientId,
                date:"",
                details:"",
                treatment:""
            },
            reDirectToAccountSelect: false,
            reDirectToAdminHome: false,
        }
    }

    login = (event) => {
        event.preventDefault();
        if (this.state.painDetails.patientId === "" || this.state.painDetails.date === "" ||
            this.state.painDetails.details === "" || this.state.painDetails.treatment === ""
        ) {
            this.setState({error: "Please Fill all Required Fields"})
        } else {
            axios.post("http://localhost:3006/api/nurses/addPainRecord",this.state.painDetails )
                .then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        this.setState({reDirectToAccountSelect: true})
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
            return <Navigate to="/nurseHome"/>
        } else if (this.state.reDirectToAccountSelect) {
            return <Navigate to="/nurseHome"/>
        } else {
            return (
                <div className="adminLoginForm">
                    <form className="subLoginForm" onSubmit={this.login}>
                        <h1 className="loginformTitle">Add Pain Record</h1>
                        <div className="loginError">{this.state.error}</div>
                        <div className="loginformtextbox">
                            <h5 className="loginLabel">Date</h5>
                            <input
                                className="loginFormTextInput"
                                onChange={(e) =>
                                    this.setState({
                                        painDetails: {
                                            ...this.state.painDetails,
                                            date: e.target.value
                                        }
                                    })
                                }
                                value={this.state.painDetails.date}
                                type="text"
                                placeholder="Date"
                            />
                        </div>
                        <div className="loginformtextbox">
                            <h5 className="loginLabel">Details</h5>
                            <input
                                className="loginFormTextInput"
                                onChange={(e) =>
                                    this.setState({
                                        painDetails: {
                                            ...this.state.painDetails,
                                            details: e.target.value
                                        }
                                    })
                                }
                                value={this.state.painDetails.details}
                                placeholder="Details"
                            />
                        </div>
                        <div className="loginformtextbox">
                            <h5 className="loginLabel">Treatment</h5>
                            <input
                                className="loginFormTextInput"
                                onChange={(e) =>
                                    this.setState({
                                        painDetails: {
                                            ...this.state.painDetails,
                                            treatment: e.target.value
                                        }
                                    })
                                }
                                value={this.state.painDetails.treatment}
                                placeholder="Treatment"
                            />
                        </div>
                        <div className="loginformtextbox">
                            <input
                                type="submit"
                                className="loginbutton"
                                value="Record pain of the patient"
                            />
                        </div>
                        <input
                            type="button"
                            onClick={() => this.setState({reDirectToAccountSelect: true})}
                            className="gotoRegisterButton"
                            value="Back"
                        />
                    </form>

                </div>
            );
        }
    }
}

export default AddPainRecord;