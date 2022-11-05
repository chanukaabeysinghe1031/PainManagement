import React, {Component} from 'react';
import './homePage.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reDirectToLogin: false,
            predicted: true,
            predictedValue: null,
            image:null,
            userId:"abc"
        }
    }

    render() {
        if (this.state.reDirectToLogin) {
            return <Navigate to="/login"/>
        } else {
            return (
                <div className="homePageMain">
                    <h1 className="title">Welcome</h1>
                    {this.state.predicted ?
                        <div className="predictionBox">
                            <h3 className="prediction">
                                The  Patient is : {this.state.predictedValue}
                            </h3>
                        </div>
                        :
                        <div></div>
                    }
                    <div className="form">
                        <div className="inputComponent">
                            <h7 className="label">Please select the x-ray image of the patient.
                            </h7>
                            <input
                                id='fileUpload'
                                type='file'
                                multiple
                                onChange={(e)=>{
                                    console.log(e)
                                    this.setState({
                                        image:e.target.files
                                    },()=>{
                                        console.log("FILE",e.target.files)
                                    })
                                }}
                                // accept='image/png'
                            />
                        </div>
                        <br/>
                        <br/>
                        <input
                            type="button"
                            onClick={(event) => {
                                event.preventDefault()
                                if (this.state.image===null
                                ) {

                                } else {
                                    const formData = new FormData();
                                    formData.append('userId', this.state.userId)
                                    formData.append('image', this.state.image)
                                    axios.post("http://localhost:3006/api/predictions/predict", formData)
                                        .then(response => {
                                            console.log(response.data)
                                            this.setState({predictedValue: response.data.Prediction})
                                        }).catch(err => {
                                        console.log("Error", err)
                                        this.setState({error: err})
                                    });
                                }
                                console.log(this.state)
                            }}
                            className=" loginbutton"
                            value="Diagnose COVID"
                        />
                        <input
                            type="button"
                            onClick={() => this.setState({reDirectToLogin: true})}
                            className="logoutbutton"
                            value="Logout"
                        />
                    </div>
                </div>
            );
        }
    }
}

export default HomePage;