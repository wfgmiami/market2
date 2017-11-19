import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Main from './Main';
import MsgBox from './MsgBox';
import FilterBar from './Filter/FilterBar';
import SearchBar from './SearchBar';
import StocksList from './StocksList';
import SingleStock from './SingleStock';
import Grid from './Grid';

const socket = io(window.location.origin);
let clientIP = '';

let divOuter;
let divInner;

socket.on( 'connect', ()=> {
	socket.emit('joinRoom', window.location.origin);
})

//comment
class App extends Component{
	constructor( props ){
		super( props );

		this.state = {
			msgs:[],
			nasdaq:[],
			quote:[],
			search:''
		}
		this.reset = this.reset.bind(this);
		this.searchActive = this.searchActive.bind(this);
		this.filterActive = this.filterActive.bind(this);
		this.onMessageSubmit = this.onMessageSubmit.bind(this);
//		this.handleScroll = this.handleScroll.bind(this);
	}

	searchActive( input ){
		const searchedStock = { "searchedStock": input }
		console.log('in searchActive.....',searchedStock);
		axios.get('/api/stocks/nasdaq/search', { params: searchedStock })
		.then( res => res.data )
		.then( nasdaq => {
			this.setState( { nasdaq } )
			this.setState( { search: true } );
		})
		.catch( err => console.log( err ))
	}

	filterActive( filter ){
		let url = '/api/stocks/nasdaq/filter';
		if( filter.sector.length === 0){
			url = '/api/stocks/nasdaq';
		}
//		console.log('...........axios',filter);
		axios.get(url, { params: filter })
		.then( res => res.data )
		.then( nasdaq =>{ 
			this.setState( { nasdaq } )		
		})
		.catch( err => console.log( err ))
	}

	componentDidMount(){
//		divOuter = document.getElementById("divOuter");
//		divInner = document.getElementById("divInner");
//		divOuter.addEventListener("scroll", this.handleScroll);
//		localStorage.clear();

		axios.get('/api/stocks/nasdaq')
		.then( response => response.data )
		.then( nasdaq =>{
			this.setState( { nasdaq })
//`			console.log('return from /nasdaq......', nasdaq);
		})
		.catch( err => console.log( err ))
	}

	componentWillUnmount(){
//	window.removeEventListener("scroll", this.handleScroll);
	}


	reset(){
		axios.get('/api/stocks/nasdaq')
		.then( response => response.data )
		.then( nasdaq => {
			this.setState( { nasdaq })
			this.setState({ search: false });
		})
		.catch( err => console.log( err ))
	}

	componentWillMount(){
		var self = this;
		socket.on('message', ( msgs ) => {
			this.setState( { msgs } );
		})

		socket.on('ip', ( clientAddress ) => {
			clientIP = clientAddress;
		})

		socket.on('messageHistory', ( messages ) => {
			messages.forEach ( ( msgs ) => {
				this.setState( { msgs } )
			})
		})
		socket.on('sendData', ( ) => {

			if( Object.keys( this.props ).length < 2 ){
				this.setState( { quote:[] } )
//				console.log('......sendData.....', this.props, this.state);
			}

		})
	}


	onMessageSubmit(msgs){
		let tempArr = [];
		msgs = clientIP + ': ' + msgs;
		if( this.state.msgs.length === 0 ){
			tempArr.push( msgs );
		}else{
			tempArr = this.state.msgs;
			tempArr.push( msgs );
		}
		msgs =  tempArr;
		this.setState( {  msgs });

		socket.emit('message', msgs);
	}


	render(){
        console.log('.....in App.js, state',this.state)

		return(
			<div className="container-fluid">
				<Nav />
				<div style={ { marginTop: '95px' }}>
				
				{/*	<SearchBar searchActive={ this.searchActive }/> */}
						<div className="row">
				{/*			
							<div className="col-sm-2">
								<FilterBar filterActive={ this.filterActive } /> 
							</div>
				*/}
							<div className="col-sm-10">
							
							{/* Object.keys( this.props ).length > 1 ?
								<StocksList searchFlag = { this.state.search } reset={ this.reset } nasdaq = { this.state.nasdaq } />
								: <SingleStock router = { this.props.router }/> */}
							
								<Grid nasdaq={ this.state.nasdaq }/>
							</div>
							<div className="col-sm-2">
								<MsgBox msgs = { this.state.msgs } onMessageSubmit = { this.onMessageSubmit }  />
							</div>
						</div>
				</div>
			</div>
		)
	}
}


export default App;
