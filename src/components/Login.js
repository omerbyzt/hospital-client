import React, {Component} from 'react';
import '../App.css';

class Login extends Component {
    state = {
        id: "",
        password: ""
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        if(this.state.id === "admin" && this.state.password === "pass3"){
            this.props.history.push("/appointment")
            sessionStorage.setItem("user",this.state.id)
        }
        else{
            window.alert("USERNAME OR PASSWORD WRONG!")
        }
    }

    render() {
        const{id, password} = this.state;
        return (
            <div className="container loginCard">
                <div className="row">
                    <div className="col-xl-8 mx-auto">
                        <div className="card">
                            <div className="card-header" align="center">
                                <h1>Welcome to Appointment System</h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.login}>
                                    <label htmlFor="patientId">Patient Id</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Please Enter TC No"
                                           name="id"
                                           id="patientId"
                                           value={id}
                                           onChange={this.changeInput}
                                    />

                                    <label htmlFor="patientPassword" className="mt-2">Patient Password</label>
                                    <input type="password"
                                           className="form-control"
                                           placeholder="Please Enter Password"
                                           name="password"
                                           id="patientPassword"
                                           value={password}
                                           onChange={this.changeInput}
                                    />
                                    <button className="btn btn-success btn-block mt-3" type="submit"> Login </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;