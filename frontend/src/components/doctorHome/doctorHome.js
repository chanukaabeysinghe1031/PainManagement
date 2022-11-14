import React, {Component} from 'react';
import './doctorHome.css'
import {Navigate} from "react-router-dom";


class DoctorHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            reDirectToAddPatient: false,
            reDirectToAccountSelect: false
        }
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

                        <div className="doctorHomeUserContainer">
                            <table className="doctorHomeUserTable">
                                <tr className="doctorHomePatientRow">
                                    <th className="doctorHomeUserHeaderColumn">Full Name</th>
                                    <th className="doctorHomeUserHeaderColumn">Admission No</th>
                                    <th className="doctorHomeUserHeaderColumn">Admission Date</th>
                                    <th className="doctorHomeUserHeaderColumn">Email</th>
                                    <th className="doctorHomeUserHeaderColumn">Disease</th>
                                    <th className="doctorHomeUserHeaderColumn">Treatment</th>
                                </tr>
                                <tr className="doctorHomePatientRow">
                                    <th className="doctorHomeUserDataColumn">Chanuka Abeysinghe</th>
                                    <th className="doctorHomeUserDataColumn">334324242432FAD</th>
                                    <th className="doctorHomeUserDataColumn">15 September,2022</th>
                                    <th className="doctorHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                    <th className="doctorHomeUserDataColumn">Accident</th>
                                    <th className="doctorHomeUserDataColumn">Operation</th>
                                </tr>
                                <tr className="doctorHomePatientRow">
                                    <th className="doctorHomeUserDataColumn">Chanuka Abeysinghe</th>
                                    <th className="doctorHomeUserDataColumn">334324242432FAD</th>
                                    <th className="doctorHomeUserDataColumn">15 September,2022</th>
                                    <th className="doctorHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                    <th className="doctorHomeUserDataColumn">Accident</th>
                                    <th className="doctorHomeUserDataColumn">Operation</th>
                                </tr>
                                <tr className="doctorHomePatientRow">
                                    <th className="doctorHomeUserDataColumn">Chanuka Abeysinghe</th>
                                    <th className="doctorHomeUserDataColumn">334324242432FAD</th>
                                    <th className="doctorHomeUserDataColumn">15 September,2022</th>
                                    <th className="doctorHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                    <th className="doctorHomeUserDataColumn">Accident</th>
                                    <th className="doctorHomeUserDataColumn">Operation</th>
                                </tr>
                                <tr className="doctorHomePatientRow">
                                    <th className="doctorHomeUserDataColumn">Chanuka Abeysinghe</th>
                                    <th className="doctorHomeUserDataColumn">334324242432FAD</th>
                                    <th className="doctorHomeUserDataColumn">15 September,2022</th>
                                    <th className="doctorHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                    <th className="doctorHomeUserDataColumn">accident</th>
                                    <th className="doctorHomeUserDataColumn">Operation</th>
                                </tr>
                                <tr className="doctorHomePatientRow">
                                    <th className="doctorHomeUserDataColumn">Chanuka Abeysinghe</th>
                                    <th className="doctorHomeUserDataColumn">334324242432FAD</th>
                                    <th className="doctorHomeUserDataColumn">15 September,2022</th>
                                    <th className="doctorHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                    <th className="doctorHomeUserDataColumn">Accident</th>
                                    <th className="doctorHomeUserDataColumn">Operation</th>
                                </tr>
                                <tr className="doctorHomePatientRow">
                                    <th className="doctorHomeUserDataColumn">Chanuka Abeysinghe</th>
                                    <th className="doctorHomeUserDataColumn">334324242432FAD</th>
                                    <th className="doctorHomeUserDataColumn">15 September,2022</th>
                                    <th className="doctorHomeUserDataColumn">abeysinghechanuka@gmail.com</th>
                                    <th className="doctorHomeUserDataColumn">Accident</th>
                                    <th className="doctorHomeUserDataColumn">Operation</th>
                                </tr>
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