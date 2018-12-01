import React, { Component } from 'react';
import './Analyses.css';
var Modal = require('react-bootstrap-modal');

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

class Analyses extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: donationsTable,
			show: true
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	 
	handleShow(row) {
		console.log("pressed ");
		this.setState({
			show: true,
			anDate: row["date"],
			anHospital: row["hospital"]
		});
	  }

	  handleClose() {
		this.setState({ show: false });
	  }

	render() {
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

        <div class = "container">
        	<div class = "row">
       	 		<div class = "col-12 bg-tables">
                    <div class = "analyses bg-table">
					<label class = "fs-25 col-12">All Analyses</label>
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
		    </div>
	</div>
	</div>
		);
	}
}

export default Analyses;