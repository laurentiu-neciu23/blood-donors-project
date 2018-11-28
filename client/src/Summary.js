import React, { Component } from 'react'
import './Summary.css'
import ReactSvgPieChart from "react-svg-piechart"
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "reactjs-popup";

const dataMock = [
  { key: '0', value: 40, color: '#cd6133' }, 
  { key: 'A', value: 5, color: '#C13C37' }, 
  { key: 'B', value: 20, color: '#6A2135' }, 
  { key: 'AB', value: 35, color: '#f6e58d' }
];

const donationsTable = [
	{no: '1', hospital: 'Hospital1', date: '28.11.2018', status: 'ok'},
	{no: '2', hospital: 'Hospital2', date: '29.11.2018', status: 'ok'},
	{no: '3', hospital: 'Hospital3', date: '30.11.2018', status: 'ok'},
	{no: '4', hospital: 'Hospital4', date: '01.12.2018', status: 'ok'},
];


class Summary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: dataMock,
		};
	}
	 
	mouseOverHandler(d, e) {
		this.setState({
		  showToolTip: true,
		  top: e.y,
		  left: e.x,
		  value: d.value,
		  key: d.data.key});
	  }
	
	  mouseMoveHandler(e) {
		if (this.state.showToolTip) {
		  this.setState({top: e.y, left: e.x});
		}
	  }
	
	  mouseOutHandler() {
		this.setState({showToolTip: false});
	  }

	  createTooltip() {
		  console.log("here")
	  }
	
	//    createTooltip() {
	//  	if (this.state.showToolTip) {
	//  	  return (
	//  		<ToolTip
	//  		  top={this.state.top}
	//  		  left={this.state.left}
	//  		>
	//  		  The value of {this.state.key} is {this.state.value}
	//  		</ToolTip>
	//  	  );
	//  	}
	//  	return false;
	//    }
	  
	
	render() {
		return (
        <div class = "container">
        	<div class = "row">
       	 		<div class = "col-6 bg-tables">
       				<div class = "donations bg-table">
        				<label class = "fs-25 col-12 ">Donations</label>
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

				<div class = "analyses bg-table">
					<label class = "fs-25 col-12">Analyses</label>
					<div class = "table1 col-12">
    					<table class="table">
        					<thead class="thead-dark">
            					<tr>
                					<th scope="col">No.</th>
                					<th scope="col">Hospital</th>
                					<th scope="col">Date</th>
                					<th scope="col">Status</th>
									<th scope="col">Analyses Results</th>
            					</tr>
        					</thead>
        					<tbody class = "bg-light">
								{donationsTable.map(row => (
 										<tr>
    										{Object.values(row).map(rowValue => 
      											<td>{rowValue}</td>
											)}
											<td><button type="button" class="btn btn-info results-btn">Results</button></td>
  										</tr>
									))}
        					</tbody>
    					</table>
					</div>
				</div>
			</div>

			<div class = "chart col-5 bg-chart">
				<label class = "fs-25 col-12 title-chart">Blood Demand</label>
				<Tooltip disableFocusListener disableTouchListener title="Blood Type: " id = "tooltip">
				   <ReactSvgPieChart
    					data={this.state.data}
    					onSectorHover={(d, i, e) => {
      							if (d) {
									console.log(d.key, ": ", d.value, "%")
							
      							}
							}
						}
  					/>
				</Tooltip>
			</div>
		</div>
	</div>
		);
	}
}

export default Summary;