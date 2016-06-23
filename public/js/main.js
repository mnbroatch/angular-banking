"use strict;"




let app = angular.module('bankingApp', ['ui.bootstrap']);

app.controller('mainController', function($scope) {

	$scope.transactions = [];
	$scope.totalCharges = 0;
	$scope.totalCredits = 0;
	$scope.totalBalance = 0;

	$scope.addTransaction = function(){
		let transactionToPush = angular.copy($scope.newTransaction);
		if (transactionToPush.type == "charge"){
			transactionToPush.charge = transactionToPush.amount;
			$scope.totalBalance -= parseFloat(transactionToPush.amount);
			$scope.totalCharges += parseFloat(transactionToPush.amount);
		} else {
			transactionToPush.credit = transactionToPush.amount;
			$scope.totalBalance += parseFloat(transactionToPush.amount);
			$scope.totalCredits += parseFloat(transactionToPush.amount);
		}
		$scope.transactions.push(transactionToPush);
	}

	$scope.removeItem = function(index){
		$scope.transactions.splice(index,1);
	}

});



