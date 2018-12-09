import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Main from './Main'
import UserProfile from './UserProfile'
import Summary from './Summary'
import Donations from './Donations'
import Analyses from './Analyses'
import NewDonation from './NewDonation'
import DoctorDashboard from './DoctorDashboard'
import StaffDashboard from './StaffDashboard'


ReactDOM.render((
    <BrowserRouter>
      <div>
          <Route exact={true} path="/" 
            render={(props)=>{
            if(localStorage.getItem("Authorization") != null ) return <Main/>;
            else return <App/>;
          }} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/summary" component={Summary} />
          <Route exact path="/new-donation" component={NewDonation} />
          <Route exact path="/donations" component={Donations} />
          <Route exact path="/analyses" component={Analyses} />
          <Route exact path="/doctor" component={DoctorDashboard} />
          <Route exact path="/staffDashboard" component={StaffDashboard} />
          <Route exact path="/dashboard" component={Main} />
	</div>

    </BrowserRouter>
  ), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
