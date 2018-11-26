import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <div className="account-flex account-position">
          <div className="account-selection-flex account-selection-position">
            <Button color="default" className="MuiButton-root-1 button-style selection-button selection-button-left">
              Login
            </Button>

            <Button color="default" className="MuiButton-root-1 button-style selection-button selection-button-right">
              Register
            </Button>
          </div>
          <div className="login-container">
            <div className="form-container">
              <form>
                <div className="form-group">
                  <label for="exampleInputEmail1" className="text-style">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                  <Button color="default" className="MuiButton-root-1 button-style confirm-button">
                  Login
                </Button>
              </form>
            </div>
          </div>

          <div className="login-container">
            <div className="form-container">
              <Typography>
                Also you can sign up with:
              </Typography>

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
            Lorem Ipsum este pur şi simplu o machetă pentru text a industriei tipografice. Lorem Ipsum a fost macheta standard a industriei încă din secolul al XVI-lea, când un tipograf anonim a luat o planşetă de litere şi le-a amestecat pentru a crea o carte demonstrativă pentru literele respective. Nu doar că a supravieţuit timp de cinci secole, dar şi a facut saltul în tipografia electronică practic neschimbată. A fost popularizată în anii '60 odată cu ieşirea colilor Letraset care conţineau pasaje Lorem Ipsum, iar mai recent, prin programele de publicare pentru calculator, ca Aldus PageMaker care includeau versiuni de Lorem Ipsum.
            </Typography>

          </div>

        </div>

    );
  }
}

export default App;
