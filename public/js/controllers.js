"use strict;"


angular.module('bankingApp', ['ui.bootstrap']).controller('mainController', function($scope,$http,Trans) {

	$scope.transactions = [];
	$scope.newTransaction = {};
	$scope.newTransaction.type = "charge";


	$scope.$watch('transactions', function(newTrans){
		$scope.totalCharges = newTrans.reduce( (a,b) => {
			if (b.type == 'charge')
				return a + b.amount;
			else return a;
		},0);

		$scope.totalCredits = newTrans.reduce( (a,b) => {
			if (b.type == 'credit')
				return a + b.amount;
			else return a;
		},0);

		$scope.totalBalance = newTrans.reduce( (a,b) => {
			return a + b.amount;
		},0);
	}, true);


	Trans.getAll()
	.then( function(transes){
		if(transes){
			transes.forEach( trans => {
				$scope.transactions.push(trans);
			});
		}
	})
	.catch( err => {
		console.log(err);
	});
	
	$scope.addTransaction = function(transaction){
		Trans.addOne(transaction)
		.then( function(trans){
			$scope.transactions.push(trans);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeItem = function(index){
		Trans.removeOne($scope.transactions[index])
		.then( function(){
			$scope.transactions.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

});



