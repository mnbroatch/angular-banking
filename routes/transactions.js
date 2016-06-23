"use strict;"

let express = require('express');

let router = express.Router();
let Transaction = require('../models/transaction');

router.get('/', function(req,res){
	Transaction.getAllTransactions()
	.then(transactions => {
		res.send(transactions);
	})
	.catch(err => {
		res.status(400).send(err);
	});
});

router.get('/:id', function(req,res){
	Transaction.getOneTransaction(req.params.id)
	.then(transaction => {
		res.send(transaction);
	})
	.catch(err => {
		res.status(400).send(err);
	});
});

router.post('/', function(req,res){
	Transaction.insertTransaction(req.body)
	.then(confirmation => {
		res.send(confirmation);
	})
	.catch(err => {
		res.status(400).send(err);
	});
});

router.put('/:id', function(req,res){
	Transaction.updateTransaction(req.params.id, req.body)
	.then(confirmation => {
		res.send(confirmation);
	})
	.catch(err => {
		res.status(400).send(err);
	});
});

router.delete('/:id', function(req,res){
	Transaction.deleteTransaction(req.params.id)
	.then(confirmation => {
		res.send(confirmation);
	})
	.catch(err => {
		res.status(400).send(err);
	});
});



















module.exports = router;

