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
            userId:""
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
                        <div className="userDiv" onClick={()=>{
                            this.setState({reDirectToAddSpecialist:true})
                        }}>
                            <img src={specialistImage} alt="logo" className="userImage" />
                            <h3 className="userTitle">Add a Specialist</h3>
                        </div>
                        <div className="userDiv" onClick={()=>{
                            this.setState({reDirectToAddDoctor:true})
                        }}>
                            <img src={doctorImage} alt="logo" className="userImage" />
                            <h3 className="userTitle">Add an Aesthetic Doctor</h3>
                        </div>
                        <div className="userDiv" onClick={()=>{
                            this.setState({reDirectToAddNurse:true})
                        }}>
                            <img src={nurseImage} alt="logo" className="userImage" />
                            <h3 className="userTitle">Add a Nurse</h3>
                        </div >
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