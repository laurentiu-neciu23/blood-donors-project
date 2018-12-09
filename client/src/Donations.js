import React, { Component } from 'react'
import './Donations.css'

const donationsTable = [
	{no: '1', hospital: 'Hospital1', date: '28.11.2018', status: 'ok'},
	{no: '2', hospital: 'Hospital2', date: '29.11.2018', status: 'ok'},
	{no: '3', hospital: 'Hospital3', date: '30.11.2018', status: 'ok'},
    {no: '4', hospital: 'Hospital4', date: '01.12.2018', status: 'ok'},
    {no: '5', hospital: 'Hospital5', date: '01.12.2018', status: 'ok'},
    {no: '6', hospital: 'Hospital6', date: '01.12.2018', status: 'ok'},
    {no: '7', hospital: 'Hospital7', date: '01.12.2018', status: 'ok'},
    {no: '8', hospital: 'Hospital8', date: '01.12.2018', status: 'ok'},
    {no: '9', hospital: 'Hospital9', date: '01.12.2018', status: 'ok'},
    {no: '10', hospital: 'Hospital10', date: '01.12.2018', status: 'ok'},
    {no: '11', hospital: 'Hospital11', date: '01.12.2018', status: 'ok'},
    {no: '12', hospital: 'Hospital12', date: '01.12.2018', status: 'ok'}
];

class Donations extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: donationsTable,
		};
	}
	 
	
	render() {
		return (
        <div class = "container">
        	<div class = "row">
       	 		<div class = "col-12 bg-tables-donations">
       				<div class = "donations bg-table">
        				<label class = "fs-25 col-12 ">All Donations</label>
        				<div class = "table1 col-12">
            				<table class="table">
                				<thead class="thead-dark">
                    				<tr>
                        				<th scope="col">No.</th>
                        				<th scope="col">Hospital</th>
                        				<th scope="col">Date</th>
                        				<th scope="col">Status</th>
                    				</tr>
                				</thead>
                				<tbody class = "bg-light">
									{donationsTable.map(row => (
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