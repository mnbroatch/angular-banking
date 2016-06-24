"use strict;"

let mysql = require('mysql');

let db = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password: MYSQL_PASSWORD,
	database: 'bankular'
});

db.connect();

module.exports = db;

