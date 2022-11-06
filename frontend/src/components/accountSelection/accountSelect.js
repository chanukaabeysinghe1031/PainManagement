import React, {Component} from 'react';
import './accountSelect.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import doctorImage from "../../images/doctor.jpeg";
import nurseImage from  "../../images/nurse.jpeg";
import specialistImage from "../../images/specialist.jpeg";
import adminImage from "../../images/admin.png";


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
                <div className="selectAccountMain">
                    <div className="userDiv" onClick={()=>{
                        this.setState({reDirectToSpecialistLogin:true})
                    }}>
                        <img src={specialistImage} alt="logo" className="userImage" />
                        <h3 className="userTitle">Specialist</h3>
                    </div>
                    <div className="userDiv" onClick={()=>{
                        this.setState({reDirectToDoctorLogin:true})
                    }}>
                        <img src={doctorImage} alt="logo" className="userImage" />
                        <h3 className="userTitle">Aesthetic Doctor</h3>
                    </div>
                    <div className="userDiv" onClick={()=>{
                        this.setState({reDirectToNurseLogin:true})
                    }}>
                        <img src={nurseImage} alt="logo" className="userImage" />
                        <h3 className="userTitle">Nurse</h3>
                    </div >
                    <div className="userDiv" onClick={()=>{
                        this.setState({reDirectToAdminLogin:true})
                    }}>
                        <img src={adminImage} alt="logo" className="userImage" />
                        <h3 className="userTitle">Admin</h3>
                    </div>

                </div>
            );
        }
    }
}

export default AccountSelect;