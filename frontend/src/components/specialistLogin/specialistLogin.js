import React, {Component} from 'react';
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";
import speicalistImage from "../../images/specialist.jpeg";


class SpecialistLogin extends Component {
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
            axios.post("http://localhost:3006/api/specialists/login", {
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
            return <Navigate to="/specialistHome"/>
        } else if (this.state.reDirectToAccountSelect) {
            return <Navigate to="/selectAccount"/>
        } else {
            return (
                <div className="loginLoginForm">
                    <img src={speicalistImage} alt="logo" className="loginLoginImage" />
                    <form className="loginSubLoginForm" onSubmit={this.login}>
                        <h1 className="loginLoginFormTitle">WELCOME SPECIALIST</h1>
                        <div className="loginLoginError">{this.state.error}</div>
                        <div className="loginFormTextInputContainer">
                            <h5 className="loginLoginLabel">Email</h5>
                            <input
                                className="loginLoginFormTextInput"
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
                        <div className="loginFormTextInputContainer">
                            <h5 className="loginLoginLabel">Password</h5>
                            <input
                                className="loginLoginFormTextInput"
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
                                className="loginLoginbutton"
                                value="Login"
                            />
                        </div>
                        <input
                            type="button"
                            onClick={() => this.setState({reDirectToAccountSelect: true})}
                            className="goToAccountSelectButton"
                            value="Select Account Type"
                        />
                    </form>

                </div>
            );
        }
    }
}

export default SpecialistLogin;