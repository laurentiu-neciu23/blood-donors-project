import React, { Component } from 'react';
import './Main.css'
import {Button} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import UserProfile from './UserProfile';
import Summary from './Summary';
import NewDonation from './NewDonation';
import Donations from './Donations';
import Analyses from './Analyses';
import Axios from 'axios'


class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
        toShow: "summary"
      };
      this.request = this.request.bind(this)
    }

    componentWillMount() {
        if(localStorage.getItem('Authorization') == null) {
            window.location.reload()
        }
    }

    request() {
        let baseUrl = "http://localhost:8080"
        let endPoint = "/profiles/me"
        let headers = {
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
    
        Axios.get(baseUrl + endPoint, headers)
        .then((response) => {
            this.setState(response.data)
            console.log(this.state)
        })
        .catch((error) =>
        {
            console.log(error)
        })
    }

    componentDidMount() {
        NotificationManager.success("Success", "You have successfully logged in!");
        this.request()
    }

    handleShow = (_toShow) => {
        this.setState({toShow: _toShow});
    }

    renderPage = () => {
        let myComp = null;
        if(this.state.toShow == "summary"){
            myComp = <Summary/>
        }
        else if(this.state.toShow == "profile") {
            myComp = <UserProfile firstName={this.state.firstName} 
                                  lastName={this.state.lastName}
                                  birthDate={this.state.birthDate}
                                  county={this.state.county}
                                  city={this.state.city}
                                  address={this.state.address}
                                  postalCode={this.state.postalCode}
                                  bloodType={this.state.bloodType}
                                  lastDonationDate={this.state.lastDonationDate}
                                  id={this.state.id}
                                  request={this.request}/>
        }
        else if(this.state.toShow == "analyses") {
            myComp = <Analyses/>
        }
        else if(this.state.toShow == "donations") {
            myComp = <Donations/>
        }
        else if(this.state.toShow == "new-donation") {
            myComp = <NewDonation/>
        }
        return (
            <div> 
                {myComp}
            </div>
        )
    }   

    render() {
        return (
            <div className="Main">
                
                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                    <div className="row-flex pannel">
                        <div className="lds-heart-container">
                            <div className="lds-heart">
                                <div>
                                </div>
                            </div>
                        </div>
                        <div className="button-flex">
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("summary")}>
                                Dashboard
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("profile")}>
                                Profile
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("analyses")}>
                                Analyses
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("donations")}>
                                Donations
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("new-donation")}>
                                Eligibility Test
                            </Button>
                        </div>
                    </div>
                    
                </CSSTransition>
                {this.renderPage()}
                <NotificationContainer />
            </div>

        )
    }
}



export default Main;
