import React, { Component } from 'react';
import './LoginForm.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import Axios from 'axios';


class LoginForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
          email: "Your email",
          password: "Your password"
        };
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.handleLoginRequest = this.handleLoginRequest.bind(this)
    }

    onEmailChange(event) {
      var email = event.target.value
      this.setState(
        {
          email: email
        }
      )

    }

    onPasswordChange(event) {
      var password = event.target.value
      this.setState(
        {
          password: password
        }
      )
    }

    handleLoginRequest() {
      let baseUrl = "http://localhost:8080"
      let signInUrl = "/login/normal"
      let payload = {
        email: this.state.email,
        password: this.state.password
      }
      let headers = { 
        headers: {
          "Content-Type":"application/json",
          "Accept": "application/json"
        }
      }

      Axios.post(baseUrl + signInUrl, payload, headers).then(
        (response) => {
          console.log(response)
          let jwtToken  = response.headers["authorization"]
          if(jwtToken == null) {
            NotificationManager.error("Password and email combination does not match",
            "Login Error")
          }else{
            localStorage.setItem('Authorization', jwtToken)
            window.location.reload()
          }
        }
      ).catch(
        (error) => {
          NotificationManager.error("Password and email combination does not match",
          "Login Error")
        }
      )

    }


    render() {
        return (
            <div className="LoginForm">
                <div className="form-container">
                  <form>
                    <div className="form-group">
                      <label for="exampleInputEmail1" className="text-style">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.onEmailChange}/>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.onPasswordChange}/>
                    </div>
                      <Button color="default" className="MuiButton-root-1 button-style confirm-button" onClick={this.handleLoginRequest}>
                      Login
                    </Button>
                  </form>
                </div>
                <NotificationContainer />
            </div>
        )
    }
    
    
}

export default LoginForm;
