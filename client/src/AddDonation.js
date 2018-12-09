import React, { Component } from 'react'
import './AddDonation.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NotificationManager, NotificationContainer} from "react-notifications";


class AddDonation extends Component {
    state = {
        bloodtype: null,
        donor: null,
        recipient: null,
        hospital: null,
        donation_date: new Date()
    }

    handleBoy = (date) => {
        this.setState({
            donation_date: date
        })
}

    handleBloodChange = (e) => {
        this.setState({
            bloodtype: e.target.innerText});
    }

    handleRecipientChange = (e) => {
        this.setState({
            recipient: e.target.value});
    }

    handleDonorChange = (e) => {
        this.setState({
            donor: e.target.innerText});
    }

    handleHospitalChange = (e) => {
        this.setState({
            hospital: e.target.innerText});
    }

    checkAndSend = () => {
        if( this.state.bloodtype == null || this.state.donor== null || this.state.recipient == null || this.state.hospital == null){
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
            recipient: null});
        document.getElementById("DonorInput").value="";
        document.getElementById("RecipientInput").value="";
        document.getElementById("HospitalInput").value="";
    }

    render(){
        return(
            <div class="container bg-light donation">
                <h3>Add Donation</h3>
                <hr></hr>
                <h5>Please fill in the form with the required information, then submit.</h5>
                <hr></hr>
                <div className="form-group flex">
                    <label><strong>Donor's Full Name*</strong></label>
                    <div class="form-group flex"> 
                        <input type="text" class="form-control" id="DonorInput" placeholder="Donor Full Name" onChange={this.handleDonorChange}/>
                    </div>
                </div>
                <div className="form-group flex">
                    <label><strong>Recipient's Full Name*</strong></label>
                    <div class="form-group flex"> 
                        <input type="text" class="form-control" id="RecipientInput" placeholder="Receiver Full Name" onChange={this.handleRecipientChange}/>
                    </div>
                </div>
                <div className="form-group flex">
                    <label><strong>Hospital Name*</strong></label>
                    <div class="form-group flex"> 
                        <input type="text" class="form-control" id="HospitalInput" placeholder="Hospital Name" onChange={this.handleHospitalChange}/>
                    </div>
                </div>
                <div className="form-group flex">
                    <label><strong>Donation Date*</strong></label>
                    <DatePicker
                            selected={this.state.donation_date}
                            onChange={this.handleBoy}
                            className="form-control"
                    />
                </div>
                <form class="form-group flex">
                    <label for="dropdownBloodType" class="mytext"><strong>Blood Type Donated*</strong></label>
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
                <p></p>
                <hr></hr>
                <button type="button" class="btn btn-info mb-4" onClick={this.checkAndSend}>Submit</button>
                <NotificationContainer />
            </div>
        )
    }
}
export default AddDonation;