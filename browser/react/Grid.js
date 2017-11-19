import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, ToolsPanel, Data, Draggable } from 'react-data-grid-addons';


export default class Grid extends React.Component{


	constructor( props ){
		super( props );
		this.columns = [{ key: 'id', name: 'ID', draggable: true, sortable: true, filterable: true }, { key: 'symbol', name: 'Symbol' , draggable: true, sortable: true, filterable: true}, {key: 'name', name: 'Name', draggable: true, sortable: true, filterable: true}, { key: 'marketcap', name: 'MarketCap', draggable: true, sortable: true, filterable: true}, {key: 'sector', name:'Sector', draggable: true, sortable: true, filterable: true}, {key: 'industry', name:'Industry', draggable: true, sortable: true, filterable: true}, {key:'ipoyear', name:'IPOyear', draggable: true, sortable: true, filterable: true}];

		this.state = {
			rows:[],
			filters: {},
			sortColumn: null,
			sortDirection: null,
		};
		this.createRows = this.createRows.bind(this);
		this.handleGridSort = this.handleGridSort.bind(this);
		this.rowGetter = this.rowGetter.bind(this);
		this.getSize = this.getSize.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
	
	}	
	
	componentDidMount(){
//		this.grid.onToggleFilter();
	}

	componentWillReceiveProps(nextProps){
		if( nextProps.nasdaq != this.state.nasdaq ){
//			const rows = nextProps.nasdaq;
		//	console.log('....nextProps', nextProps);
			const rows = this.createRows(nextProps);	   
			this.setState( { rows } );
		}
	}
	
	handleFilterChange(filter){
		let newFilters = Object.assign({}, this.state.filters );
		if( filter.filterTerm ){
			newFilters[filter.column.key] = filter;
		}else{
			delete newFilters[filter.column.key];
		}
		console.log('.........filter', filter, newFilters);
		this.setState({ filters: newFilters });
	}	

	handleGridSort( sortColumn, sortDirection ){
		this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
	}


	createRows(nextProps){
		let rows = [];
//		console.log('populate data this.state', this.state.nasdaq);	
		for( let i = 0; i < nextProps.nasdaq.length; i++){
			let nasdaq = nextProps.nasdaq[i];
//			console.log('.....nasdaq', nasdaq);
			rows.push({ id: nasdaq.id, symbol: nasdaq.symbol, name: nasdaq.name, marketcap: nasdaq.marketcap, sector: nasdaq.sector, industry: nasdaq.industry, ipoyear: nasdaq.ipo});
			
		}
		return rows;
	}
	
	getSize(){
		return this.getRows().length;
	}

	getRows(){
		return Data.Selectors.getRows(this.state);
	}
	
	
	rowGetter(index){
		const rows = this.getRows();
		return rows[index];
	}

 	render(){
		console.log('.......state', this.state);
		return (
		<Draggable.Container>		
	  		<ReactDataGrid
			onGridSort = { this.handleGridSort }
			onAddFilter = { this.handleFilterChange }
			onClearFilters = { () => this.setState({ filters: {} })}
			toolbar = { <Toolbar enableFilter = { true } /> }
			columns={this.columns}
			enableCellSelect
			enableDragAndDrop={true}
			canFilter={true}
			onCellSelected={ (args) => { console.log('selected sell ', args) } }
			rowGetter={this.rowGetter}
			rowsCount={this.getSize()}
			minHeight={650} />
		</Draggable.Container>
		)
	}
	
}


