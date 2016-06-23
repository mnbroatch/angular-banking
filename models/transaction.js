let db = require('../config/db');
let uuid = require('uuid');

db.query(`create table if not exists transactions(
	id varchar(100),
	description varchar(1000),
	amount float,
	date varchar(100),
	type varchar(100)
)`);

exports.getAllTransactions = function(){
	return new Promise(function(resolve,reject){
		db.query('select * from transactions', (err,transactions) => {
			if (err) return reject(err);
			resolve(transactions);
		});
	});
}

exports.getOneTransaction = function(id){
	return new Promise(function(resolve,reject){
		db.query('select * from transactions where id = ?',id, (err,transactionArray) => {
			if (err) return reject(err);
			resolve(transactionArray[0]);
		});
	});
}

exports.insertTransaction = function(transaction){
		transaction.id = uuid();
		delete transaction.charge;
		delete transaction.credit;
		return new Promise( function(resolve,reject){
		db.query('insert into transactions set ?',transaction, (err,transactionArray) => {
			if (err) return reject(err);
			resolve(transaction);
		});
	});
}

exports.deleteTransaction = function(id){
	return new Promise(function(resolve,reject){
		db.query('delete from transactions where id=?',id, (err) => {
			if (err) return reject(err);
			resolve(`${id} deleted`);
		});
	});
}

exports.updateTransaction = function(id,transaction){
	return new Promise(function(resolve,reject){
		db.query('update transactions set ? where id=?',transaction, id, (err) => {
			if (err) return reject(err);
			resolve(`${id} updated`);
		});
	});
}





