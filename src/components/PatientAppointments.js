import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios';

class PatientAppointments extends Component {
    state = {
        appointmentList : [],
    }
    componentDidMount() {
        axios.get('http://localhost:8080/appointment/tc/' + localStorage.getItem("user_id"),
            {headers : {Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                this.setState({appointmentList: res.data})
            });
    }

    logOut = () => {
        this.props.history.push("/")
    }

    goAppointmentPage = () => {
        this.props.history.push("/appointment")
    }

    deleteAppointment = (e) => {
        axios.delete('http://localhost:8080/appointment/' + e.id,
            {headers : {Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                window.location.reload(false);  //doğru değil biliyorum ama inadına yapıyorum
            });
    }

    appointmentInfo = () => {
        console.log("burada bir modal açıp info bilgilerini yazıcaz aslan parçası")
    }

    cancelButton = (e) => {
        if(e.status == 0){
            return(
                <button className="btn btn-danger" onClick={()=> this.deleteAppointment(e)}>Cancel Appointment</button>
            )
        }
        if(e.status == 1){
            return(
                <button className="btn btn-secondary" disabled>Canceled Appointment</button>
            )
        }
        if(e.status == 2){
            return(
                <button className="btn btn-success" onClick={()=> this.appointmentInfo()}>Appointment Info</button>
            )
        }
    }

    render() {
        const {appointmentList} = this.state
        return (
            <div>
                <div className="headerCss">
                    <h1 className="ml-2">Welcome to Hospital Appointment System
                        <button
                            className="btn btn-link btn-lg otherAppointments ml-5"
                            onClick={() => this.goAppointmentPage()}> Appointment Page </button>
                        <button
                            className="btn btn-danger btn-lg signOutBtn"
                            onClick={() => this.logOut()}>Log-out: {localStorage.getItem("user")}</button>
                    </h1>
                </div>

                <h1 className="customPatientTableTitle text-center">{localStorage.getItem("user")} Appointment List</h1>
                <div className="container customTable">
                    <Table stripped>
                        <thead>
                        <tr>
                            {/*<th className="customTextFont"><h3>Doctor</h3></th>*/}
                            <th className="customTextFont"><h3>Doctor</h3></th>
                            <th className="customTextFont"><h3>Appointment Date</h3></th>
                            <th className="customTextFont"><h3>Appointment Hour</h3></th>
                            <th className="customTextFont"><h3>Cancel</h3></th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            appointmentList.map(v => {
                                return(
                                    <tr>
                                        {/*<th>{v.patient.name} {v.patient.surname}</th>*/}
                                        <th>{v.doctor.name} {v.doctor.surname}</th>
                                        <th>{v.date}</th>
                                        <th>{v.hour}</th>
                                        <th>
                                            {this.cancelButton(v)}
                                            {/*<button className="btn btn-danger" onClick={()=> this.deleteAppointment(v)}>Cancel Appointments</button>*/}
                                        </th>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </div>

            </div>
        );
    }
}

export default PatientAppointments;