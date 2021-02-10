import React, {Component} from 'react';
import success from '../success.png'
import Table from 'react-bootstrap/Table'

class AppSuccess extends Component {

    logOut = () => {
        this.props.history.push("/")
    }
    goOtherAppointmentsPage = () => {
        this.props.history.push("/patient-appointments")
    }
    goAppointmentsPage = () => {
        this.props.history.push("/appointment")
    }

    render() {
        return (
            <div>
                <div className="fullPageLoadingCss">
                    <div>
                        <h1 className="successText">Appointment created successfully</h1>
                    </div>
                    <div className="innerLoaderCss">
                        <img src={success}/>
                    </div>
                    <div className="successTable">
                        <Table>
                            <tbody align="center">
                            <tr>
                                <h3 className="ml-4 customTextFont"> Paitent : {localStorage.getItem("user")}</h3>
                            </tr>
                            <tr>
                                <h3 className="ml-4 customTextFont mt-2">Hospital
                                    : {localStorage.getItem("hospital")}</h3>
                            </tr>
                            <tr>
                                <h3 className="ml-4 customTextFont mt-2">Doctor
                                    : {localStorage.getItem("doctor")}</h3>
                            </tr>
                            <tr>
                                <h3 className="ml-4 customTextFont mt-2">Date
                                    : {localStorage.getItem("date")}</h3>
                            </tr>
                            <tr>
                                <h3 className="ml-4 customTextFont mt-2">Hour
                                    : {localStorage.getItem("hour")}</h3>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <button className="btn btn-success btn-lg otherButton" onClick={()=> {this.goAppointmentsPage()}}> Appointment Page </button>
                        <button className="btn btn-info btn-lg otherButton" onClick={()=> {this.goOtherAppointmentsPage()}}> My Appointments </button>
                        <button className="btn btn-danger btn-lg exitButton" onClick={()=> {this.logOut()}}> Exit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppSuccess;