"use strict;"

let mysql = require('mysql');

let db = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password: 'MSp1eses',
	database: 'bankular'
});

db.connect();

module.exports = db;

