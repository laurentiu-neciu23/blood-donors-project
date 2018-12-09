import React, { Component } from 'react'
import './MakeRequest.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NotificationManager, NotificationContainer} from "react-notifications";


class MakeRequest extends Component {
    state = {
        bloodtype: null,
        urgency: null,
        recipient: null,
        comment: null
    }

    handleBloodChange = (e) => {
        this.setState({
            bloodtype: e.target.innerText});
    }

    handleRecipientChange = (e) => {
        this.setState({
            recipient: e.target.value});
    }

    handleUrgChange = (e) => {
        this.setState({
            urgency: Number(e.target.innerText)});
    }

    handleComChange = (e) => {
        this.setState({
            comment: Number(e.target.value)});
        console.log(e.target.value);
    }

    checkAndSend = () => {
        if( this.state.bloodtype == null || this.state.urgency== null || this.state.recipient == null){
            NotificationManager.error("Error", "Please fill in all * fields!");
        } else {
            //TO DO: SEND THIS STATE TO BE SOMEHOW IDK FAM
           
            NotificationManager.success("Sent!", "Your request has been submitted!");
            this.clearState();
            //notification message and clearing the form
        }
    }

    clearState = () =>{
        this.setState({bloodtype: null,
            urgency: null,
            recipient: null,
            comment: null});
        document.getElementById("NameInput").value="";
        document.getElementById("ComInput").value="";
    }

    render(){
        return(
            <div class="container bg-light make-req">
                <h3>New Blood Request</h3>
                <hr></hr>
                <h5>Please fill in the form with the required information, then submit.</h5>
                <hr></hr>
                <div className="form-group flex">
                    <label><strong>Recipient's Full Name*</strong></label>
                    <div class="form-group flex"> 
                        <input type="text" class="form-control" id="NameInput" placeholder="Recipient Full Name" onChange={this.handleRecipientChange}/>
                    </div>
                </div>
                <form class="form-group flex">
                    <label for="dropdownBloodType" class="mytext"><strong>Blood Type Needed*</strong></label>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownBloodType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.bloodtype} 
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownBloodType">
                            <a class="dropdown-item" href="#" onClick={this.handleBloodChange}>A</a>
                            <a class="dropdown-item" href="#" onClick={this.handleBloodChange}>B</a>
                            <a class="dropdown-item" href="#" onClick={this.handleBloodChange}>AB</a>
                            <a class="dropdown-item" href="#" onClick={this.handleBloodChange}>O</a>
                        </div>
                    </div>
                </form>
                <form class="form-group flex">
                    <label for="dropdownUrgency" class="mytext"><strong>Level of Urgency*</strong></label>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownUrgency" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.urgency} 
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownUrgency">
                            <a class="dropdown-item" href="#" onClick={this.handleUrgChange}>1</a>
                            <a class="dropdown-item" href="#" onClick={this.handleUrgChange}>2</a>
                            <a class="dropdown-item" href="#" onClick={this.handleUrgChange}>3</a>
                            <a class="dropdown-item" href="#" onClick={this.handleUrgChange}>4</a>
                        </div>
                    </div>
                </form>
                <div class="form-group">
                            <label for="ComInput">Additional Comments</label>
                            <textarea type="text" class="form-control" id="ComInput" placeholder="Any special requests, details or info goes here" onChange={this.handleComChange}></textarea>
                </div>
                <p></p>
                <hr></hr>
                <button type="button" class="btn btn-info" onClick={this.checkAndSend}>Submit</button>
                <NotificationContainer />
            </div>
        )
    }
}

export default MakeRequest;