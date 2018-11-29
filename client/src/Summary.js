import React, { Component } from 'react'
import './Summary.css'
import ReactSvgPieChart from "react-svg-piechart"
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "reactjs-popup";
var Modal = require('react-bootstrap-modal');



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
	
	handleShow() {
		console.log("pressed");
		this.setState({ show: true });
	  }

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
		<div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            <p>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.handleClose}>Close</button>
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
											<td><button type="button" class="btn btn-info results-btn" onClick={this.handleShow}>Results</button></td>
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