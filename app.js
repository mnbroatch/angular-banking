"use strict";
const PORT = process.env.PORT || 8000;

const express = require('express');

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/transactions', require('./routes/transactions'));

app.get('/', function(req,res){
	res.render('index');
});

app.listen(PORT, function(err){
	console.log(err || `server started port ${PORT}`);
});

