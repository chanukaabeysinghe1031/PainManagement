import React, {Component} from 'react';
import './nurseLogin.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import nurseImage from "../../images/nurse.jpeg";


class NurseLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                email: "",
                password: ""
            },
            reDirectToAccountSelect: false,
            reDirectToAdminHome: false,
        }
    }

    login = (event) => {
        event.preventDefault();
        if (this.state.loginDetails.email === "" || this.state.loginDetails.password === "") {
            this.setState({error: "Please Fill all Required Fields"})
        } else {
            axios.post("http://localhost:3006/api/nurses/login", {
                    email: this.state.loginDetails.email,
                    password: this.state.loginDetails.password
                }).then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        const data = response.data.User;
                        console.log(data)
                        localStorage.setItem('user', JSON.stringify(data))
                        this.setState({reDirectToAdminHome: true})
                    } else {
                        this.setState({error: message})
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState({error: err})
                });
        }
    }


    render() {
        if (this.state.reDirectToAdminHome) {
            return <Navigate to="/nurseHome"/>
        } else if (this.state.reDirectToAccountSelect) {
            return <Navigate to="/selectAccount"/>
        } else {
            return (
                <div className="adminLoginForm">
                    <img src={nurseImage} alt="logo" className="adminLoginImage" />
                    <form className="subLoginForm" onSubmit={this.login}>
                        <h1 className="loginformTitle">WELCOME NURSE</h1>
                        <div className="loginError">{this.state.error}</div>
                        <div className="loginformtextbox">
                            <h5 className="loginLabel">Email</h5>
                            <input
                                className="loginFormTextInput"
                                onChange={(e) =>
                                    this.setState({
                                        loginDetails: {
                                            ...this.state.loginDetails,
                                            email: e.target.value
                                        }
                                    })
                                }
                                value={this.state.loginDetails.email}
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        <div className="loginformtextbox">
                            <h5 className="loginLabel">Password</h5>
                            <input
                                className="loginFormTextInput"
                                onChange={(e) =>
                                    this.setState({
                                        loginDetails: {
                                            ...this.state.loginDetails,
                                            password: e.target.value
                                        }
                                    })
                                }
                                value={this.state.loginDetails.password}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="loginformtextbox">
                            <input
                                type="submit"
                                className="loginbutton"
                                value="Login"
                            />
                        </div>
                        <input
                            type="button"
                            onClick={() => this.setState({reDirectToAccountSelect: true})}
                            className="gotoRegisterButton"
                            value="Select Account Type"
                        />
                    </form>

                </div>
            );
        }
    }
}

export default NurseLogin;