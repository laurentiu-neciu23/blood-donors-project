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
			selectedData: {},
			displayChartData: false,
			posX: 0,
			posY: 0
		};

		this.handleMouseEnter = this.handleMouseEnter.bind(this)
		this.handleMouseExit = this.handleMouseExit.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
	}

	handleMouseEnter(index) {
		this.setState({
			displayChartData: true,
			selectedData: dataMock[index]
		})
	}

	handleMouseMove(event) {
		if(this.state.displayChartData === true) {
			this.setState({
				posX: event.screenX,
				posY: event.screenY
			})
		}
	}

	handleMouseExit() {
		this.setState({
			displayChartData: false
		})
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
		let movingBox;

		if (this.state.displayChartData === true) {
			let width = 100
			let height = 100
			let positionX = this.state.posX - width
			let positionY = this.state.posY - height
			console.log(this.state.posX)
			console.log(this.state.posY)
			movingBox = <div class="card" style={{width: width + "px", height: height + "px", top: positionY + "px", left: positionX + "px", position:"absolute"}}>
							<ul class="list-group list-group-flush">
							<li class="list-group-item">{this.state.selectedData.key}</li>
							<li class="list-group-item">{this.state.selectedData.value}</li>
							</ul>
						</div>
		} else {
			movingBox = null
		}

		return (
    	<div class = "container" onMouseMove={this.handleMouseMove} >
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
				   <ReactSvgPieChart
						data={this.state.data}
						expandOnHover={true}
    					onSectorHover={(data, index, event) => {
      							if (event.type === "mouseenter") {
									this.handleMouseEnter(index)
      							} else {
									this.handleMouseExit()
								}
							}
						}
  					/>
			</div>
		</div>
		{movingBox}
	</div>

		);
	}
}

export default Summary;