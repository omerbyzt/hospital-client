import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios';

class PatientAppointments extends Component {
    state = {
        appointmentList : [],
        patientId : 1
    }
    componentDidMount() {
        axios.get('http://localhost:8080/appointment/' + this.state.patientId)
            .then(res => {
                this.setState({appointmentList: res.data})
            });
    }

    render() {
        const {appointmentList} = this.state
        return (
            <div>
                <div className="headerCss">
                    <h1 className="ml-2">Welcome to Hospital Appointment System
                        <button
                            className="btn btn-danger btn-lg signOutBtn"
                            onClick={() => this.logOut()}>Log-out: {sessionStorage.getItem("user")}</button>
                    </h1>
                </div>

                <h1 className="customPatientTableTitle">{sessionStorage.getItem("user")} Appointment List</h1>
                <div className="container customTable">
                    <Table stripped>
                        <thead>
                        <tr>
                            {/*<th>Hospital</th>*/}
                            <th className="customTextFont"><h3>Doctor</h3></th>
                            <th className="customTextFont"><h3>Appointment Date</h3></th>
                            <th className="customTextFont"><h3>Appointment Hour</h3></th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            appointmentList.map(v => {
                                return(
                                    <tr>
                                        {/*<th>Bakıcaz</th>*/}
                                        <th>{v.doctor.name} {v.doctor.surname}</th>
                                        <th>{v.date}</th>
                                        <th>{v.hour}</th>
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