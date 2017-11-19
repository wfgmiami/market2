const express = require('express');
const router = new express.Router();

const yahooFinance = require('yahoo-finance');
const dateFormat = require('dateformat');
let nasdaqData = require( '../../../nasdaq.json');
let id = 0;
const nasdaqLen = nasdaqData.length;

nasdaqData = nasdaqData.map( obj => Object.assign( {}, obj, { "id":id++ }));

module.exports = router;

router.get('/nasdaq', (req, res, next) => {

//	const rowParam = req.query;
//	console.log('..........route/nasdaq nasdaqData',nasdaqData);
	res.send( createNewObject( nasdaqData ));
})


router.get('/nasdaq/filter', (req, res, next) => {

	const { sector } = req.query;
	let filteredArray = [];
	sector.forEach( sect => {
		let tempArray = nasdaqData.filter( stock => stock.Sector === sect );
		filteredArray = filteredArray.concat( tempArray );
	})

	res.send( createNewObject( filteredArray ));
})

router.get('/nasdaq/search', (req, res, next) => {

	let searchedArray = [];
	const { searchedStock } =  req.query;

	nasdaqData.forEach( stock => {
		if( stock.Name.toUpperCase().indexOf( searchedStock.toUpperCase() ) > -1 ){
			searchedArray.push( stock );
		}
	})
//	searchedArray = nasdaqData.filter( stock => stock.Name === searchedStock );
	res.send( createNewObject( searchedArray ));
})


createNewObject = ( arr ) => {
	let obj = {};
	let nasdaq = [];
	const dataLength = nasdaqLen - 1;

	arr.forEach( item => {
		obj.id = item.id;
		obj.symbol = item.Symbol;
		obj.name = item.Name;
		obj.marketcap = item.MarketCap;
		obj.sector = item.Sector;
		obj.industry = item.industry;
		obj.ipo = item.IPOyear;
//		if(item.IPOyear == 'n/a') obj.ipo = "";
		obj.len = dataLength;
		nasdaq.push(obj);
		obj= {};
	})

	return nasdaq;
}

