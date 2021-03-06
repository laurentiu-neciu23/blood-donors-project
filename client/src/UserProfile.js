import React, { Component } from 'react'
import './UserProfile.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class UserProfile extends Component {

    constructor(props, context) {

        super(props, context)
        this.state = {
            id: props.id,
            city: props.city,
            county: props.county,
            address: props.address,
            postalCode: props.postalCode,
            firstName: props.firstName,
            lastName: props.lastName,
            birthDate: props.birthDate,
            bloodType: props.bloodType,
            lastDonationDate: props.lastDonationDate,
            editingName: false,
            editingAddress: false

        }
        this.request = props.request
        this.nextDonation = this.nextDonation.bind(this)
        this.saveToRemote = this.saveToRemote.bind(this)
        this.saveEditsInfo = this.saveEditsInfo.bind(this)
    }


    saveToRemote = () => {
        let baseUrl = "http://localhost:8080"
        let endPoint = "/profiles/edit"
        let headers = {
            headers: {
                Authorization: localStorage.getItem('Authorization'),
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        let javaJacksonKeys = ["id", "address", "county", "city", "firstName",
                                "lastName", "postalCode", "birthDate",
                               "bloodType", "lastDonationDate"]


        var payload = javaJacksonKeys.reduce((resultant, current) => {
            resultant[current] = this.state[current]; 
            return resultant;}, 
        {})
        
        Axios.post(baseUrl + endPoint, payload, headers)
        .then((response) => {
            NotificationManager.success("Profile successfuly updated.", "Success")
            this.request()

        })
        .catch((error) =>
        {
            console.log(error)
        })
    }

    handleNameChange = () => {
        var formInfo = {
            firstName: document.getElementById("NameInput").value,
            lastName: document.getElementById("SurnameInput").value
        }

        for(var key in formInfo) {
            if(formInfo[key] == null) {
                NotificationManager.error("Names are required", "Error")
                return
            }
        }

        this.setState(formInfo, this.saveToRemote)
        this.toggleEditName();
    }

    handleBloodChange = (e) => {
        this.setState({bloodType: e.target.innerText}, this.saveToRemote);
    }

    toggleEditName = () =>{
        console.log("got here tho")
        this.setState({editingName: !this.state.editingName});
    }

    toggleEditAddress = () =>{
        console.log("got here tho")
        this.setState({editingAddress: !this.state.editingAddress});
    }

    nextDonation = (date) => {
            if (date.getMonth() == 11) {
                var nextDonationDate = new Date(date.getFullYear() + 1, 0, 1);
            } else {
                var nextDonationDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
           }
           return dateFormat(this.nextDonation, "dd/mm/yyyy")
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
                            <div type="text" class="form-control">{this.state.address == null? "Enter your address" : this.state.address}</div>
                        </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <div type="text" class="form-control">{this.state.city == null? "Enter your city" : this.state.city}</div>
                        </div>
                        
                        <div class="form-group col-md-4">
                            <label for="inputCounty">County</label>
                            <div type="text" class="form-control">{this.state.county == null? "Enter your county": this.state.county}</div>
                        </div>
                        
                        <div class="form-group">
                            <label for="inputZip">Postal Code</label>
                            <div type="text" class="form-control">{this.state.postalCode == null ? 
                                                                    "Enter Postal Code" : this.state.postalCode}</div>
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
                <h3>{this.state.firstName}'s Profile</h3>
                <hr></hr>
                {this.renderNameForm()}
                <hr></hr>
                <div className="form-group flex">
                    <label><strong>Birth Date</strong></label>
                    <div type="text" className="form-control new-donation" >{this.state.birthDate}</div>
                </div>

                <hr></hr>
                <form class="form-group flex">
                    <label for="dropdownBloodType" class="mytext"><strong>Blood Type </strong></label>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownBloodType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.bloodType == null? "Choose your blood type" : this.state.bloodType} 
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
                <form class="form-group flex">
                    <label for="inputAddress">Next Donation Date</label>
                    <div type="text" className="form-control new-donation" >{this.state.nextDonation == null? dateFormat(Date.now(), "dd/mm/yyyy") : this.nextDonation(this.lastDonationDate)}</div>
                </form>
                <p></p>
                <hr></hr>
                {this.renderAdddressForm()}
                <NotificationContainer />
            </div>

        )
    }
}

export default UserProfile;
