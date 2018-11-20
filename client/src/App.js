import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numeleMeu: "Despacito"
    };
    this.changeNameToSomeOtherName = this.changeNameToSomeOtherName.bind(this)
    this.changeMyName = this.changeMyName.bind(this)
  }


  changeNameToSomeOtherName() {
    this.setState(state => ({
      numeleMeu: "Ana"
    }));
  }

  changeMyName(event) {

    var value = event.target.value

    this.setState(state => ({
      numeleMeu: value
    }))
  }

  render() {
    return (
      <div className="App">
        <div className="text-box">
        <Typography variant="h5" component="h3">
          Welcome to Blood Donor Project.
        </Typography>
        <Typography component="p">
          This is a project in which you can donate blood and do some rad shit dude or dudette. <br/>
          Doing this, you will save people and increase your morality also you <br/>
          get some RATB benefits.
        </Typography>
        <Button variant="contained" size="medium" color="default">
          Register a direct account.
        </Button>
        <Button variant="contained" size="medium" color="primary">
          Register an account with Facebook.
        </Button>
        <Button variant="contained" size="medium" color="secondary">
          Register an account with Google.
        </Button>
        </div>
        <div className="left-box">
        <div className="spinner-container">
          <span className="spinner"></span>
        </div>

        <div className="jumbotron">
          <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              </div>
              <div className="button-container">
                <Button variant="contained" size="small" color="default" >
                  Login
              </Button>
              <Button variant="contained" size="small" color="primary" >
                  Facebook
              </Button>
              <Button variant="contained" size="small" color="secondary">
                  Google
              </Button>
             </div>
          </form></div>
        </div>

      </div>


    );
  }
}

export default App;
