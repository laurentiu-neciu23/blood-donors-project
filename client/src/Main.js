import React, { Component } from 'react';
import { NotificationManager, NotificationContainer} from "react-notifications";
import { CSSTransition } from "react-transition-group";

import 'react-notifications/lib/notifications.css';
import './Main.css'


class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
        numeleMeu: "Despacito"
      };
    }

    componentDidMount() {
        NotificationManager.success("Success", "You have successfully logged in");
    }

    render() {
        return (

            <div className="Main">
            <CSSTransition in={true} appear={true} classNames="fade" timeout={1000}>
            
                <div className="dashboard">
                    Fuck you
                </div>
            </CSSTransition>
                <NotificationContainer />
            </div>

        )
    }

}



export default Main;