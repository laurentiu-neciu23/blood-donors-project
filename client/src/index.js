import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from './Main'
import UserProfile from './UserProfile'
import Summary from './Summary'
import Donations from './Donations'


ReactDOM.render((
    <BrowserRouter>
      <div>
          <Route exact path="/" component={App} />
          <Route exact path="/dashboard" component={Main} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/summary" component={Summary} />
          <Route exact path="/donations" component={Donations} />
          <Route exact path="/analyses" component={Analyses} />
	  <Route exact path="/" render={() => (
              localStorage.getItem("Authorization") != null ? (
                <Redirect to="/dashboard"/>
              ) : (
                <App/>
              )
            )}/>       
    </div>

    </BrowserRouter>
  ), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
