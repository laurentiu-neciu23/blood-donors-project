import React, { Component } from 'react';
import './DoctorDashboard.css'
import {Button} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import MakeRequest from './MakeRequest'


class DoctorDashboard extends Component {

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
            myComp = <div/>
        }
        else if(this.state.toShow == "make-request") {
            myComp = <MakeRequest/>
        }
        else if(this.state.toShow == "analyses") {
            myComp = <div/>
        }
        else if(this.state.toShow == "donations") {
            myComp = <div/>
        }
        else if(this.state.toShow == "new-donation") {
            myComp = <div/>
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
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("requests")}>
                                Blood Requests
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("make-request")}>
                                File a request
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button" onClick={() => this.handleShow("analyses")}>
                                Profile
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



export default DoctorDashboard;
