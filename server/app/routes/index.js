'use strict';

const router = require('express').Router();

module.exports = router;

router.use('/quote', require('./quote'));
router.use('/stocks', require('./stocks'));

router.use( ( req, res ) => {
	res.status( 404 ).end;
} );



