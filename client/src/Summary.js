import React, { Component } from 'react'
import './Summary.css'
import ReactSvgPieChart from "react-svg-piechart"
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "reactjs-popup";
var Modal = require('react-bootstrap-modal');



const dataMock = [
  { key: '0', value: 40, color: '#cd6133', text: "0 blood cells are...", symbol: "🆎" }, 
  { key: 'A', value: 5, color: '#C13C37', text: "A blood cells are...", symbol: "🆎" }, 
  { key: 'B', value: 20, color: '#6A2135', text: "B blood cells are...", symbol: "🆎"}, 
  { key: 'AB', value: 35, color: '#f6e58d', text: "AB blood cells are...", symbol: "🆎"  }
];

const mockAnalysisData = [
	{name: "WBC", value: 22.3},
	{name: "Lym", value: 5.6},
	{name: "Mon", value: 0.6},
	{name: "Gran", value: 16.1},
	{name: "RBC", value: 7.31},
	{name: "HGB", value: 102},
	{name: "HCT", value: "----------"},
	{name: "MCV", value: 47.1},
	{name: "MCH", value: 13.9},
	{name: "MCHC", value: 296},
	{name: "RDW", value: "----------"},
	{name: "PLT", value: 413},
	{name: "MPV", value: 10.8},
	{name: "PDW", value: 15.7},
	{name: "PCT", value:"----------"},
	{name: "EOS", value:"----------"}
]

const normalAnalysisData = {
	WBC: "6.0 - 17.0",
	Lym: "0.8 - 5.1",
	Mon:"0.0 - 1.8",
	Gran:"4.0 - 12.6",
	RBC:"5.5 - 8.5",
  HGB:"110 - 190 g/L",
	HCT:"----------",
	MCV:"62.0 - 72.0 fL",
	MCH:"20.0 - 25.0 pg",
	MCHC:"300 - 380 g/L",
	RDW:"----------",
	PLT:"117 - 460",
	MPV:"7.0 - 12.9",
	PDW:"15.0 - 17.0",
	PCT:"----------",
	EOS:"----------"
}


const donationsTable = [
	{no: '1', hospital: 'Hospital1', date: '28.11.2018', status: 'ok'},
	{no: '2', hospital: 'Hospital2', date: '29.11.2018', status: 'ok'},
	{no: '3', hospital: 'Hospital3', date: '30.11.2018', status: 'ok'},
	{no: '4', hospital: 'Hospital4', date: '01.12.2018', status: 'ok'},
];


class Summary extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			data: dataMock,
			selectedData: {},
			displayChartData: false,
			posX: 0,
			posY: 0,
			show: false
		};

		this.handleMouseEnter = this.handleMouseEnter.bind(this)
		this.handleMouseExit = this.handleMouseExit.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
		this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);
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

		console.log("Exited mouse")
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
	  
	handleClose() {
		this.setState({ show: false });
	  }
	
	handleShow(row) {
		console.log("pressed ");
		this.setState({
			show: true,
			anDate: row["date"],
			anHospital: row["hospital"]
		});
	  }

	render() {
		let movingBox;

		if (this.state.displayChartData === true) {
			let width = 100
			let height = 100
			let positionX = this.state.posX - 50
			let positionY = this.state.posY - 50
			movingBox = <div class="card" style={{width: width + "px", height: height + "px", top: positionY + "px", left: positionX + "px", position:"absolute"}}>
							<ul class="list-group list-group-flush">
							<li class="list-group-item">{this.state.selectedData.key}-type blood request</li>
							<li class="list-group-item">{this.state.selectedData.value}%</li>
							<li class="list-group-item">{this.state.selectedData.text}</li>
							</ul>
						</div>
		} else {
			movingBox = null
		}

		return (
		<div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <h4 class="col-sm">Result Bulletin</h4>
            <p class="col-sm">Blood test taken on <strong>{this.state.anDate}</strong> at <strong>{this.state.anHospital}</strong>
            </p>
            <hr />
						<div class="row">
    										<div class="col-sm"><strong>Property</strong></div>
												<div class="col-sm"><strong>Value</strong></div>
												<div class="col-sm"><strong>Normal value</strong></div>
												<div class="col-sm"></div>				
  					</div>
						<p/>
            <div>
						{mockAnalysisData.map(row => (
 										<div class="row">
    										<div class="col-sm"><strong>{row.name}:</strong></div>
												<div class="col-sm">{row.value}</div>
												<div class="col-sm">{normalAnalysisData[row.name]}</div>
												<div class="col-sm"></div>
  										</div>
									))}
						</div>
          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-primary" onClick={this.handleClose}>Close</button>
          </Modal.Footer>
        </Modal>

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
											<td><button type="button" class="btn btn-info results-btn" onClick={() => this.handleShow(row)}>Results</button></td>
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
</div>
		);
	}
}

export default Summary;