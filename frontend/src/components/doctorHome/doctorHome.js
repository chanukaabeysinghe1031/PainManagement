import React, {Component} from 'react';
import './doctorHome.css'
import {Navigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {default as axios} from "axios";
import dateFormat from 'dateformat';

class DoctorHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            reDirectToAddPatient: false,
            reDirectToAccountSelect: false,
            showRemovePatientModal :false,
            error:"",
            patients: [],
            patientDetails: {
                id: "",
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
        }
    }

    componentDidMount() {
        console.log("OK")
        const user = localStorage.getItem("user")
        const userParsed = JSON.parse(user)
        this.setState({userId:userParsed._id})
        this.getPatient()
    }

    getPatient = () =>{
        const user = localStorage.getItem("user")
        const userParsed = JSON.parse(user)
        this.setState({userId:userParsed._id})
        axios.post("http://localhost:3006/api/doctors/getPatients",{
            userId:userParsed._id
        })
            .then(response => {
                const status = response.data.Status
                const message = response.data.Message
                if (status === "Successful") {
                    console.log("GOT PATIENS")
                    const data = response.data.Patients;
                    this.setState({patients: data})
                } else {
                    console.log("GOT PATIENS")
                    this.setState({error: message})
                }
            }).catch(err => {
            console.log(err)
            this.setState({error: err})
        });
    }

    handleModalClose = () => {this.setState({showRemovePatientModal:false})};
    handleModalShow = () => {this.setState({showRemovePatientModal:true})}

    removePatient = () => {

    }
    render() {
        if (this.state.reDirectToAddPatient) {
            return <Navigate to="/doctorAddPatient"/>
        }else if(this.state.reDirectToAccountSelect){
            return <Navigate to="/selectAccount"/>
        } else {
            return (
                <div>
                    <div className="doctorHomeMain">
                        <div className="doctorHomeMenu">
                            <h6 className="doctorHomeMenuItem" onClick={() => {
                                this.setState({reDirectToAddPatient: true })
                            }}>Add Patient</h6>

                        </div>

                        <Modal show={this.state.showRemovePatientModal}>
                            <Modal.Header>Remove Patient</Modal.Header>
                            <Modal.Body>
                               Do you really want to remove this patient?
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="specialistAddModalAddButton"
                                     onClick={this.removePatient}
                                >
                                    Yes
                                </div>
                                <div className="specialistAddModalCloseButton"
                                     onClick={this.handleModalClose}
                                >
                                    No
                                </div>
                            </Modal.Footer>
                        </Modal>

                        <div className="doctorHomeUserContainer">
                            <table className="doctorHomeUserTable">
                                <tr className="doctorHomePatientRow">
                                    <th className="doctorHomeUserHeaderColumn">Full Name</th>
                                    <th className="doctorHomeUserHeaderColumn">Admission No</th>
                                    <th className="doctorHomeUserHeaderColumn">Admission Date</th>
                                    <th className="doctorHomeUserHeaderColumn">Email</th>
                                    <th className="doctorHomeUserHeaderColumn">Disease</th>
                                    <th className="doctorHomeUserHeaderColumn">Treatment</th>
                                    <th className="doctorHomeUserHeaderColumn"></th>
                                </tr>

                                {
                                    this.state.patients.map((patient,index)=>{
                                        return (
                                            <tr className="doctorHomePatientRow">
                                                <th className="doctorHomeUserDataColumn">
                                                    {patient.firstName} {patient.lastName}
                                                </th>
                                                <th className="doctorHomeUserDataColumn">{patient.admissionNo}</th>
                                                <th className="doctorHomeUserDataColumn">
                                                    {dateFormat(patient.admissionDate,"mmmm dS, yyyy")}
                                                </th>
                                                <th className="doctorHomeUserDataColumn">
                                                    {patient.email}
                                                </th>
                                                <th className="doctorHomeUserDataColumn">
                                                    {patient.disease}
                                                </th>
                                                <th className="doctorHomeUserDataColumn">
                                                    {patient.treatment}
                                                </th>
                                                <th className="doctorHomeUserDeleteButton" onClick={this.handleModalShow}>
                                                    Delete
                                                </th>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </div>

                    </div>
                    <h6 onClick={() => {
                        this.setState({reDirectToAccountSelect: true})
                    }} className="adminLogoutButtonText">
                        Logout
                    </h6>
                </div>
            );
        }
    }
}

export default DoctorHome;