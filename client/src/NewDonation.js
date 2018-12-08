import React, { Component } from 'react'
import './NewDonation.css'
var Modal = require('react-bootstrap-modal');


const questions = [
    {text: "1. Are you under 18 years old or older than 60 years old?"},
    {text: "2. Do you currently weigh more than 50kg?"},
    {text: "3. Is your pulse out of 60 - 100 heartbeat/min range?"},
    {text: "4. Did you take any surgery in the last 6 months?"},
    {text: "5. Have you ever had any of these diseases: hepatitis B, hepatitis C, HIV, syphilis or any type of cancer?"},
    {text: "6. Have you received a blood transfusion (except with your own blood) in the past 12 months?"},
    {text: "7. Have you ever used injectable drugs, including anabolic steroids, unless prescribed by a physician?"},
    {text: "8. Have you ever used intravenous illegal drugs, even once?"},
    {text: "9. Have you traveled in the past year, or lived in the past three years, in an area where malaria is endemic?"}
];

class NewDonation extends Component {
    constructor(props) {
		super(props);
		this.state = {
            show: false,
            text: "placeholder"
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
      
    handleEligibility() {
        if (document.getElementById('yesLabel').checked) {
            this.state.text = "You can't donate blood."
        } else {
            this.state.text = "You can donate blood."
        }
    }

    render() {
        return (
        <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <h4 class="col-sm">Eligibility Result</h4>
                    <p class="col-sm"><strong>{this.state.text}</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <button class="btn btn-primary" onClick={this.handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
                <div class = "container">
                    <div class = "row">
                        <div class = "col-2"></div>
                        <div class = "bg-light col-8">
                            <h3 class = "fs-25 mb-5"> Can I be a Blood Donor?</h3>
                            <p class = "fs-15 mb-2">Most people can give blood but sometimes it is not possible to be a blood donor. Please answer all of the following questions so that we can advise if blood donation is appropriate for you. Your responses are not recorded in any way.</p>
                            <div class = "questions col-12 bg-questions">
                                    {questions.map(question => (
                                         <div class = "mb-4 mt-4 p-2 bg-qst">
                                            {Object.values(question).map((questionText) =>
                                             <div class = "mb-4 mt-4 p-2 bg-qst">
                                                <strong class = "fs-18 bold">{questionText}</strong>
                                                <br></br>
                                                <label class="radio-inline fs-18 mt-2"><input type="radio" id = "yesLabel" name={"optradio" + questionText.substr(0,1) }/>Yes</label>
                                                <label class="radio-inline fs-18 mt-2"><input type="radio" id = "noLabel" name={"optradio" + questionText.substr(0,1) }/>No</label>
                                                </div>
                                            )}
                                         </div>
                                    ))}
                            </div>
                            <button type="button" class="btn btn-info donation-btn" onClick={() => this.handleEligibility()}>Check your eligibility</button>
                        </div>
                        <div class = "col-2"></div>
                    </div>
                </div>
                </div>
        );
    }
}

export default NewDonation;