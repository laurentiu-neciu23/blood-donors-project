import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import * as CryptoJS from 'crypto-js';
import  Base64URL from 'base64url';
import Axios from 'axios';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: "login"
    };

    this.onClickLogin = this.onClickLogin.bind(this)
    this.onClickRegister = this.onClickRegister.bind(this)
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  }

  componentDidMount() {

    var search = window.location.search
    if(search === "") return

    var dataHash = search.replace('?' , '')
          .split('&')
          .reduce((map, obj) => {
            var split = obj.split('+').join("").split('=')
            if (split.length === 2) {
              map[split[0]] = split[1]; 
              return map 
            } 
            return map
          }, {})

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // Check if request was not forged       
    if(dataHash["state"] === localStorage.getItem("facebookSessionState")) {
      localStorage.removeItem("facebookSessionState")
      var loginEndpoint = "http://localhost:8080/login/facebook"
      console.log("Entering the things")
      Axios.post(loginEndpoint, dataHash, config)
           .then(function (response) {
              localStorage.setItem("Authorization", response.headers.authorization);
              window.location.reload();
            })
           .catch((error) => console.log(error))

    }
  }

  handleFacebookLogin() {
    console.log("Connecting to facebook api")


    var state = CryptoJS.lib.WordArray.random(32)
    localStorage.setItem("facebookSessionState", state);

    // DO NOT COMMIT
    var appId = "292470231378324"
    var redirectUri = "http://localhost:3000/"

    var facebookAccessPoint = `https://www.facebook.com/v3.2/dialog/oauth?\
                  client_id=${appId}\
                  &redirect_uri=${redirectUri}\
                  &state=${state}
                  &scope=email,public_profile`

    
    window.location.replace(facebookAccessPoint);
  }

  onClickRegister() {
    this.setState(
      {
        visible: "register"
      }
    )
  }

  onClickLogin() {
    this.setState(
      {
        visible: "login"
      }
    )
  }

  render() {
    let form;

    if(this.state.visible === "login") {
      form = <LoginForm/>
    }else{
      form = <RegistrationForm/>
    }

    return (
      <div className="App">
      <br></br>
      <strong><h2 class = "app-title">Blood Donors App</h2></strong>
        <div className="account-flex account-position">
          <div className="account-selection-flex account-selection-position">
            <Button color="default" className="MuiButton-root-1 button-style selection-button selection-button-left" onClick={this.onClickLogin}>
              Login
            </Button>

            <Button color="default" className="MuiButton-root-1 button-style selection-button selection-button-right" onClick={this.onClickRegister}>
              Register
            </Button>
          </div>
          <div className="login-container">
            {form}
          </div>

          <div className="login-container">
            <div className="form-container">
              <Typography>
                Also you can sign up with:
              </Typography>
              <div className="foreign-login-button-pannel">
                <Button color="default" className="MuiButton-root-1 button-style confirm-button foreign-login-button-style">
                  Google
                </Button>
                <Button color="default" className="MuiButton-root-1 button-style confirm-button foreign-login-button-style" onClick={this.handleFacebookLogin}>
                  Facebook
                </Button>
              </div>
              <div className="foreign-button-flex foreign-button-position">

              </div>
            </div>

          </div>

        </div>

        <div className="description-position">
            <div className="spinner-container">
              <div className="spinner">
      
              </div>
            </div>

            <Typography className="presentation-text">
           <h5 class = "mt-5">Welcome to Blood Donors Project!</h5>

            <p class = "fs-20 my-5">Once registered, take a test to see whether you are eligible to make a blood donation. 
            This app allows you to schedule your next blood donation appointment.
            You can also see your blood test results and the status of your donations online!
            Medics and Medical Staff from all around the country are also here to help you.</p>

           <h5> Be our hero. Save a life now! </h5>
            </Typography>

          </div>

        <NotificationContainer/>

        </div>

    );
  }
}

export default App;
