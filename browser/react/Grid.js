import React from 'react';
import ReactDataGrid from 'react-data-grid';
import "babel-polyfill";
import { Toolbar, Data, Draggable } from 'react-data-grid-addons';
import { ToolsPanel } from 'react-data-grid-addons';

import PropTypes from 'prop-types';
const { GroupedColumnsPanel } = ToolsPanel;
const {
//  ToolsPanel: { AdvancedToolbar: Toolbar, GroupedColumnsPanel },
  Data: { Selectors },
  Draggable: { Container: DraggableContainer },
  Formatters: { ImageFormatter }
} = require('react-data-grid-addons');



class CustomToolbar extends React.Component{
	static propTypes = {
		groupBy: PropTypes.array.isRequired,
		onColumnGroupAdded: PropTypes.func.isRequired,
		onColumnGroupDeleted: PropTypes.func.isRequired
	}

	render(){
	
		return (
			
				
			<GroupedColumnsPanel groupBy = {this.props.groupBy} onColumnGroupAdded={this.props.onColumnGroupAdded} onColumnGroupDeleted={this.props.onColumnGroupDeleted} />
			
		)
	}
}


export default class Grid extends React.Component{

	constructor( props ){
		super( props );
		this.columns = [{ key: 'id', name: 'ID', draggable: true, sortable: true, filterable: true }, { key: 'symbol', name: 'Symbol' , draggable: true, sortable: true, filterable: true}, {key: 'name', name: 'Name', draggable: true, sortable: true, filterable: true}, { key: 'marketcap', name: 'MarketCap', draggable: true, sortable: true, filterable: true}, {key: 'sector', name:'Sector', draggable: true, sortable: true, filterable: true}, {key: 'industry', name:'Industry', draggable: true, sortable: true, filterable: true, resizable: true }, {key:'ipoyear', name:'IPOyear', draggable: true, sortable: true, filterable: true}];

		this.state = {
			rows:[],
			filters: {},
			sortColumn: null,
			sortDirection: null,
			groupBy:[],
			expandedRows: {},
		
		};
		this.createRows = this.createRows.bind(this);
		this.handleGridSort = this.handleGridSort.bind(this);
		this.rowGetter = this.rowGetter.bind(this);
		this.getSize = this.getSize.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.onColumnGroupAdded = this.onColumnGroupAdded.bind(this);
//		this.onColumnGroupDeleted = this.onColumnGroupDeleted.bind(this);
		this.onRowExpandToggle = this.onRowExpandToggle.bind(this);
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
		return Selectors.getRows(this.state);
	}

	getRowsAt(index){
		let rows = this.getRows();
		return rows[index];
	}

	rowGetter(index){
		const rows = this.getRows();
		return rows[index];
	}

  onColumnGroupAdded(colName) {
	console.log('.....added colName', colName);
    let columnGroups = this.state.groupBy.slice(0);
    let activeColumn = this.columns.find((c) => c.key === colName)
    let isNotInGroups = columnGroups.find((c) => activeColumn.key === c.name) == null;
    if (isNotInGroups) {
      columnGroups.push({key: activeColumn.key, name: activeColumn.name});
    }
	console.log("columns groups.....", columnGroups);
    this.setState({groupBy: columnGroups});
  };
/*
  onColumnGroupDeleted(name) {
    console.log(".....group deleted name", name);
	let columnGroups = this.state.groupBy.filter(function(g){
      return typeof g === 'string' ? g !== name : g.key !== name;
    });

	console.log(".....group deleted name", name);
    this.setState({groupBy: columnGroups});
  };
*/
  onColumnGroupDeleted = (name) => {
    console.log(".....group deleted name", name);
	let columnGroups = this.state.groupBy.filter(function(g){
      return typeof g === 'string' ? g !== name : g.key !== name;
    });

	console.log(".....group deleted name", name);
    this.setState({groupBy: columnGroups});
  };


  onRowExpandToggle({ columnGroupName, name, shouldExpand }){
    let expandedRows = Object.assign({}, this.state.expandedRows);
    expandedRows[columnGroupName] = Object.assign({}, expandedRows[columnGroupName]);
    expandedRows[columnGroupName][name] = {isExpanded: shouldExpand};
    this.setState({expandedRows: expandedRows});
  };

 	render(){
		console.log('.......state', this.state);
		return (
		<DraggableContainer>
	  		<ReactDataGrid
			onGridSort = { this.handleGridSort }
			onAddFilter = { this.handleFilterChange }
			onClearFilters = { () => this.setState({ filters: {} })}
			columns={this.columns}
			enableCellSelect
			enableDragAndDrop={true}
			canFilter={true}
			onCellSelected={ (args) => { console.log('selected sell ', args) } }
			rowGetter={this.rowGetter}
			rowsCount={this.getSize()}
			onRowExpandToggle={this.onRowExpandToggle}
			toolbar ={ <Toolbar enableFilter={true}><CustomToolbar groupBy={this.state.groupBy} onColumnGroupAdded={this.onColumnGroupAdded} onColumnGroupDeleted={this.onColumnGroupDeleted}/></Toolbar> }
			minHeight={650} />
		</DraggableContainer>
		)
	}

}


