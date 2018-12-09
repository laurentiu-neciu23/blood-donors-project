import React, { Component } from 'react';
import './StaffDashboard.css'
import {Button} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import AddDonation from './AddDonation';
import ManageDonations from './ManageDonations'
import UserProfile from './UserProfile';
import Summary from './Summary';
import NewDonation from './NewDonation';
import Donations from './Donations';
import Analyses from './Analyses';


class StaffDashboard extends Component {

    constructor(props) {
      super(props);
      this.state = {
        numeleMeu: "Despacito",
        toShow: "summary"
      };
    }

    componentDidMount() {
        NotificationManager.success("Success", "You have successfully logged in!");
    }

    handleShow = (_toShow) => {
        this.setState({toShow: _toShow});
    }

    renderPage = () => {
        let myComp = null;
        if(this.state.toShow == "summary"){
            myComp = <Summary/>
        }
        else if(this.state.toShow == "make-request") {
            myComp = <AddDonation/>
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
        else if(this.state.toShow == "staff-profile") {
            myComp = <UserProfile/>
        }
        else if(this.state.toShow == "manage-donations") {
            myComp = <ManageDonations/>
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
                        <div className="lds-heart-container1">
                            <div className="lds-heart1">
                                <div>
                                </div>
                            </div>
                        </div>
                        <div className="button-flex">
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("summary")}>
                                Summary
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("staff-profile")}>
                                Staff Profile
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("analyses")}>
                                Analyses
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("donations")}>
                                Donations
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("new-donation")}>
                                Eligibility
                            </Button>
                            <hr/>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("manage-donations")}>
                                Manage Donations
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("make-request")}>
                                Add Donation Info
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



export default StaffDashboard;