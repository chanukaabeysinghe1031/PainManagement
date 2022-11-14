import React, {Component} from 'react';
import './adminHome.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import doctorImage from "../../images/doctor.jpeg";
import nurseImage from  "../../images/nurse.jpeg";
import specialistImage from "../../images/specialist.jpeg";
import adminImage from "../../images/admin.png";


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
            displayDoctors:false,
            displayNurses:false,
            displaySpecialists:false,
            displayPatients:true
        }
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
                    <div className="adminHomeMain">
                        <div className="adminHomeMenu">
                            <h6 className="adminHomeMenuItem" onClick={()=>{
                                this.setState({
                                    displayDoctors:true,
                                    displayNurses:false,
                                    displaySpecialists:false,
                                    displayPatients:false
                                })
                            }}>Doctors</h6>
                            <h6 className="adminHomeMenuItem" onClick={()=>{
                                this.setState({
                                    displayDoctors:false,
                                    displayNurses:false,
                                    displaySpecialists:true,
                                    displayPatients:false
                                })
                            }}>Specialists</h6>
                            <h6 className="adminHomeMenuItem" onClick={()=>{
                                this.setState({
                                    displayDoctors:false,
                                    displayNurses:true,
                                    displaySpecialists:false,
                                    displayPatients:false
                                })
                            }}>Nurses</h6>
                            <h6 className="adminHomeMenuItem" onClick={()=>{
                                this.setState({
                                    displayDoctors:false,
                                    displayNurses:false,
                                    displaySpecialists:false,
                                    displayPatients:true
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
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Nimal Perera</th>
                                            <th className="adminHomeUserDataColumn">nimal@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Yasas Gunawardhena</th>
                                            <th className="adminHomeUserDataColumn">yasas@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Kasun Silve</th>
                                            <th className="adminHomeUserDataColumn">kasun@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
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
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Nimal Perera</th>
                                            <th className="adminHomeUserDataColumn">nimal@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Yasas Gunawardhena</th>
                                            <th className="adminHomeUserDataColumn">yasas@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Kasun Silve</th>
                                            <th className="adminHomeUserDataColumn">kasun@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
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
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Nimal Perera</th>
                                            <th className="adminHomeUserDataColumn">nimal@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Yasas Gunawardhena</th>
                                            <th className="adminHomeUserDataColumn">yasas@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
                                        <tr className="adminHomeUserRow">
                                            <th className="adminHomeUserDataColumn">Kasun Silve</th>
                                            <th className="adminHomeUserDataColumn">kasun@gmail.com</th>
                                            <th className="adminHomeUserDeleteButton">Delete</th>
                                        </tr>
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
                                        <tr className="adminHomePatientRow">                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">334324242432FAD</th>
                                            <th className="adminHomeUserDataColumn">15 September,2022</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDataColumn">Accident</th>
                                            <th className="adminHomeUserDataColumn">Operation</th>
                                        </tr>
                                        <tr className="adminHomePatientRow">                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">334324242432FAD</th>
                                            <th className="adminHomeUserDataColumn">15 September,2022</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDataColumn">Accident</th>
                                            <th className="adminHomeUserDataColumn">Operation</th>
                                        </tr>
                                        <tr className="adminHomePatientRow">                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">334324242432FAD</th>
                                            <th className="adminHomeUserDataColumn">15 September,2022</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDataColumn">Accident</th>
                                            <th className="adminHomeUserDataColumn">Operation</th>
                                        </tr>
                                        <tr className="adminHomePatientRow">                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">334324242432FAD</th>
                                            <th className="adminHomeUserDataColumn">15 September,2022</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDataColumn">Accident</th>
                                            <th className="adminHomeUserDataColumn">Operation</th>
                                        </tr>
                                        <tr className="adminHomePatientRow">                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">334324242432FAD</th>
                                            <th className="adminHomeUserDataColumn">15 September,2022</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDataColumn">Accident</th>
                                            <th className="adminHomeUserDataColumn">Operation</th>
                                        </tr>
                                        <tr className="adminHomePatientRow">                                            <th className="adminHomeUserDataColumn">Chanuka Abeysinghe</th>
                                            <th className="adminHomeUserDataColumn">334324242432FAD</th>
                                            <th className="adminHomeUserDataColumn">15 September,2022</th>
                                            <th className="adminHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                            <th className="adminHomeUserDataColumn">Accident</th>
                                            <th className="adminHomeUserDataColumn">Operation</th>
                                        </tr>
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