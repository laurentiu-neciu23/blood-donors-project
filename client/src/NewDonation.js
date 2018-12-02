import React, { Component } from 'react'
import './NewDonation.css'

const questions = [
    {text: "1. Are you 18 - 60 years old?"},
    {text: "2. Do you currently weigh less than 50kg?"},
    {text: "3. Is your pulse between 60 - 100 heartbeat/min?"},
    {text: "4. Did you take any surgery in the last 6 mounths?"},
    {text: "4. Have you ever had any of these diseases: hepatitis B, hepatitis C, HIV, syphilis or any type of cancer?"},
    {text: "5. Have you received a blood transfusion (except with your own blood) in the past 12 months?"},
    {text: "6. Have you ever used injectable drugs, including anabolic steroids, unless prescribed by a physician?"},
    {text: "7. Have you ever used intravenous illegal drugs, even once?"},
    {text: "8. Have you traveled in the past year, or lived in the past three years, in an area where malaria is endemic?"}
];

class NewDonation extends Component {
    render() {
        return (
                <div class = "container">
                    <div class = "row">
                        <div class = "col-2"></div>
                        <div class = "bg-light col-8">
                            <h3 class = "fs-25 mb-5"> Can I be a Blood Donor?</h3>
                            <p class = "fs-15 mb-2">Most people can give blood but sometimes it is not possible to be a blood donor. Please answer all of the following questions so that we can advise if blood donation is appropriate for you. Your responses are not recorded in any way.</p>
                            <div class = "questions col-12 bg-questions">
                                    {questions.map(question => (
                                        <div class = "mb-4 mt-4 p-2 bg-qst">
                                            {Object.values(question).map(questionText =>
                                                <strong class = "fs-18 bold">{questionText}</strong>
                                            )}
                                            <br></br>
                                            <label class="radio-inline fs-18 mt-2"><input type="radio" name="optradio"/>Yes</label>
                                            <label class="radio-inline fs-18 mt-2"><input type="radio" name="optradio"/>No</label>
                                        </div>
                                    ))}
                            </div>
                            <button type="button" class="btn btn-info donation-btn">Check your eligibility</button>
                        </div>
                        <div class = "col-2"></div>
                    </div>
                </div>
        );
    }
}

export default NewDonation;