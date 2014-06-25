'use strict';
 
angular.module('GoalService', []).factory('Goal', ['$resource', // function($http) {
	/*return {
		// get all goals
		get : function() {
			console.log('getting');
			return $http.get('/api/goals');
		},

		// create new goal
		create: function(goalData) {
			console.log(goalData);
			return $http.post('/api/goals', goalData);
		},

		// delete goal
		delete: function(id) {
			return $http.delete('/api/goals', id);
		}
	}*/
	function($resource) {
	    return $resource('/api/goals/:goalId',
	    	{ goalId: '@_id' },
	    	{ update: { method: 'PUT' } }
	    );
	  }
  
  
]);