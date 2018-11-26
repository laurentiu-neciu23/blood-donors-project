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


class LoginForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
          email: "Your email",
          password: "Your password"
        };
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
    }

    onEmailChange(event) {
      console.log(event.target.value)
      var email = event.target.value
      this.setState(
        {
          email: email
        }
      )

    }

    onPasswordChange(event) {
      console.log(event.target.value)
      var password = event.target.value
      this.setState(
        {
          password: password
        }
      )
    }

    onClick() {
      NotificationManager.error('The username or password combination is invalid.', 'Invalid Login');
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
                      <Button color="default" className="MuiButton-root-1 button-style confirm-button" onClick={this.onClick}>
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
