'use strict';
const express = require('express');
const app = express();
const path = require('path');
module.exports = app;

require('./configure')(app);

app.use('/api', require('./routes'))

app.use(( req, res, next ) => {
  if( path.extname(req.path).length > 0 ){
    res.status(404).end();
  }else{
    next(null);
  }
})

app.get('/*', (req,res,next) => {
  res.sendFile(app.get('indexHTMLPath'));
})

app.use((err,req,res,next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
})
