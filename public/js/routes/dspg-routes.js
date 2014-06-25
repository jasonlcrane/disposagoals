'use strict';

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/list.html',
			controller: 'ListController'
		})

		.when('/new', {
			templateUrl: 'views/new.html',
			controller: 'NewController'
		})

		.when('/:id', {
			templateUrl: 'views/details.html',
			controller: 'DetailsController'	
		});

	$locationProvider.html5Mode(true);

}]);