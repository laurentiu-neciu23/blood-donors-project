import React, { Component } from 'react'
import './ManageDonations.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NotificationManager, NotificationContainer} from "react-notifications";

const donationsTable = [
	{no: '1', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital1', date: '28.11.2018'},
	{no: '2', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital2', date: '29.11.2018'},
	{no: '3', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital3', date: '30.11.2018'},
    {no: '4', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital4', date: '01.12.2018'},
    {no: '5', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital5', date: '01.12.2018'},
    {no: '6', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital6', date: '01.12.2018'},
    {no: '7', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital7', date: '01.12.2018'},
    {no: '8', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital8', date: '01.12.2018'},
    {no: '9', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital9', date: '01.12.2018'},
    {no: '10', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital10', date: '01.12.2018'},
    {no: '11', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital11', date: '01.12.2018'},
    {no: '12', donorName: "Jon Doe", receiverName: "Jane Doe", hospital: 'Hospital12', date: '01.12.2018'}
];

class ManageDonations extends Component {
    state = {
        statustype: null
    }

    handleStatusChange = (e) => {
        this.setState({
            statustype: e.target.innerText});
    }

    render(){
        return(
            <div class = "container mb-2">
        	<div class = "row">
       	 		<div class = "col-12 bg-tables-manage">
       				<div class = "donations bg-table">
        				<label class = "fs-25 col-12 ">Manage Donations</label>
        				<div class = "table1 col-12">
            				<table class="table">
                				<thead class="thead-dark">
                    				<tr>
                        				<th scope="col">No.</th>
                                        <th scope="col">Donor Name</th>
                                        <th scope="col">Receiver Name</th>
                        				<th scope="col">Hospital</th>
                        				<th scope="col">Date</th>
                        				<th scope="col">Status</th>
                    				</tr>
                				</thead>
                				<tbody class = "bg-light">
									{donationsTable.map(row => (
 										<tr>
    										{Object.values(row).map(rowValue => 
      											<td class = "fs-40">{rowValue}</td>
                                            )}
                                            <td>
                                                <form class="form-group flex">
                                                    <label for="dropdownStatusType" class="mytext"><strong>Status</strong></label>
                                                    <div class="dropdown">
                                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownStatusType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            {this.state.statustype} 
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownStatusType">
                                                            <a class="dropdown-item" href="#" onClick={this.handleBloodChange}>Extraction</a>
                                                            <a class="dropdown-item" href="#" onClick={this.handleBloodChange}>Preparation</a>
                                                            <a class="dropdown-item" href="#" onClick={this.handleBloodChange}>Qualification</a>
                                                            <a class="dropdown-item" href="#" onClick={this.handleBloodChange}>Distribution</a>
                                                        </div>
                                                    </div>
                                                </form>
                                            </td>
  										</tr>
									))}
                				</tbody>
            				</table>
        				</div>
                    </div>
        		</div>
		    </div>
	</div>
        )
    }
}
export default ManageDonations;