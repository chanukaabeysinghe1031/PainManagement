import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {render} from "react-dom";
import {BrowserRouter,Routes, Route,} from "react-router-dom";
import AccountSelect from "./components/accountSelection/accountSelect";
import AdminLogin from "./components/adminLogin/adminLogin";
import AdminHome from "./components/adminHome/adminHome";
import AddSpecialist from "./components/addSpecialist/addSpecialist";
import AddNurse from "./components/addNurse/addNurse";
import AddDoctor from "./components/addDoctor/addDoctor";
import DoctorAddPatient from "./components/doctorAddPatient/doctorAddPatient";
import DoctorLogin from "./components/doctorLogin/doctorLogin";
import SpecialistLogin from "./components/specialistLogin/specialistLogin";
import SpecialistHome from "./components/specialistHome/specialistHome";
import NurseLogin from "./components/nurseLogin/nurseLogin";
import NurseHome from "./components/nurseHome/nurseHome";
import AddPainRecord from "./components/addPainRecord/addPainRecord";
import DoctorHome from "./components/doctorHome/doctorHome";

import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AccountSelect/>} />
            <Route path="/selectAccount" element={<AccountSelect/>} />
            <Route path="/adminLogin" element={<AdminLogin/>} />
            <Route path="/adminHome" element={<AdminHome/>} />
            <Route path="/addSpecialist" element={<AddSpecialist/>} />
            <Route path="/addNurse" element={<AddNurse/>} />
            <Route path="/addDoctor" element={<AddDoctor/>} />
            <Route path="/doctorAddPatient" element={<DoctorAddPatient/>} />
            <Route path="/doctorLogin" element={<DoctorLogin/>} />
            <Route path="/specialistLogin" element={<SpecialistLogin/>} />
            <Route path="/specialistHome" element={<SpecialistHome/>} />
            <Route path="/nurseLogin" element={<NurseLogin/>} />
            <Route path="/nurseHome" element={<NurseHome/>} />
            <Route path="/addPainRecord" element={<AddPainRecord/>} />
            <Route path="/doctorHome" element={<DoctorHome/>} />
        </Routes>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
