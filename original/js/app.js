var dspg = angular.module('dspg', [
	'ngRoute',
	'webStorageModule',
	'goalControllers'
]);

dspg.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/list', {
			templateUrl: 'partials/list.html',
			controller: 'ListController'
		}).
		when('/new', {
			templateUrl: 'partials/new.html',
			controller: 'NewController'
		}).
		when('/details/:itemId', {
			templateUrl: 'partials/details.html',
			controller: 'DetailsController'
		}).
		otherwise({
			redirectTo: '/list'
		});
}]);


dspg.directive("collapseComplete", function() {
		  return {
		    link: function(scope, elem, attrs) {
		      var duration = parseInt(attrs.mmBox);
		       scope.collapse = function(value) {
		         console.log("1. " + value);
		         console.log("2. " + attrs.mmBox);
		         console.log("3. " + attrs.fadeDuration); 
		         elem.fadeOut(duration);
		      }
		    } 
		  }
		});