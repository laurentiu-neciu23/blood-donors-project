import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
            <button type="submit" className="btn btn-primary">Submit</button>
         </form></div>

      </div>


    );
  }
}

export default App;
