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
      <div class="row">
      <div class="col-6 col-md-4"></div>

        <div class="col-6 col-md-4">
        <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
         </form></div>
         <div class="col-6 col-md-4"></div>

      </div>
      </div>


    );
  }
}

export default App;
