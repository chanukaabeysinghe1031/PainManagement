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
import DoctorHome from "./components/doctorHome/doctorHome";
import DoctorLogin from "./components/doctorLogin/doctorLogin";

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
            <Route path="/doctorHome" element={<DoctorHome/>} />
            <Route path="/doctorLogin" element={<DoctorLogin/>} />
        </Routes>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
