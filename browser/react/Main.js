import React from 'react';
import { Link } from 'react-router-dom';


const Main = ( { data }) => {
//console.log('..............in Main.js', data.data);

return(
	<div>
		{ data.length > 0 && data.map( (stock, idx) =>
				(
					<div key = { idx } className="panel panel-default">
					<div className="panel-heading">{ stock.quotes.price.shortName } ( { stock.quotes.price.symbol } )
						<span className = 'pull-right'>${ stock.quotes.price.regularMarketPrice}
							<div>{ parseFloat(stock.quotes.price.regularMarketChange).toFixed(2) } {''}
								({(parseFloat( (stock.quotes.price.regularMarketChangePercent*100).toFixed(2)) + "%" )})
							</div>
						</span>
						<div>&nbsp;</div>
					</div>

					<div className="panel-body">
						<div>Ask:{ stock.quotes.summaryDetail.ask } &nbsp; x &nbsp; { stock.quotes.summaryDetail.askSize }</div>
						<div>Bid: { stock.quotes.summaryDetail.bid } &nbsp; x &nbsp; { stock.quotes.summaryDetail.bidSize }</div>
					</div>
					</div>
				)
		)}
	</div>
	)
}

export default Main;
