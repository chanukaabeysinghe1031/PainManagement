import React, {Component} from 'react';
import './adminHome.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import doctorImage from "../../images/doctor.jpeg";
import nurseImage from  "../../images/nurse.jpeg";
import specialistImage from "../../images/specialist.jpeg";
import adminImage from "../../images/admin.png";
import Modal from "react-bootstrap/Modal";
import dateFormat from 'dateformat';


class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reDirectToAddAdmin: false,
            reDirectToAddNurse: false,
            reDirectToAddDoctor: false,
            reDirectToAddSpecialist: false,
            reDirectToAccountSelect:false,
            userId:"",
            displayDoctors:true,
            displayNurses:false,
            displaySpecialists:false,
            displayPatients:false,
            specialists:[],
            doctors:[],
            nurses:[],
            patients:[],
            displayErrorModal:false,
            showRemoveDoctorModal:false,
            showRemoveSpecialistModal:false,
            showRemoveNurseModal:false,
            deleteDoctor:"",
            deleteSpecialist:"",
            deleteNurse:"",
            menuItemStyle1:"selectedAdminHomeMenuItem1",
            menuItemStyle2:"adminHomeMenuItem2",
            menuItemStyle3:"adminHomeMenuItem3",
            menuItemStyle4:"adminHomeMenuItem4"
        }
    }

    componentDidMount() {
        console.log("OK")
        const user = localStorage.getItem("user")
        const userParsed = JSON.parse(user)
        this.setState({userId:userParsed._id})
        axios.get("http://localhost:3006/api/admin/getPersons")
            .then(response => {
                const status = response.data.Status
                const message = response.data.Message
                if (status === "Successful") {
                    const data = response.data;
                    this.setState({
                        nurses: data.Nurses,
                        specialists:data.Specialists,
                        doctors:data.Doctors,
                        patients:data.Patients
                    })
                } else {
                    console.log("GOT PATIENS")
                    this.setState({error: message},()=>{
                        this.handleErrorModalShow();
                    })
                }
            })
            .catch(err => {
            console.log(err)
            this.setState({error: err},()=>{
                this.handleErrorModalShow();
            })
        });
    }

    handleErrorModalClose = () => {this.setState({displayErrorModal:false})};
    handleErrorModalShow = () => {this.setState({displayErrorModal:true})}

    handleDoctorModalClose = () => {this.setState({showRemoveDoctorModal:false})};
    handleDoctorModalShow = () => {this.setState({showRemoveDoctorModal:true})}

    handleSpecialistModalClose = () => {this.setState({showRemoveSpecialistModal:false})};
    handleSpecialistModalShow = () => {this.setState({showRemoveSpecialistModal:true})}

    handleNurseModalClose = () => {this.setState({showRemoveNurseModal:false})};
    handleNurseModalShow = () => {this.setState({showRemoveNurseModal:true})}

    removeDoctor = () =>{
        axios.post("http://localhost:3006/api/admin/deleteDoctor",{
            id:this.state.deleteDoctor
        })
            .then(response => {
                const status = response.data.Status
                const message = response.data.Message
                if (status === "Successful") {
                    const data = response.data;
                    this.setState({error: "Deleted Successfully."},()=>{
                        this.handleErrorModalShow();
                        window.location.reload(true);
                    })
                } else {
                    console.log("GOT PATIENS")
                    this.setState({error: message},()=>{
                        this.handleErrorModalShow();
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({error: err}, () => {
                    this.handleErrorModalShow();
                })
            })
    }

    removeSpecialist = () => {
        axios.post("http://localhost:3006/api/admin/deleteSpecialist",{
            id:this.state.deleteSpecialist
        })
            .then(response => {
                const status = response.data.Status
                const message = response.data.Message
                if (status === "Successful") {
                    const data = response.data;
                    this.setState({error: "Deleted Successfully."},()=>{
                        this.handleErrorModalShow();
                    })
                    window.location.reload(true);
                } else {
                    console.log("GOT PATIENS")
                    this.setState({error: message},()=>{
                        this.handleErrorModalShow();
                    })

                }
            })
            .catch(err => {
                console.log(err)
                this.setState({error: err}, () => {
                    this.handleErrorModalShow();
                })
            })
    }

    removeNurse = () => {
        axios.post("http://localhost:3006/api/admin/deleteNurse",{
            id:this.state.deleteNurse
        })
            .then(response => {
                const status = response.data.Status
                const message = response.data.Message
                if (status === "Successful") {
                    const data = response.data;
                    this.setState({error: "Deleted Successfully."},()=>{
                        this.handleErrorModalShow();
                        window.location.reload(true);
                    })
                } else {
                    console.log("GOT PATIENS")
                    this.setState({error: message},()=>{
                        this.handleErrorModalShow();
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({error: err}, () => {
                    this.handleErrorModalShow();
                })
            })
    }

    render() {
        if (this.state.reDirectToAddSpecialist) {
            return <Navigate to="/addSpecialist"/>
        }else if(this.state.reDirectToAccountSelect){
            return <Navigate to="/selectAccount"/>
        }else if(this.state.reDirectToAddNurse){
            return <Navigate to="/addNurse"/>
        }else if(this.state.reDirectToAddDoctor){
            return <Navigate to="/addDoctor"/>
        } else {
            return (
                <div>
                    <Modal show={this.state.displayErrorModal}>
                        <Modal.Header>Message</Modal.Header>
                        <Modal.Body>
                            <div className="specialistAddInputContainer">
                                {this.state.error}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="specialistAddModalCloseButton"
                                 onClick={this.handleErrorModalClose}
                            >
                                Close
                            </div>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showRemoveDoctorModal}>
                        <Modal.Header>Remove Aesthetic Doctor</Modal.Header>
                        <Modal.Body>
                            Do you really want to remove this Aesthetic Doctor?
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="specialistAddModalAddButton"
                                 onClick={this.removeDoctor}
                            >
                                Yes
                            </div>
                            <div className="specialistAddModalCloseButton"
                                 onClick={this.handleDoctorModalClose}
                            >
                                No
                            </div>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showRemoveSpecialistModal}>
                        <Modal.Header>Remove Specialist</Modal.Header>
                        <Modal.Body>
                            Do you really want to remove this Specialist Doctor?
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="specialistAddModalAddButton"
                                 onClick={this.removeSpecialist}
                            >
                                Yes
                            </div>
                            <div className="specialistAddModalCloseButton"
                                 onClick={this.handleSpecialistModalClose}
                            >
                                No
                            </div>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showRemoveNurseModal}>
                        <Modal.Header>Remove Nurse</Modal.Header>
                        <Modal.Body>
                            Do you really want to remove this Nurse?
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="specialistAddModalAddButton"
                                 onClick={this.removeNurse}
                            >
                                Yes
                            </div>
                            <div className="specialistAddModalCloseButton"
                                 onClick={this.handleNurseModalClose}
                            >
                                No
                            </div>
                        </Modal.Footer>
                    </Modal>
                    <div className="adminHomeMain">
                        <div className="adminHomeMenu">
                            <h6 className={this.state.menuItemStyle1} onClick={()=>{
                                this.setState({
                                    displayDoctors:true,
                                    displayNurses:false,
                                    displaySpecialists:false,
                                    displayPatients:false,
                                    menuItemStyle1:"selectedAdminHomeMenuItem1",
                                    menuItemStyle2:"adminHomeMenuItem2",
                                    menuItemStyle3:"adminHomeMenuItem3",
                                    menuItemStyle4:"adminHomeMenuItem4"
                                })
                            }}>Doctors</h6>
                            <h6 className={this.state.menuItemStyle2} onClick={()=>{
                                this.setState({
                                    displayDoctors:false,
                                    displayNurses:false,
                                    displaySpecialists:true,
                                    displayPatients:false,
                                    menuItemStyle2:"selectedAdminHomeMenuItem2",
                                    menuItemStyle1:"adminHomeMenuItem1",
                                    menuItemStyle3:"adminHomeMenuItem3",
                                    menuItemStyle4:"adminHomeMenuItem4"
                                })
                            }}>Specialists</h6>
                            <h6 className={this.state.menuItemStyle3} onClick={()=>{
                                this.setState({
                                    displayDoctors:false,
                                    displayNurses:true,
                                    displaySpecialists:false,
                                    displayPatients:false,
                                    menuItemStyle3:"selectedAdminHomeMenuItem3",
                                    menuItemStyle1:"adminHomeMenuItem1",
                                    menuItemStyle2:"adminHomeMenuItem2",
                                    menuItemStyle4:"adminHomeMenuItem4"
                                })
                            }}>Nurses</h6>
                            <h6 className={this.state.menuItemStyle4} onClick={()=>{
                                this.setState({
                                    displayDoctors:false,
                                    displayNurses:false,
                                    displaySpecialists:false,
                                    displayPatients:true,
                                    menuItemStyle4:"selectedAdminHomeMenuItem4",
                                    menuItemStyle1:"adminHomeMenuItem1",
                                    menuItemStyle2:"adminHomeMenuItem2",
                                    menuItemStyle3:"adminHomeMenuItem3",
                                })
                            }}>Patients</h6>
                        </div>
                        {
                            this.state.displayDoctors ?
                                <div className="adminHomeUserContainer">
                                    <h5 className="adminHomeUserTitle" onClick={()=>{
                                        this.setState({reDirectToAddDoctor:true})
                                    }}>Add a Doctor</h5>
                                    <table className="adminHomeUserTable">
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserHeaderColumn">Full Name</th>
                                            <th className="adminHomeUserHeaderColumn">Email</th>
                                            <th className="adminHomeUserHeaderColumn"></th>
                                        </tr>
                                        {this.state.doctors.map((doctor, index) => {
                                            return(
                                                <tr className="adminHomeUserRow">
                                                    <th className="adminHomeUserDataColumn">
                                                        {doctor.fullName}
                                                    </th>
                                                    <th className="adminHomeUserDataColumn">
                                                        {doctor.email}
                                                    </th>
                                                    <th
                                                        onClick={()=>{
                                                            this.setState({
                                                                deleteDoctor:doctor._id
                                                            },()=>{
                                                                this.handleDoctorModalShow()
                                                            })
                                                        }}
                                                        className="adminHomeUserDeleteButton"
                                                    >
                                                        Delete
                                                    </th>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </div>
                                :
                                <div></div>
                        }

                        {
                            this.state.displayNurses ?
                                <div className="adminHomeUserContainer">
                                    <h5 className="adminHomeUserTitle" onClick={()=>{
                                        this.setState({reDirectToAddNurse:true})
                                    }}>Add a Nurse</h5>
                                    <table className="adminHomeUserTable">
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserHeaderColumn">Full Name</th>
                                            <th className="adminHomeUserHeaderColumn">Email</th>
                                            <th className="adminHomeUserHeaderColumn"></th>
                                        </tr>
                                        {this.state.nurses.map((nurse,index)=>{
                                            return(
                                                <tr className="adminHomeUserRow">
                                                    <th className="adminHomeUserDataColumn">
                                                        {nurse.fullName}
                                                    </th>
                                                    <th className="adminHomeUserDataColumn">
                                                        {nurse.email}
                                                    </th>
                                                    <th
                                                        onClick={()=>{
                                                            this.setState({
                                                                deleteNurse:nurse._id
                                                            },()=>{
                                                                this.handleNurseModalShow()
                                                            })
                                                        }}
                                                        className="adminHomeUserDeleteButton"
                                                    >Delete</th>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </div>
                                :
                                <div></div>
                        }

                        {
                            this.state.displaySpecialists ?
                                <div className="adminHomeUserContainer">
                                    <h5 className="adminHomeUserTitle" onClick={()=>{
                                        this.setState({reDirectToAddSpecialist:true})
                                    }}>Add a Specialist</h5>
                                    <table className="adminHomeUserTable">
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserHeaderColumn">Full Name</th>
                                            <th className="adminHomeUserHeaderColumn">Email</th>
                                            <th className="adminHomeUserHeaderColumn"></th>
                                        </tr>
                                        {this.state.specialists.map((specialist,index)=>{
                                            return(
                                                <tr className="adminHomeUserRow">
                                                    <th className="adminHomeUserDataColumn">
                                                        {specialist.fullName}
                                                    </th>
                                                    <th className="adminHomeUserDataColumn">
                                                        {specialist.email}
                                                    </th>
                                                    <th
                                                        onClick={()=>{
                                                            this.setState({
                                                                deleteSpecialist:specialist._id
                                                            },()=>{
                                                                this.handleSpecialistModalShow()
                                                            })
                                                        }}
                                                        className="adminHomeUserDeleteButton"
                                                    >Delete</th>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </div>
                                :
                                <div></div>
                        }
                        {
                            this.state.displayPatients ?
                                <div className="adminHomeUserContainer">
                                    <table className="adminHomeUserTable">
                                        <tr className="adminHomePatientRow">
                                            <th className="adminHomeUserHeaderColumn">Full Name</th>
                                            <th className="adminHomeUserHeaderColumn">Admission No</th>
                                            <th className="adminHomeUserHeaderColumn">Admission Date</th>
                                            <th className="adminHomeUserHeaderColumn">Email</th>
                                            <th className="adminHomeUserHeaderColumn">Disease</th>
                                            <th className="adminHomeUserHeaderColumn">Treatment</th>
                                        </tr>
                                        {
                                            this.state.patients.map((patient,index)=>{
                                                return(
                                                    <tr className="adminHomePatientRow">
                                                        <th className="adminHomeUserDataColumn">
                                                            {patient.firstName} {patient.lastName}
                                                        </th>
                                                        <th className="adminHomeUserDataColumn">
                                                            {patient.admissionNo}
                                                        </th>
                                                        <th className="adminHomeUserDataColumn">
                                                            {dateFormat(patient.admissionDate,"mmmm dS, yyyy")}
                                                        </th>
                                                        <th className="adminHomeUserDataColumn">
                                                            {patient.email}
                                                        </th>
                                                        <th className="adminHomeUserDataColumn">
                                                            {patient.disease}
                                                        </th>
                                                        <th className="adminHomeUserDataColumn">
                                                            {
                                                                patient.treatment
                                                            }
                                                        </th>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </div>
                                :
                                <div></div>
                        }

                    </div>
                    <h6 onClick={()=>{
                        this.setState({reDirectToAccountSelect:true})
                    }} className="adminLogoutButtonText">
                        Logout
                    </h6>
                </div>
            );
        }
    }
}

export default AdminHome;