"use strict;"

angular.module('bankingApp').service('Trans', function($http, $q){



	//  what does the first return do?
	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/transactions'
		})
		.then( res => {
			if (res.data.length)
				return $q.resolve(res.data);
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (transaction) => {
		if (transaction == "charge"){
			transaction.amount = transaction.amount * -1;
		}
		return $http({
			method:'POST',
			url: '/transactions',
			data: transaction
		})
		.then( res => {
			if (res.data){
				return $q.resolve(res.data);
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (transaction) => {
		return $http({
			method:'DELETE',
			url: '/transactions/' + transaction.id
		});
	}




});




