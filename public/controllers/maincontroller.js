"use strict;"


let app = angular.module('bankingApp', ['ui.bootstrap']);

app.controller('mainController', function($scope,$http) {

	$scope.transactions = [];

	$scope.totalCharges = $scope.transactions.reduce( (a,b) => {
		if (b.type == 'charge')
			return a + b.amount;
		else return a;
	},0);

	$scope.totalCredits = $scope.transactions.reduce( (a,b) => {
		if (b.type == 'credit')
			return a + b.amount;
		else return a;
	},0);

	$scope.totalBalance = $scope.transactions.reduce( (a,b) => {
		if (b.type == 'credit')
			return a + b.amount;
		else 
			return a - b.amount;
	},0);

	$http({
		method:'GET',
		url: '/transactions'
	})
	.then( function(transactions){
		transactions.forEach( transaction => {
			$scope.transactions.push(transaction);
		});
	})
	.catch( err => {
		console.log(err);
	});

	$scope.addTransaction = function(){
		let transactionToCreate = angular.copy($scope.newTransaction);
		if (transactionToPush.type == "charge"){
			transactionToPush.charge = transactionToPush.amount;
		} else {
			transactionToPush.credit = transactionToPush.amount;
		}
		$http({
			method:'POST',
			url: '/transactions'
		})
		.then( function(transaction){
			$scope.transactions.push(transaction);
		})
		.catch( err => {
			console.log(err);
		});
		$scope.transactions.push(transactionToPush);
	}

	$scope.removeItem = function(index){
		$http({
			method:'DELETE',
			url: '/' + index
		})
		.then( function(){
			$scope.transactions.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

});



