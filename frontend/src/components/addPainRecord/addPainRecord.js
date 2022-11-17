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
            console.log("DETAILS",this.state.painDetails)
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
                <div className="addPainRecordForm">
                    <form className="subAddPainForm" onSubmit={this.login}>
                        <h1 className="addPainFormTitle">Add Pain Record</h1>
                        <div className="loginError">{this.state.error}</div>
                        <div className="addPainFormInputContainer">
                            <h5 className="addPainLabel">Date</h5>
                            <input
                                className="addPainFormTextInput"
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
                                placeholder="YYYY.MM.DD"
                            />
                        </div>
                        <div className="addPainFormInputContainer">
                            <h5 className="addPainLabel">Details</h5>
                            <input
                                className="addPainFormTextInput"
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
                        <div className="addPainFormInputContainer">
                            <h5 className="addPainLabel">Treatment</h5>
                            <input
                                className="addPainFormTextInput"
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
                        <div className="addPainFormInputContainer">
                            <input
                                type="submit"
                                className="addPainButton"
                                value="Record pain of the patient"
                            />
                        </div>
                        <input
                            type="button"
                            onClick={() => this.setState({reDirectToAccountSelect: true})}
                            className="painAddGoBackButton"
                            value="Back"
                        />
                    </form>

                </div>
            );
        }
    }
}

export default AddPainRecord;