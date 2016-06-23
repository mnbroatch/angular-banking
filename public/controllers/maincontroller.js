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
		if(transactions.data.length){
			transactions.data.forEach( transaction => {
				$scope.transactions.push(transaction);
			});
		}
	})
	.catch( err => {
		console.log(err);
	});

	$scope.addTransaction = function(){
		let transactionToPush = angular.copy($scope.newTransaction);
		if (transactionToPush.type == "charge"){
			transactionToPush.amount = transactionToPush.amount * -1;
		}
		$http({
			method:'POST',
			url: '/transactions',
			data:transactionToPush
		})
		.then( function(response){
			$scope.transactions.push(response.data);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeItem = function(index){
	console.log('del');
		$http({
			method:'DELETE',
			url: '/transactions/' + $scope.transactions[index].id
		})
		.then( function(){
			$scope.transactions.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

});



