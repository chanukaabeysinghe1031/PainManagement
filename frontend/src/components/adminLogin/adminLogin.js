import React, {Component} from 'react';
import './adminLogin.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import adminImage from "../../images/admin.png";


class AdminLogin extends Component {
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
            if (this.state.isAdmin) {
                axios.post("http://localhost:3006/api/admin/login", {
                    email: this.state.loginDetails.email,
                    password: this.state.loginDetails.password
                }).then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        const data = response.data.User;
                        console.log(data)
                        localStorage.setItem('user', JSON.stringify(data))
                        this.setState({reDirectToHomePage: true})
                    } else {
                        this.setState({error: message})
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState({error: err})
                });
            } else {
                axios.post("http://localhost:3006/api/admin/login", {
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
                    this.setState({error: "Network Error"})
                });
            }
        }
    }


    render() {
        if (this.state.reDirectToAdminHome) {
            return <Navigate to="/adminHome"/>
        } else if (this.state.reDirectToAccountSelect) {
            return <Navigate to="/selectAccount"/>
        } else {
            return (
                <div className="adminLoginForm">
                    <img src={adminImage} alt="logo" className="adminLoginImage" />
                    <form className="subLoginForm" onSubmit={this.login}>
                        <h1 className="loginformTitle">WELCOME ADMIN</h1>
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
                            <h5 className="loginLabel">Email</h5>
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

export default AdminLogin;