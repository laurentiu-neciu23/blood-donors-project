import React, { Component } from 'react'
import './BloodRequests.css'

const RequestsTable = [
	{urgency: '1', name:"Faye Tozer", btype:'AB',  hospital: 'Hospital1', time: '28.11.2018', donations: 1},
	{urgency: '1', name:"Joe Sugg", btype:'O', hospital: 'Hospital2', time: '29.11.2018', donations: 2},
	{urgency: '2', name:"Ashley Roberts", btype:'AB', hospital: 'Hospital3', time: '30.11.2018', donations: 0},
    {urgency: '4', name:"Lauren Steadman", btype:'A', hospital: 'Hospital4', time: '01.12.2018',donations: 3},
    {urgency: '1', name:"Stacey Dooley", btype:'AB', hospital: 'Hospital5', time: '01.12.2018', donations: 1},
    {urgency: '2', name:"Stacey Dooley", btype:'AB', hospital: 'Hospital6',  time: '01.12.2018', donations: 3},
    {urgency: '3', name:"Lauren Steadman", btype:'AB', hospital: 'Hospital7', time: '01.12.2018',donations: 5},
    {urgency: '4', name:"Joe Sugg", btype:'A', hospital: 'Hospital8',  time: '01.12.2018', donations: 0},
    {urgency: '1', name:"Joe Sugg", btype:'A', hospital: 'Hospital9',  time: '01.12.2018', donations: 5},
    {urgency: '1', name:"Joe Sugg", btype:'B', hospital: 'Hospital10',  time: '01.12.2018', donations: 3},
    {urgency: '1', name:"Faye Tozer", btype:'O', hospital: 'Hospital11',  time: '01.12.2018', donations: 2},
    {urgency: '2', name:"Faye Tozer", btype:'AB',hospital: 'Hospital12',  time: '01.12.2018', donations: 1}
];

const resultsTable = [
	{urgency: '1', name:"Faye Tozer", btype:'AB',  hospital: 'Hospital1', time: '28.11.2018', donations: 1},
	{urgency: '2', name:"Joe Sugg", btype:'O', hospital: 'Hospital2', time: '29.11.2018', donations: 2},
	{urgency: '3', name:"Ashley Roberts", btype:'AB', hospital: 'Hospital3', time: '30.11.2018', donations: 0},
    {urgency: '4', name:"Lauren Steadman", btype:'A', hospital: 'Hospital4', time: '01.12.2018',donations: 3},
];


class Donations extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: RequestsTable,
        };
	}
    
    getSearchTable = () => {
        //to do: do a backend select from Blood Requests table using nameToSearch
        return resultsTable; //inlocuieste cu tabelul care contine rezultatele
    }
    
    toggleSearchON = () =>{
        //getting text to search by
        var nameToSearch = document.getElementById("inputName").value;
        console.log("Should search for "+ nameToSearch);

        //setting the data to be shown
        this.setState({data: this.getSearchTable()}); // tabelul cu rezultatele cautarii
    }

    toggleSearchOFF = () =>{
        //setting the data to be shown
        this.setState({data: RequestsTable}); //inlocuieste cu tabelul luat din be care contine toate cererile de sange
    }
    

    
	render() {
		return (
        <div class = "container">
        	<div class = "row">
       	 		<div class = "col-12 bg-tables">
       				<div class = "donations bg-table">
        				<label class = "fs-25 col-12 ">Blood Requests</label>

                        <hr/>
                        <div class="row">
                            <form class="form-inline">
                                
                                <label for="inputName" class="mytext"><strong>Filter by Name</strong></label>
                                <div class="form-group"> 
                                    <input type="text" class="form-control" id="inputName"></input>
                                </div>
                                <button type="button" class="btn btn-primary" onClick={this.toggleSearchON}> <span class="glyphicon glyphicon-search"></span> Search</button>
                                <button type="button" class="btn close" id="infoCloseBtn" aria-label="Close" onClick={this.toggleSearchOFF}>
                                        <span aria-hidden="true">&times;</span>
                                </button>
                            </form>
                        </div>
                        <hr/>

        				<div class = "table1 col-12">
            				<table class="table">
                				<thead class="thead-dark">
                    				<tr>
                        				<th scope="col">Urgency</th>
                        				<th scope="col">Name</th>
                        				<th scope="col">Blood Type</th>
                        				<th scope="col">Hospital</th>
                                        <th scope="col">Date of Filing</th>
                                        <th scope="col">No. of Donations</th>
                    				</tr>
                				</thead>
                				<tbody class = "bg-light">
									{this.state.data.map(row => (
 										<tr>
    										{Object.values(row).map(rowValue => 
      											<td>{rowValue}</td>
    										)}
  										</tr>
									))}
                				</tbody>
            				</table>
        				</div>
                    </div>
        		</div>
		    </div>
	</div>
		);
	}
}

export default Donations;