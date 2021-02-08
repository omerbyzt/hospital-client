import './App.css';
import Login from "./components/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Appointment from "./components/Appointment";
import AppSuccess from "./components/AppSuccess";
import PatientAppointments from "./components/PatientAppointments";

function App() {
  return (
    <div>
        <Router>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/appointment" exact component={Appointment}></Route>
                <Route path="/success" exact component={AppSuccess}></Route>
                <Route path="/patient-appointments" exact component={PatientAppointments}></Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
