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
import Axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";



class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          passwordConfirmation: "",
          firstName: "",
          lastName: "",
          date: new Date(),
          birthDate: ""
           
        };
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this)
        this.handleBirthDate = this.handleBirthDate.bind(this)
        this.handleRegistration = this.handleRegistration.bind(this)
        this.onFirstNameChange = this.onFirstNameChange.bind(this)
        this.onLastNameChange = this.onLastNameChange.bind(this)
    }



    onEmailChange(event) {
      let email = event.target.value
      this.setState( {
        email: email
      })
    }

    onPasswordChange(event) {
      let password = event.target.value
      this.setState({
        password: password
      })

    }

    onPasswordConfirmChange(event) {
      let passwordConfirmation = event.target.value
      this.setState({
        passwordConfirmation: passwordConfirmation
      })

    }

    handleBirthDate(date) {
    
        this.setState({
            date: date,
            birthDate: dateFormat(date, "dd/mm/yyyy")

        })
    }

    onFirstNameChange(event) {
      let firstName = event.target.value
      this.setState({
        firstName: firstName
      })
    }

    onLastNameChange(event) {
      let lastName = event.target.value
      this.setState({
        lastName: lastName
      })
    }

    handleRegistration() {
      console.log("Handling registration.")
      for(var key in this.state) {
        if(this.state[key] === "") {
          NotificationManager.error(key + " cannot be empty.", "Error.")
          return
        }
      }
      
      if(this.state.password != this.state.passwordConfirmation) {
        NotificationManager.error("Password and confirmation must match.", "Error.");
      }else{
        let baseUrl = "http://localhost:8080"
        let signInUrl = "/users/sign-up"
        let payload = {
          password: this.state.password,
          email: this.state.email,
          profile: {
            birthDate: this.state.birthDate,
            firstName: this.state.firstName,
            lastName: this.state.lastName
          }
        }

        let headers = { 
          headers: {
            "Content-Type":"application/json",
            "Accept": "application/json"
          }
        }

        Axios.post(baseUrl + signInUrl, payload, headers)
             .then((response) => {
               NotificationManager.success("Successfully registered account.", "Succes.")
               setTimeout(function(){
               window.location.reload()
              }, 2000);
             }).catch((error) => {
               NotificationManager.error("Email is invalid or already taken.", "Error.")
             })
      }

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
                    <label className="text-style">First Name</label>
                    <input type="text" className="form-control" placeholder="Enter First Name" onChange={this.onFirstNameChange} />
                  </div>
                  <div className="form-group">
                    <label className="text-style">Last Name</label>
                    <input type="text" className="form-control" placeholder="Enter Last Name" onChange={this.onLastNameChange} />
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
                            selected={this.state.date}
                            onChange={this.handleBirthDate}
                            className="form-control"
                    />
                  </div>
                  <Button color="default" className="MuiButton-root-1 button-style confirm-button" onClick={this.handleRegistration}>
                    Register
                  </Button>
                </form>
                <NotificationContainer />
            </div>
        </div>)
    }
}

export default RegistrationForm;
