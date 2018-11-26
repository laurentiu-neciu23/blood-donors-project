import React, { Component } from 'react';
import './RegistrationForm.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: "Your email",
          password: "Your password",
          password_confirm: "Your password confirm",
          first_name: "Your name",
          last_name: "Your name",
          birth_date: new Date()
           
        };
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this)
        this.handleBoy = this.handleBoy.bind(this)
    }

    onEmailChange(event) {

    }

    onPasswordChange(event) {

    }

    onPasswordConfirmChange(event) {

    }

    handleBoy(date) {
        this.setState({
            birth_date: date
        })
    }

    render() {
        return (<div className="RegistrationForm">
            <div className="form-container">
                <form>
                  <div className="form-group">
                    <label className="text-style">Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.onEmailChange}/>
                  </div>
                  <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={this.onPasswordChange}/>
                  </div>
                  <div className="form-group">
                    <label>Password Confirmation</label>
                    <input type="password" className="form-control" placeholder="Password Confirmation" onChange={this.onPasswordConfirmChange}/>
                  </div>
                  <div className="form-group flex">
                    <label>Birth Date </label>
                    <DatePicker
                            selected={this.state.birth_date}
                            onChange={this.handleBoy}
                            className="form-control"
                    />
                  </div>


                  <Button color="default" className="MuiButton-root-1 button-style confirm-button" onClick={this.onClick}>
                    Register
                  </Button>
                </form>
            </div>
        </div>)
    }
}

export default RegistrationForm;
