import React, { Component } from 'react';
import './Main.css'
import {Button} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';

class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
        numeleMeu: "Despacito"
      };
    }

    componentDidMount() {
        NotificationManager.success("Success", "You have successfully logged in!");
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
                            <Button color='default' className="Multibutton-root-1 button">
                                Dashboard
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button">
                                Profile
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button">
                                Analysis
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button">
                                Donations
                            </Button>
                            <Button color='default' className="Multibutton-root-1 button">
                                New Donation
                            </Button>
                        </div>
                    </div>

                </CSSTransition>
                <NotificationContainer />
            </div>

        )
    }
}



export default Main;
