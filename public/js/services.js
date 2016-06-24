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
		.catch(err => {console.log('err: ', err)});		
	}
});

	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/transactions'
		})
		.then( res => {
			if (res.data.length)
				return $q.resolve(res.data);
		})
		.catch(err => {console.log('err: ', err)});		
	}
});





