import React, { Component } from 'react'
import './UserProfile.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class UserProfile extends Component {

    state = {
        name: 'Name',
        surname: 'Surname',
        birthday: null,
        bloodtype: 'N/A',
        address: '1234 Main St',
        city: 'Adunatii Copaceni',
        county: 'Teleorman',
        zip: '1234',
        birth_date: new Date()
      }

      handleBoy = (date) => {
        this.setState({
            birth_date: date
        })
    }

    goEditModeName = () => {
      var noneditable = document.getElementById("NonEditableText");
      noneditable.classList.add("hidden");
      var editable = document.getElementById("EditableText");
      editable.classList.remove("hidden");
      document.getElementById("NameInput").value = this.state.name;
      document.getElementById("SurnameInput").value = this.state.surname;
    }

    exitEditModeName = () => {
        var noneditable = document.getElementById("NonEditableText");
        noneditable.classList.remove("hidden");
        var editable = document.getElementById("EditableText");
        editable.classList.add("hidden");
      }

    handleNameChange = () => {
        var noneditable = document.getElementById("NonEditableText");
        noneditable.classList.remove("hidden");
        var editable = document.getElementById("EditableText");
        this.setState({
            name: document.getElementById("NameInput").value,
            surname: document.getElementById("SurnameInput").value
        })
        editable.classList.add("hidden");
    }

    handleBloodChange = (e) => {
        this.setState({
            bloodtype: e.target.innerText});
    }

    goEditModeInfo = () =>{
        /*reveal editable form*/
        var editable = document.getElementById("EditableInfo");
        editable.classList.remove("hidden");
        /*Hide Edit button and reveal close and Save buttons*/
        var editbtn = document.getElementById("infoEditBtn");
        editbtn.classList.add("hidden");
        var closebtn = document.getElementById("infoCloseBtn");
        closebtn.classList.remove("hidden");
        var savebtn = document.getElementById("infoSaveBtn");
        savebtn.classList.remove("hidden");
        /*hide normal form */
        var noneditable = document.getElementById("NonEditableInfo");
        noneditable.classList.add("hidden");

        /*getting text from noneditable form*/
        document.getElementById("inputAddress").value = this.state.address;
        document.getElementById("inputCity").value= this.state.city;
        document.getElementById("inputCounty").value= this.state.county;
        document.getElementById("inputZip").value= this.state.zip;
    }

    exitEditModeInfo = () =>{
        /*reveal editable form*/
        var editable = document.getElementById("EditableInfo");
        editable.classList.add("hidden");
        /*Hide Edit button and reveal close and Save buttons*/
        var editbtn = document.getElementById("infoEditBtn");
        editbtn.classList.remove("hidden");
        var closebtn = document.getElementById("infoCloseBtn");
        closebtn.classList.add("hidden");
        var savebtn = document.getElementById("infoSaveBtn");
        savebtn.classList.add("hidden");
        /*hide normal form */
        var noneditable = document.getElementById("NonEditableInfo");
        noneditable.classList.remove("hidden");
    }

    saveEditsInfo = () => {
        this.setState({
            address: document.getElementById("inputAddress").value,
            city: document.getElementById("inputCity").value,
            county: document.getElementById("inputCounty").value,
            zip: document.getElementById("inputZip").value
        })
        this.exitEditModeInfo();
    }
    
    
    render(){
        return(
            <div class="container bg-light">
                <h3>{this.state.name}'s Profile</h3>
                <hr></hr>
                <div class="row"  id='NonEditableText'>
                    <form class="form-inline">
                        
                        <label for="formGroupExampleInput" class="mytext"><strong>Name  </strong></label>
                        <div class="form-group"> 
                            <div type="text" class="form-control-plaintext" id="formGroupExampleInput">{this.state.name}</div>
                        </div>
                        
                        <label for="formGroupExampleInput2" class="mytext"><strong>Surname  </strong></label>
                        <div class="form-group">
                            <div type="text" class="form-control-plaintext" id="formGroupExampleInput2">{this.state.surname}</div>
                        </div>
                        <button type="button" class="btn btn-link" onClick={this.goEditModeName}>Edit</button>
                    </form>
                </div>
                    
                <div class="row hidden"  id='EditableText'>
                    <form class="form-inline">
                        
                        <label for="NameInput" class="mytext"><strong>Name  </strong></label>
                        <div class="form-group"> 
                            <input type="text" class="form-control" id="NameInput"/>
                        </div>
                        
                        <label for="SurnameInput" class="mytext"><strong>Surname  </strong></label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="SurnameInput"/>
                        </div>
                        <button type="button" class="btn close" aria-label="Close" onClick={this.exitEditModeName}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <button type="button" class="btn btn-primary" onClick={this.handleNameChange}>OK</button>
                    </form>
                </div>
            
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
                <form class="form-inline">
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

                <form class="form-inline row mt-3">
                    <h6 class>Personal Information</h6>
                    <button type="button" class="btn btn-link" id="infoEditBtn" onClick={this.goEditModeInfo}>Edit</button>
                    <button type="button" class="btn btn-link hidden" id="infoSaveBtn" onClick={this.saveEditsInfo}>Save</button>
                    <button type="button" class="btn close hidden" id="infoCloseBtn" aria-label="Close" onClick={this.exitEditModeInfo}>
                            <span aria-hidden="true">&times;</span>
                    </button>
                </form>


                <form id='EditableInfo' class='hidden'>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="inputAddress">Address</label>
                            <textarea type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"></textarea>
                        </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" class="form-control" id="inputCity"></input>
                        </div>
                        
                        <div class="form-group col-md-4">
                            <label for="inputCounty">County</label>
                            <input type="text" class="form-control" id="inputCounty"></input>
                        </div>
                        
                        <div class="form-group col-md-4">
                            <label for="inputZip">Postal Code</label>
                            <input type="text" class="form-control" id="inputZip"></input>
                        </div>
                    </div>   
                </div>
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

        )
    }
}

export default UserProfile;