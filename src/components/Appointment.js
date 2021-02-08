import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import DatePicker from "react-datepicker";
import {addDays} from "date-fns";
import {tr} from 'date-fns/locale';
import {Modal} from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import AppSuccess from "./AppSuccess";

class Appointment extends Component {

    state = {
        hospitalList: [],
        doctorList: [],
        selectedHospital: "Not Select Yet",
        selectedDoctor: "Not Select Yet",
        selectedDoctorId: "",
        selectedDate: "Not Select Yet",
        selectedHour: "Not Select Yet",
        selectedHourLong: "",
        reservedHours: [],
        isShowHours: false,
        isAllSelect: false,
        showModal: false,
        doctorObj: "",
        hospitalObj: "",
        showSuccess: false
    }

    componentDidMount() {
        axios.get('http://localhost:8080/hospital')
            .then(res => {
                this.setState({hospitalList: res.data})
            });
    }

    getDoctorListByHospitalId = (e) => {
        axios.get('http://localhost:8080/hospital/doctors/' + e.id)
            .then(res => {
                this.setState({
                    doctorList: res.data,
                    selectedHospital: e.name,
                    selectedDoctor: "Not Select Yet",
                    isShowHours: false,
                    hospitalObj: e
                })
            });
    }

    onClickDoctor = (e) => {
        this.setState({
            selectedDoctor: e.name + " " + e.surname,
            selectedDoctorId: e.id,
            isShowHours: false,
            doctorObj: e
        })
    }

