import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

let offset = 0;
const style = {
  display: 'flex',
  alignItems: 'center',
  fontSize: 40
};

/*
const divs = [
  <div key={1} style={{height: 30, background: '#9bc95b' }}>Div no 1</div>,
  <div key={2} style={{height: 30, background: '#ffd47b' }}>Div no 2</div>,
  <div key={3} style={{height: 30, background: '#95a9d6' }}>Div no 3</div>,
  <div key={4} style={{height: 30, background: '#ffa8e1' }}>Div no 4</div>,
  <div key={5} style={{height: 30, background: '#9bc95b' }}>Div no 5</div>,
  <div key={6} style={{height: 30, background: '#ffd47b' }}>Div no 6</div>,
  <div key={7} style={{height: 30, background: '#95a9d6' }}>Div no 7</div>,
  <div key={8} style={{height: 30, background: '#ffa8e1' }}>Div no 8</div>,
]

*/

const colors = ['#fff', '#d3d3d3'];

export default class StocksList extends React.Component{
	constructor( props ){
		super( props );
		this.state = {
			divs:[],
			nasdaq:[]
		}
		this.generateDivs = this.generateDivs.bind(this);
	}
	
//c nst StocksList = ( { nasdaq, searchFlag, reset }) => {
// console.log('..............in StocksList.js',searchFlag, nasdaq);	
	
	componentWillReceiveProps(nextProps){
		if(nextProps.nasdaq !== this.state.nasdaq){
			let nasdaq = nextProps.nasdaq
			this.setState({ nasdaq },()=>{
				this.setState({ divs:[] }, () =>{
					offset = 0;
					this.generateDivs();
				})
					
			})
		}
//		this.generateDivs();
//		console.log('...nextProps...', nextProps.nasdaq, this.state.nasdaq);
	}

	generateDivs () {
    	let moreDivs = [];
		
    	let count = this.state.divs.length;
		console.log('.....stockList generateDivs', this.state);
    	if(this.state.nasdaq.length > 1){	
		for (let i = 0; i < 30; i++) { 
			moreDivs.push(
			<tr key={'div' + count++}  >
				<td id={count} className="id">
					{ this.state.nasdaq[i + offset].id }
				</td>
				<td id={count} className="symbol">
					{ this.state.nasdaq[i + offset].symbol }
				</td>
				<td id={count} className="name">
					{ this.state.nasdaq[i + offset].name }
				</td>
				
				<td id={count} className="sector">
					{ this.state.nasdaq[i + offset].sector }
				</td>
				
				<td id={count} className="industry">
					{ this.state.nasdaq[i + offset].industry }
				</td>
				
				<td id={count} className="ipo">
					{ this.state.nasdaq[i + offset].ipo }
				</td>

			</tr>

      		);
			
    	}
		offset+=30;
    	setTimeout(() => {
      		this.setState({divs: this.state.divs.concat(moreDivs)});
    	}, 500);
		}else if( this.state.nasdaq.length == 1){
			console.log('...............search');
			moreDivs.push(
			<tr key={'div'+count++}>
				<td id={count} className="id">
					{ this.state.nasdaq[0].id }
				</td>
				<td id={count} className="symbol">
					{ this.state.nasdaq[0].symbol }
				</td>
				<td id={count} className="name">
					{ this.state.nasdaq[0].name }
				</td>
				
				<td id={count} className="sector">
					{ this.state.nasdaq[0].sector }
				</td>
				
				<td id={count} className="industry">
					{ this.state.nasdaq[0].industry }
				</td>
				
				<td id={count} className="ipo">
					{ this.state.nasdaq[0].ipo }
				</td>
	
			</tr>

			)
			this.setState({divs: moreDivs});

		}

  	}

	render(){
		const total = this.props.nasdaq.length - 1;
	
		return(
		<div className="panel-footer"><b>Total Stocks: <span className="badge badge-info"> { total }</span>{ this.props.searchFlag ? <span className="pull-right"><button className="btn btn-primary" onClick={ this.props.reset }>Reset</button></span> : null }</b>



	<div>&nbsp;</div>
	<table style={{ width:"100%" }}>
		<thead>
			<tr>
				<th className="id">Id</th>
				<th className="symbol">Symbol</th>
				<th className="name">Name</th>
				<th className="sector"> Sector</th>
				<th className="industry">Industry</th>
				<th className="ipo">IPO</th>
			</tr>

		</thead>
	</table>

		
		<div>

          <InfiniteScroll
          next={this.generateDivs}
          hasMore={true}
          height={550}
          loader={<h4>Loading...</h4>}>
          {this.state.divs}
          </InfiniteScroll>
	  
      	</div>		

	</div>
		)

	}
}

/*
const StocksList = ( { nasdaq, searchFlag, reset }) => {
// console.log('..............in StocksList.js',searchFlag, nasdaq);
const total = nasdaq.length - 1;


if( JSON.parse(localStorage.getItem("nasdaq")) ){
	total = JSON.parse(localStorage.getItem("nasdaq")).length;
}else{
	total = 0;
}


return(
	<div className="panel-footer"><b>Total Stocks: <span className="badge badge-info"> { total }</span>{ searchFlag ? <span className="pull-right"><button className="btn btn-primary" onClick={ reset }>Reset</button></span> : null }</b>



	<div>&nbsp;</div>
	<table style={{ width:"100%" }}>
		<thead>
			<tr>
				<th className="id">Id</th>
				<th className="symbol">Symbol</th>
				<th className="name">Name</th>
				<th className="sector"> Sector</th>
				<th className="industry">Industry</th>
				<th className="ipo">IPO</th>
			</tr>

		</thead>
	</table>

	<div id="divOuter" style={{ maxHeight:'70vh', overflowY:'auto' }} >
	<div id="divInner">
	<table>
		<tbody>

			{ nasdaq.length ?
				nasdaq.map((stock, index) => (
				<tr key={index} id={stock.id} >
					<td id={index} className="idx">
						{ stock.id }
					</td>
					<td id={index} className="symbol">
						{ stock.symbol }
					</td>

					<td id={index} className="name">
						{ stock.name }
					</td>

					<td id={index} className="sector">
						{ stock.sector }
					</td>

					<td id={index} className="industry">
						{ stock.industry }
					</td>

					<td id={index} className="ipo">
						{ stock.ipo }
					</td>

				</tr>
						))
					: null }

		</tbody>

  </table>
	</div>
	</div>
	</div>
	)
}

export default StocksList;
*/
