import React, {Component} from 'react';
import './accountSelect.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import doctorImage from "../../images/doctor.jpeg";
import nurseImage from  "../../images/nurse.jpeg";
import specialistImage from "../../images/specialist.jpeg";
import adminImage from "../../images/admin.png";
import { EqualHeight, EqualHeightElement } from 'react-equal-height';


class AccountSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reDirectToAdminLogin: false,
            reDirectToNurseLogin: false,
            reDirectToDoctorLogin: false,
            reDirectToSpecialistLogin: false,
            userId:""
        }
    }

    render() {
        if (this.state.reDirectToSpecialistLogin) {
            return <Navigate to="/specialistLogin"/>
        }else if(this.state.reDirectToAdminLogin){
            return <Navigate to="/adminLogin"/>
        }else if(this.state.reDirectToNurseLogin){
            return <Navigate to="/nurseLogin"/>
        }else if(this.state.reDirectToDoctorLogin){
            return <Navigate to="/doctorLogin"/>
        } else {
            return (
                <div className="WelcomeMainBody">
                    <h1 className="welcomeTitle">Pain Management System</h1>
                    <div className="selectAccountMain">
                        <div className="welcomeUserDiv" onClick={()=>{
                            this.setState({reDirectToSpecialistLogin:true})
                        }}>
                            <img src={specialistImage} alt="logo" className="userImage" />
                            <h3 className="welcomeUserTitle">Specialist</h3>
                        </div>
                        <div className="welcomeUserDiv" onClick={()=>{
                            this.setState({reDirectToDoctorLogin:true})
                        }}>
                            <img src={doctorImage} alt="logo" className="userImage" />
                            <h3 className="welcomeUserTitle">Aesthetic Doctor</h3>
                        </div>
                        <div className="welcomeUserDiv" onClick={()=>{
                            this.setState({reDirectToNurseLogin:true})
                        }}>
                            <img src={nurseImage} alt="logo" className="userImage" />
                            <h3 className="welcomeUserTitle">Nurse</h3>
                        </div >
                        <div className="welcomeUserDiv" onClick={()=>{
                            this.setState({reDirectToAdminLogin:true})
                        }}>
                            <img src={adminImage} alt="logo" className="userImage" />
                            <h3 className="welcomeUserTitle">Admin</h3>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

export default AccountSelect;