    showSelection = () => {
        if (this.state.isAllSelect) {
            return (
                <div className="mt-4">
                    <hr/>
                    <Table>
                        <tbody>
                        <tr>
                            <h4 className="ml-4 customTextFont">Selected Hospital
                                : {this.state.selectedHospital}</h4>
                        </tr>
                        <hr/>
                        <tr>
                            <h4 className="ml-4 customTextFont">Selected Doctor
                                : {this.state.selectedDoctor}</h4>
                        </tr>
                        <hr/>
                        <tr>
                            <h4 className="ml-4 customTextFont">Selected Date
                                : {this.state.selectedDate}</h4>
                        </tr>
                        <hr/>
                        <tr>
                            <h4 className="ml-4 customTextFont">Selected Hour
                                : {this.state.selectedHour}</h4>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    showSelectionModal = () => {
        return (
            <div className="mt-2">
                <Table>
                    <tbody>
                    <tr>
                        <h4 className="ml-4 customTextFont"> Paitent : {sessionStorage.getItem("user")}</h4>
                    </tr>
                    <hr/>
                    <tr>
                        <h4 className="ml-4 customTextFont">Hospital
                            : {this.state.selectedHospital}</h4>
                    </tr>
                    <hr/>
                    <tr>
                        <h4 className="ml-4 customTextFont">Doctor
                            : {this.state.selectedDoctor}</h4>
                    </tr>
                    <hr/>
                    <tr>
                        <h4 className="ml-4 customTextFont">Date
                            : {this.state.selectedDate}</h4>
                    </tr>
                    <hr/>
                    <tr>
                        <h4 className="ml-4 customTextFont">Hour
                            : {this.state.selectedHour}</h4>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

    getReservedHours = () => {
        let tempSelectedDate = sessionStorage.getItem("date")
        let tempSelectedDateArray = tempSelectedDate.split(" ")
        let selectedDate = tempSelectedDateArray[1] + " " + tempSelectedDateArray[2] + " " + tempSelectedDateArray[3]
        let appointmentInf = {
            id: this.state.selectedDoctorId,
            date: selectedDate
        }
        console.log(selectedDate)

        axios.post('http://localhost:8080/appointment', appointmentInf)
            .then(res => {
                this.setState({reservedHours: res.data, isShowHours: true, selectedDate: selectedDate})
            });
    }

    showHours = () => {
        if (this.state.isShowHours) {
            let buttonArray = []
            for (let i = 8; i < 17; i++) {
                if (this.state.reservedHours.includes(i) || i == 12) {
                    buttonArray.push(
                        <button className="btn btn-danger timeButton ml-3 mt-3" disabled>{i}:00 - {i + 1}:00</button>
                    )
                } else {
                    buttonArray.push(
                        <button className="btn btn-info timeButton ml-3 mt-3" onClick={() => this.onClickHour(i)}>{i}:00
                            - {i + 1}:00</button>
                    )
                }
            }
            return buttonArray
        }
        return null
    }

    datePicker = () => {
        const {selectedDoctor} = this.state;
        if (selectedDoctor !== "Not Select Yet") {
            return (
                <div align="center">
                    <label className="mt-4"><h3>Please Select Appointment Date</h3></label>
                    <hr/>
                    <DatePicker dateFormat="dd/mm/yyyy"
                                onSelect={() => this.getReservedHours()}
                                onChange={date => sessionStorage.setItem("date", date)}
                                locale={tr}
                                minDate={new Date()}
                                maxDate={addDays(new Date(), 15)}
                                filterDate={date => date.getDay() != 0 && date.getDay() != 6}
                                placeholderText="Select a appointment time"
                                inline
                    />
                    <hr/>
                    {() => this.getReservedHours()}
                </div>
            );
        }
    };

    showSelectedHospital = () => {
        return (
            <div>
                <button className="btn btn-secondary btn-block mt-3" disabled>{this.state.selectedHospital}</button>
            </div>
        )
    }

    showSelectedDoctor = () => {
        return (
            <div>
                <button className="btn btn-secondary btn-block mt-3" disabled>{this.state.selectedDoctor}</button>
            </div>
        )
    }

    logOut = () => {
        this.props.history.push("/")
    }

    onClickHour = (e) => {
        this.setState({
            selectedHour: e + ":00 - " + (e + 1) + ":00",
            selectedHourLong: e,
            isAllSelect: true
        })
    }

    onClickContinue = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    addAppointment = () => {
        const newPatient = {
            id: 1,
            tc: "",
            name: "",
            surname: "",
            age: "",
            gender: ""
        }

        const newAppointment = {
            id: "",
            date: this.state.selectedDate,
            hour: this.state.selectedHourLong,
            doctor: this.state.doctorObj,
            patient: newPatient
        }

        axios.post('http://localhost:8080/appointment/add', newAppointment)

        this.setState({
            showModal: false,
            // showSuccess: true
        })
        localStorage.setItem("hospital", this.state.selectedHospital)
        localStorage.setItem("doctor", this.state.selectedDoctor)
        localStorage.setItem("date", this.state.selectedDate)
        localStorage.setItem("hour", this.state.selectedHour)
        this.props.history.push("/success")
    }

    render() {
        const {hospitalList, doctorList, selectedDoctor, selectedHospital} = this.state
        return (
            <div>
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                    <Modal.Header closeButton>
                        <h2 className="customTextFont">Confirm Selection</h2>
                    </Modal.Header>
                    <Modal.Body>
                        {this.showSelectionModal()}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-success customModalButton"
                                onClick={() => this.addAppointment()}>Confirm
                        </button>
                        <button className="btn btn-danger customModalButton"
                                onClick={() => this.setState({showModal: false})}>Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
                <div className="headerCss">
                    <h1 className="ml-2">Welcome to Hospital Appointment System
                        <button
                            className="btn btn-danger btn-lg signOutBtn"
                            onClick={() => this.logOut()}>Log-out: {sessionStorage.getItem("user")}</button>
                    </h1>
                </div>
                <Table bordered>
                    <tbody>
                    <tr>
                        <th className="customColumn">
                            <div className="card customCardHeight">
                                <div className="card-header">
                                    <h1 align="center">Hospital Selection</h1>
                                </div>
                                <div className="body mt-2 overflow">
                                    {
                                        hospitalList.map(v => {
                                            return (
                                                <button className="btn btn-outline-danger btn-block"
                                                        onClick={() => this.getDoctorListByHospitalId(v)}>{v.name}</button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {this.showSelectedHospital()}
                        </th>
                        <th className="customColumn">
                            <div className="card customCardHeight">
                                <div className="card-header">
                                    <h1 align="center">Doctor Selection</h1>
                                </div>
                                <div className="body mt-2 overflow">
                                    {
                                        doctorList.map(v => {
                                            return (
                                                <button
                                                    className="btn btn-outline-danger btn-block"
                                                    onClick={() => this.onClickDoctor(v)}>{v.name} {v.surname}</button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {this.showSelectedDoctor()}
                        </th>
                        <th>
                            <div className="customColumn">
                                <div className="card customCardHeight">
                                    <div className="card-header">
                                        <h1 align="center">Date Selection</h1>
                                    </div>
                                    <div className="body">
                                        <div align="center">
                                            {this.datePicker()}
                                            {this.showHours()}
                                            {this.showSelection()}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-success btn-block mt-3" disabled={!this.state.isAllSelect}
                                    onClick={() => this.onClickContinue()}> Continue
                                </button>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                </Table>
                {/*{*/}
                {/*    this.state.showSuccess ?*/}
                {/*        <AppSuccess/>:null*/}
                {/*}*/}
            </div>
        );
    }
}

export default Appointment;