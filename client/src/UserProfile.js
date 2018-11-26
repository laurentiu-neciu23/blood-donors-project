import React, { Component } from 'react'
import './UserProfile.css'

class UserProfile extends Component {

    state = {
        name: 'Name',
        surname: 'Surname',
        birthday: null,
        bloodtype: null
      }

    goEditModeName = () => {
      var noneditable = document.getElementById("NonEditableText");
      noneditable.classList.add("hidden");
      var editable = document.getElementById("EditableText");
      editable.classList.remove("hidden");
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

    
    
    render(){
        return(
            <div class>
                <h1>Your Profile</h1>
                <div class="row"  id='NonEditableText'>
                    <form class="form-inline">
                        
                        <label for="formGroupExampleInput" ><strong>Name  </strong></label>
                        <div class="form-group"> 
                            <div type="text" class="form-control-plaintext" id="formGroupExampleInput">{this.state.name}</div>
                        </div>
                        
                        <label for="formGroupExampleInput2"><strong>Surname  </strong></label>
                        <div class="form-group">
                            <div type="text" class="form-control-plaintext" id="formGroupExampleInput2">{this.state.surname}</div>
                        </div>
                        <button type="button" class="btn btn-primary" onClick={this.goEditModeName}>Edit</button>
                    </form>
                </div>
                    
                <div class="row hidden"  id='EditableText'>
                    <form class="form-inline">
                        
                        <label for="NameInput" ><strong>Name  </strong></label>
                        <div class="form-group"> 
                            <input type="text" class="form-control" id="NameInput"/>
                        </div>
                        
                        <label for="SurnameInput"><strong>Surname  </strong></label>
                        <div class="form-group">
                            <input type="text" class="form-control" id="SurnameInput"/>
                        </div>
                        <button type="button" class="btn close" aria-label="Close" onClick={this.exitEditModeName}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <button type="button" class="btn btn-primary" onClick={this.handleNameChange}>OK</button>
                    </form>
                </div>

                <h1>Your Profile2</h1>
            </div>
        )
    }
}

export default UserProfile;