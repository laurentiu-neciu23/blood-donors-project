import React, { Component } from 'react'
import './DoctorProfile.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Hospitals = ["Amara", "Judetean Targoviste", "Arsi"];

class DoctorProfile extends Component {

    
    
    state = {
        name: 'Name',
        surname: 'Surname',
        birthday: null,
        bloodtype: 'N/A',
        address: '1234 Main St',
        city: 'Adunatii Copaceni',
        county: 'Teleorman',
        zip: '1234',
        birth_date: new Date(),
        hospital: null
      }

      handleBoy = (date) => {
        this.setState({
            birth_date: date
        })
    }

    handleNameChange = () => {
        this.setState({
            name: document.getElementById("NameInput").value,
            surname: document.getElementById("SurnameInput").value
        })
        this.toggleEditName();
    }

    handleBloodChange = (e) => {
        this.setState({
            bloodtype: e.target.innerText});
    }

    handleHospitalChange = (e) => {
        this.setState({hospital: e.target.innerText});
    }

    toggleEditName = () =>{
        console.log("got here tho")
        this.setState({editingName: !this.state.editingName});
    }

    toggleEditAddress = () =>{
        console.log("got here tho")
        this.setState({editingAddress: !this.state.editingAddress});
    }

    saveEditsInfo = () => {
        this.setState({
            address: document.getElementById("inputAddress").value,
            city: document.getElementById("inputCity").value,
            county: document.getElementById("inputCounty").value,
            zip: document.getElementById("inputZip").value
        })
        this.toggleEditAddress();
    }
    
    renderNameForm(){
        let myForm = null;
        if(!this.state.editingName) {
            myForm = <div class="row"  id='NonEditableText'>
            <form class="form-inline">
                
                <label for="formGroupExampleInput" class="mytext"><strong>Name  </strong></label>
                <div class="form-group"> 
                    <div type="text" class="form-control-plaintext" id="formGroupExampleInput">{this.state.name}</div>
                </div>
                
                <label for="formGroupExampleInput2" class="mytext"><strong>Surname  </strong></label>
                <div class="form-group">
                    <div type="text" class="form-control-plaintext" id="formGroupExampleInput2">{this.state.surname}</div>
                </div>
                <button type="button" class="btn btn-link" onClick={this.toggleEditName}>Edit</button>
            </form>
        </div>
        } else {
            myForm = <div class="row"  id='EditableText'>
            <form class="form-inline">
                
                <label for="NameInput" class="mytext"><strong>Name  </strong></label>
                <div class="form-group"> 
                    <input type="text" class="form-control" id="NameInput" defaultValue={this.state.name}/>
                </div>
                
                <label for="SurnameInput" class="mytext"><strong>Surname  </strong></label>
                <div class="form-group">
                    <input type="text" class="form-control" id="SurnameInput" defaultValue={this.state.surname}/>
                </div>
                <button type="button" class="btn close" aria-label="Close" onClick={this.toggleEditName}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <button type="button" class="btn btn-primary" onClick={this.handleNameChange}>OK</button>
            </form>
        </div>
        }
        return(
            <div> 
            {myForm}
            </div>
        )
    }

    renderAdddressForm = () => {
        let myForm = null;
        if(this.state.editingAddress) {
            myForm = <div>
                <form class="form-inline row mt-3">
                    <h5 class>Personal Information</h5>
                    <button type="button" class="btn close" id="infoCloseBtn" aria-label="Close" onClick={this.toggleEditAddress}>
                            <span aria-hidden="true">&times;</span>
                    </button>
                    <button type="button" class="btn btn-link" id="infoSaveBtn" onClick={this.saveEditsInfo}>Save</button>
                </form>
                <form id='EditableInfo'>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="inputAddress">Address</label>
                            <textarea type="text" class="form-control" id="inputAddress" defaultValue={this.state.address}></textarea>
                        </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" class="form-control" id="inputCity" defaultValue={this.state.city}></input>
                        </div>
                        
                        <div class="form-group col-md-4">
                            <label for="inputCounty">County</label>
                            <input type="text" class="form-control" id="inputCounty" defaultValue={this.state.county}></input>
                        </div>
                        
                        <div class="form-group col-md-4">
                            <label for="inputZip">Postal Code</label>
                            <input type="text" class="form-control" id="inputZip" defaultValue={this.state.zip}></input>
                        </div>
                    </div>   
                </div>
            </form>
    </div>
        } else {
            myForm = <div>
                <form class="form-inline row mt-3">
                    <h5 class>Personal Information</h5>
                    <button type="button" class="btn btn-link" id="infoEditBtn" onClick={this.toggleEditAddress}>Edit</button>
                </form>
                <form id='NonEditableInfo'>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="inputAddress">Address</label>
                            <div type="text" class="form-control" placeholder="1234 Main St">{this.state.address}</div>
                        </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <div type="text" class="form-control">{this.state.city}</div>
                        </div>
                        
                        <div class="form-group col-md-4">
                            <label for="inputCounty">County</label>
                            <div type="text" class="form-control">{this.state.county}</div>
                        </div>
                        
                        <div class="form-group">
                            <label for="inputZip">Postal Code</label>
                            <div type="text" class="form-control">{this.state.zip}</div>
                        </div>
                    </div>   
                </div>
            </form>
            </div>
        }
        return (
            <div class="row">
                {myForm}
            </div>
        )
    }

    render(){
        return(
            <div class="container bg-light">
                <h3>Dr. {this.state.surname}'s Profile</h3>
                <hr></hr>
                {this.renderNameForm()}
                <hr></hr>
                <div className="form-group flex">
                    <label><strong>Birth Date</strong></label>
                    <DatePicker
                            selected={this.state.birth_date}
                            onChange={this.handleBoy}
                            className="form-control"
                    />
                </div>
                <hr></hr>

                <form class="form-group flex">
                    <label for="dropdownHospital" class="mytext"><strong>Hospital</strong></label>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownHospital" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.hospital} 
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownBloodType">
                        {Hospitals.map( hospital =>
                            <a class="dropdown-item" href="#" onClick={this.handleHospitalChange}>{hospital}</a>
                        )}
                        </div>
                    </div>
                </form>

                <hr></hr>
                <form class="form-group flex">
                    <label for="dropdownBloodType" class="mytext"><strong>Blood Type </strong></label>
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
                {this.renderAdddressForm()}
            </div>

        )
    }
}

export default DoctorProfile;