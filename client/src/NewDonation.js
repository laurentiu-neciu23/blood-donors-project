import React, { Component } from 'react'
import './NewDonation.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NotificationManager, NotificationContainer} from "react-notifications";
var Modal = require('react-bootstrap-modal');


const questions = [
    {id:1, text: "1. Are you under 18 years old or older than 60 years old?"},
    {id:2, text: "2. Do you currently weigh less than 50kg?"},
    {id:3, text: "3. Is your pulse out of 60 - 100 heartbeat/min range?"},
    {id:4, text: "4. Did you take any surgery in the last 6 months?"},
    {id:5, text: "5. Have you ever had any of these diseases: hepatitis B, hepatitis C, HIV, syphilis or any type of cancer?"},
    {id:6, text: "6. Have you received a blood transfusion (except with your own blood) in the past 12 months?"},
    {id:7, text: "7. Have you ever used injectable drugs, including anabolic steroids, unless prescribed by a physician?"},
    {id:8, text: "8. Have you ever used intravenous illegal drugs, even once?"},
    {id:9, text: "9. Have you traveled in the past year, or lived in the past three years, in an area where malaria is endemic?"}
];

class NewDonation extends Component {
    constructor(props) {
		super(props);
		this.state = {
            show: false,
            text: "placeholder",
            goToForm: false,
            showQuestions: true,
            bloodtype: null,
            donor: null,
            recipient: null,
            hospital: null,
            donation_date: new Date()
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

    handleShow(row) {
		console.log("pressed ");
		this.setState({
            show: true
		});
	  }

	handleClose() {
		this.setState({ show: false });
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

    handleDonorChange = (e) => {
        this.setState({
            donor: e.target.innerText});
    }

    handleHospitalChange = (e) => {
        this.setState({
            hospital: e.target.innerText});
    }

    checkAndSend = () => {
        if( this.state.bloodtype == null || this.state.donor== null || this.state.hospital == null){
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
    }

      
    handleEligibility() {
        var ok = false;
        var i;
        for (i = 1; i <= 9; i++) { 
            if (document.getElementById("yesLabel"+i).checked) {
                ok = true;
                break;
            }
        }
        if(ok == true){
            this.setState({
                    show: true,
                    text: "Sorry! You can't donate blood.",
                    goToForm: false,
                    showQuestions: true
                });
        } else {
            this.setState({
                show: false,
                goToForm: true,
                showQuestions: false
            })
        }
    }

    renderForm() {
        let myComp = null;

        if (this.state.goToForm && !this.state.showQuestions) {
            myComp = <div class="container bg-light new-donation-form">
            <h3>Plan a Donation</h3>
            <hr></hr>
            <h5>Please fill in the form with the required information, then submit.</h5>
            <h5>You will be able to choose a hospital where to donate and the date of your donation.</h5>
            <hr></hr>
            <div className="form-group flex">
                <label><strong>Donor's Full Name*</strong></label>
                <div class="form-group flex"> 
                    <input type="text" class="form-control" id="DonorInput" placeholder="Donor Full Name" onChange={this.handleDonorChange}/>
                </div>
            </div>
            <form class="form-group flex">
                <label for="dropdownBloodType" class="mytext"><strong>Choose a Hospital*</strong></label>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownHospitalType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.hospital} 
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownHospitalType">
                        <a class="dropdown-item" href="#" onClick={this.handleHospitalChange}>Hospital 1</a>
                        <a class="dropdown-item" href="#" onClick={this.handleHospitalChange}>Hospital 2</a>
                        <a class="dropdown-item" href="#" onClick={this.handleHospitalChange}>Hospital 3</a>
                        <a class="dropdown-item" href="#" onClick={this.handleHospitalChange}>Hospital 4</a>
                    </div>
                </div>
            </form>
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
            <button type="button" class="btn btn-info mb-5" onClick={this.checkAndSend}>Submit</button>
        </div>
        } else if (this.state.showQuestions) {
            myComp =  <div class = "container">
            <div class = "row">
                <div class = "col-2"></div>
                <div class = "bg-light col-8">
                    <h3 class = "fs-25 mb-5"> Can I be a Blood Donor?</h3>
                    <p class = "fs-15 mb-2">Most people can give blood but sometimes it is not possible to be a blood donor. Please answer all of the following questions so that we can advise if blood donation is appropriate for you. Your responses are not recorded in any way.</p>
                    <div class = "questions col-12 bg-questions">
                                 <div class = "mb-4 mt-4 p-2 bg-qst">
                                    {questions.map(touple =>
                                     <div class = "mb-4 mt-4 p-2 bg-qst">
                                        <strong class = "fs-18 bold">{touple.text}</strong>
                                        <br></br>
                                        <label class="radio-inline fs-18 mt-2"><input type="radio" id = {"yesLabel"+touple.id} name={"optradio" + touple.text.substr(0,1) }/>Yes</label>
                                        <label class="radio-inline fs-18 mt-2"><input type="radio" id = {"noLabel"+touple.id} name={"optradio" + touple.text.substr(0,1) }/>No</label>
                                        </div>
                                    )}
                                 </div>
                    </div>
                    <button type="button" class="btn btn-info donation-btn" onClick={() => this.handleEligibility()}>Check your eligibility</button>
                </div>
                <div class = "col-2"></div>
            </div>
        </div>
        }

        return(
            <div>
                {myComp}
            </div>
        )
    }

    render() {
        const popup = (this.state.show ?  <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <h4 class="col-sm">Eligibility Result</h4>
                <p class="col-sm"><strong>{this.state.text}</strong></p>
            </Modal.Body>
            <Modal.Footer>
                <button class="btn btn-primary" onClick={this.handleClose}>Close</button>
            </Modal.Footer>
        </Modal> : null);
        return (
            <div>
                {popup}
                {this.renderForm()}
            </div>
        );
    }
}

export default NewDonation;