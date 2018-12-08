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


class Main extends Component {

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
        else if(this.state.toShow == "profile") {
            myComp = <UserProfile/>
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
