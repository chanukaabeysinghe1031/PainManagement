import React, {Component} from 'react';
import './specialistHome.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dateFormat from 'dateformat';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


class SpecialistHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            reDirectToAccountSelect: false,
            reDirectToAdminHome: false,
            displayDetails: true,
            displayRecords: false,
            displayPrescriptions: false,
            showAddRecordsModal: false,
            showAddPrescriptionModal :false,
            newRecord:"",
            newPrescription:"",
            newPrescriptionRemarks:"",
            displayErrorModal:false,
            error:"",
            userId:""
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
        axios.post("http://localhost:3006/api/specialists/getPatients",{
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

    handleRecordsModalClose = () => {this.setState({showAddRecordsModal:false})};
    handleRecordsModalShow = () => {this.setState({showAddRecordsModal:true})}

    handlePrescriptionsModalClose = () => {this.setState({showAddPrescriptionModal:false})};
    handlePrescriptionsModalShow = () => {this.setState({showAddPrescriptionModal:true})}


    handleErrorModalClose = () => {this.setState({displayErrorModal:false})};
    handleErrorModalShow = () => {this.setState({displayErrorModal:true})}

    addRecord = () =>{
        if(this.state.newRecord===""){
            this.setState({displayErrorModal:true,error:"Please add a new record"})
        }else{
            axios.post("http://localhost:3006/api/specialists/addRecord",{
                patientId:this.state.patientDetails._id,
                record:this.state.newRecord
            })
                .then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        const data = response.data.Patients;
                        this.handleRecordsModalClose()
                        this.getPatient()
                        window.location.reload(true);
                        this.setState({error:"Successfully record was added."},()=>{
                            this.handleErrorModalShow();
                        })
                    } else {
                        this.setState({error:"An error was occurred."},()=>{
                            this.handleErrorModalShow();
                        })
                    }
                }).catch(err => {
                console.log(err)
                this.setState({error: err})
            });
        }
    }

    addPrescription = () =>{
        if(this.state.newPrescription==""||this.state.newPrescriptionRemarks==""){
            this.setState({displayErrorModal:true,error:"Please fill al the data"})
        }else{
            axios.post("http://localhost:3006/api/specialists/addPrescription",{
                patientId:this.state.patientDetails._id,
                prescription:this.state.newPrescription,
                remarks:this.state.newPrescriptionRemarks
            })
                .then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        console.log()
                        const data = response.data.Patients;
                        this.handlePrescriptionsModalClose()

                        this.setState({error:"Successfully prescription was added."},()=>{
                            this.handleErrorModalShow();
                            this.getPatient()
                            window.location.reload(true);
                        })
                    } else {
                        this.setState({displayErrorModal:true,error:"An error was occurred."})
                    }
                }).catch(err => {
                    console.log("ERROR",err)
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
                <div className="specialistHome">
                    <h4 className="specialistTitle">See Patients' Details</h4>
                    <div className="specialistSubDiv">
                        <div className="specialistHomePatientSelectionPane">
                            {
                                this.state.patients.map((element, index) => {
                                    return (
                                        <div className="specialistPatientContainer" onClick={() => {
                                            this.setState({
                                                patientDetails: element
                                            })
                                        }}>
                                            <h6 className="specialistPatientName">{element.firstName} {element.lastName}</h6>
                                        </div>
                                    )
                                })
                            }
                        </div>

                       <Modal show={this.state.showAddRecordsModal}>
                           <Modal.Header>Add Record</Modal.Header>
                           <Modal.Body>
                               <div className="specialistAddInputContainer">
                                   <textarea
                                       className="specialistAddInput"
                                       onChange={(e) =>
                                           this.setState({
                                               newRecord:e.target.value
                                           })
                                       }
                                       value={this.state.newRecord}
                                       type="text"
                                       placeholder="Record"
                                   />
                               </div>
                           </Modal.Body>
                           <Modal.Footer>
                               <div className="specialistAddModalAddButton"
                                    onClick={this.addRecord}
                               >
                                   Add Record
                               </div>
                               <div className="specialistAddModalCloseButton"
                                    onClick={this.handleRecordsModalClose}
                               >
                                   Close
                               </div>
                           </Modal.Footer>
                       </Modal>

                        <Modal show={this.state.showAddPrescriptionModal}>
                            <Modal.Header>Add Prescription</Modal.Header>
                            <Modal.Body>
                                <div className="specialistAddInputContainer">
                                   <textarea
                                       className="specialistAddInput"
                                       onChange={(e) =>
                                           this.setState({
                                               newPrescription:e.target.value
                                           })
                                       }
                                       value={this.state.newPrescription}
                                       type="text"
                                       placeholder="Prescription"
                                   />
                                </div>
                                <div className="specialistAddInputContainer">
                                   <textarea
                                       className="specialistAddInput"
                                       onChange={(e) =>
                                           this.setState({
                                               newPrescriptionRemarks:e.target.value
                                           })
                                       }
                                       value={this.state.newPrescriptionRemarks}
                                       type="text"
                                       placeholder="Prescription Remarks"
                                   />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="specialistAddModalAddButton"
                                     onClick={this.addPrescription}
                                >
                                    Add Prescription
                                </div>
                                <div className="specialistAddModalCloseButton"
                                     onClick={this.handlePrescriptionsModalClose}
                                >
                                    Close
                                </div>
                            </Modal.Footer>
                        </Modal>

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

                        <div className="specialistHomePatientDetails">
                            <div className="specialistHomePatientDetailsMenu">
                                <h6 className="specialistHomePatientDetailsMenuItem" onClick={() => {
                                    this.setState({
                                        displayDetails: true,
                                        displayRecords: false,
                                        displayPrescriptions: false
                                    })
                                }}>Details</h6>
                                <h6 className="specialistHomePatientDetailsMenuItem" onClick={() => {
                                    this.setState({
                                        displayDetails: false,
                                        displayRecords: true,
                                        displayPrescriptions: false
                                    })
                                }}>Records</h6>
                                <h6 className="specialistHomePatientDetailsMenuItem" onClick={() => {
                                    this.setState({
                                        displayDetails: false,
                                        displayRecords: false,
                                        displayPrescriptions: true
                                    })
                                }}>Prescriptions</h6>
                            </div>
                            {
                                this.state.patientDetails.firstName === "" ?
                                    <h5 className="selectMessage">Please select a patient.</h5>
                                    :
                                    <div>
                                        {
                                            this.state.displayDetails ?
                                                <div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">First Name</h4>
                                                        <h3 className="specialistPatientData">{this.state.patientDetails.firstName}</h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Last Name</h4>
                                                        <h3 className="specialistPatientData">{this.state.patientDetails.lastName}</h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Admission No</h4>
                                                        <h3 className="specialistPatientData">{this.state.patientDetails.admissionNo}</h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Admission Date</h4>
                                                        <h3 className="specialistPatientData">
                                                            {dateFormat(this.state.patientDetails.admissionDate,"mmmm dS, yyyy")}
                                                        </h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Date of Birth</h4>
                                                        <h3 className="specialistPatientData">
                                                            {dateFormat(this.state.patientDetails.dob,"mmmm dS, yyyy")}</h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Address</h4>
                                                        <h3 className="specialistPatientData">{this.state.patientDetails.address}</h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Contact No</h4>
                                                        <h3 className="specialistPatientData">{this.state.patientDetails.contactNo}</h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Disease</h4>
                                                        <h3 className="specialistPatientData">{this.state.patientDetails.disease}</h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Treatment</h4>
                                                        <h3 className="specialistPatientData">{this.state.patientDetails.treatment}</h3>
                                                    </div>
                                                    <div className="patientDataRow">
                                                        <h4 className="specialistDataHeader">Additional Details</h4>
                                                        <h3 className="specialistPatientData">{this.state.patientDetails.additionalDetails}</h3>
                                                    </div>
                                                    <div className="patientDataRow">

                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                        }

                                        {
                                            this.state.displayRecords ?
                                                <div>
                                                    <div className="specialistAddButton" onClick={this.handleRecordsModalShow}>
                                                        <h7 >Add Record</h7>
                                                    </div>
                                                    <div className="specialistPrescriptionTable">
                                                        <h6 className="specialistPrescriptionHeader">Records</h6>

                                                        {
                                                            this.state.patientDetails.records.map((record,index)=>{
                                                                return(
                                                                    <div className="specialistPrescriptionData">
                                                                        <h6 className="specialistPrescriptionDataText">{record.details}</h6>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                        }

                                        {
                                            this.state.displayPrescriptions ?
                                                <div className="specialistPrescriptionTable">
                                                    <div className="specialistAddButton" onClick={this.handlePrescriptionsModalShow}>
                                                        <h7 >Add Prescription</h7>
                                                    </div>
                                                    <h6 className="specialistPrescriptionHeader">Prescriptions</h6>
                                                    {this.state.patientDetails.prescriptions.map((prescription,index)=>{
                                                        return(
                                                            <div className="specialistPrescriptionData">
                                                                <h6 className="specialistPrescriptionDataText">
                                                                    Prescription: {prescription.prescription}
                                                                </h6>
                                                                <h6 className="specialistPrescriptionDataText">
                                                                    Remarks: {prescription.remarks}
                                                                </h6>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :
                                                <div></div>
                                        }

                                    </div>

                            }
                        </div>
                    </div>
                    <div className="specialistHomeLogoutButton" onClick={() => {
                        this.setState({
                            reDirectToAccountSelect: true
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