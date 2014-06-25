'use strict';

// var goalControllers = angular.module('goalControllers');

angular.module('MainCtrl', []).controller('MainController', ['$scope', function($scope) { // webStorage
	$scope.tagline = "hi";
}]);

angular.module('ListCtrl', []).controller('ListController', ['$scope', '$location', 'Goal', function($scope, $location, Goal) { // webStorage
	// clear webStorage when needed for dev
	// webStorage.clear();
	console.log('list controller');
	// $scope.goals = webStorage.get('goals') || [];
	$scope.goals = [];
	
	$scope.goals = Goal.query();

	$scope.getAllGoals = function() {
	  Goal.get(function(goals) {
	    $scope.goals = goals;
	    console.log(goals);
	  });
	};

	$scope.daysTillDue = function(item) {
		var date = item.goal_due;
		console.log(date);
        var d2 = new Date();
        var d1 = new Date(date);

        var t2 = d2.getTime();
        
        var t1 = d1.getTime();

        return parseInt((t1-t2)/(24*3600*1000));
	};

	$scope.goto = function(path){
		console.log(path);
	    $location.path(path);
	};

	$scope.incompleteGoalCount = function(goal) {
		// $scope.completeGoalServicesCount = function(goal) {
	    // var goal = $scope.goals[item];
	    var count = 0;
	    if (goal && goal.i_goals) {
		    angular.forEach(goal.i_goals, function(i_goal) {
			    count += i_goal.i_goal_complete === 'complete' ? 1 : 0;
		    });
		    return count;
	    }
	    else {
	    	return '-';
	    }
	};


}]);

angular.module('DetailsCtrl', []).controller('DetailsController', ['$scope', '$http', '$location', '$routeParams', 'Goal', function($scope, $http, $location, $routeParams, Goal) {
		// $scope.whichItem = $routeParams._id;

		$scope.goal = {};
		Goal.get({ goalId: $routeParams.id }, function(goal) {
			$scope.goal = goal;
		
			/*$scope.goals = true;
			$scope.goals = Goal.query();
			$scope.goal = true;*/

			/*$scope.getGoal = function() {
			  Goal.query(function(goals) {
			  	console.log(goals);
			    $scope.goals = goals;
			    angular.forEach(goals, function(goal) {
			    	if (goal._id === $scope.whichItem) {
			    		$scope.goal = goal;
			    		console.log(goal);
			    		return goal;
			    	}
			    });
			    
			  });
			};*/


			$scope.addComplete = function(n) {

			}
			$scope.completeGoalCount = function(goal) {
			// $scope.completeGoalServicesCount = function(goal) {
			    // var goal = $scope.goals[item];
			    var count = 0;
			    if (goal && goal.i_goals) {
				    angular.forEach(goal.i_goals, function(i_goal) {
					    count += i_goal.i_goal_complete === 'incomplete' ? 1 : 0;
				    });
				    return count;
			    }
			    else {
			    	return '-';
			    }
			};

			$scope.incompleteGoalCount = function(goal) {
			// $scope.completeGoalServicesCount = function(goal) {
			    // var goal = $scope.goals[item];
			    var count = 0;
			    if (goal && goal.i_goals) {
				    angular.forEach(goal.i_goals, function(i_goal) {
					    count += i_goal.i_goal_complete === 'complete' ? 1 : 0;
				    });
				    return count;
			    }
			    else {
			    	return '-';
			    }
			};
		
			
			$scope.completeGoal = function($index, goal) {
		    	angular.forEach(goal.i_goals, function(the_goal, i) {
		    		if (i < $index +1) {
				    	the_goal.i_goal_complete = 'complete';
				    }
			    });
		    	
		    	goal.$update(function() {
		    		$location.path('/' + $routeParams.id);
		    	});

		    	$scope.goal = goal;
		    };
			
			$scope.isComplete = function(complete) {
				if (complete === 'complete') {
			   		return false; 
			    }
			    return true;
			};

			$scope.showComplete = true;
			$scope.showComplete = $scope.showComplete === false ? true: false;
			$scope.toggleComplete = function() {
				console.log($scope.showComplete);
	            $scope.showComplete = $scope.showComplete === false ? true: false;
	        };

        });

		$scope.completeGoalCustom = function() {
			var index = $scope.incompleteGoalCount($scope.goal) -1 + parseInt(this.customUpdate, 10);
			$scope.completeGoal(index, $scope.goal);
			
		}

		/*if ($routeParams.itemId > 0) {
			$scope.prevItem = Number($routeParams.itemId) - 1;
		}
		else {
			$scope.prevItem = $scope.goals.length - 1;
		}
		if ($routeParams.itemId < $scope.goals.length - 1) {
			$scope.nextItem = Number($routeParams.itemId) + 1;
		}
		else {
			$scope.nextItem = 0;
		}*/
}]);

angular.module('NewCtrl', []).controller('NewController', ['$scope', '$http', '$location', 'Goal', function($scope, $http, $location, Goal) {
	/*$http.get('js/data.json').success(function(data) {
		$scope.goals = data;
		$scope.goalOrder = 'goal';
	});*/

	// clear webStorage when needed for dev
	// webStorage.clear();

	// $scope.goals = webStorage.get('goals') || [];

	$scope.create = function() {
        var i_goal = [];
        for (var i = 0; i < this.goal_number; i++) {
        	i_goal.push({
        		i_goal_num: i + 1,
        		i_goal_complete: 'incomplete'
        	});
        }

        console.log(i_goal);

        /*var goal = Goal.create({
        	goal_type: this.goal_type,
        	goal_number: this.goal_number,
        	goal_due: this.goal_due,
        	i_goals: i_goal
        });*/

		var goal = new Goal({
        	goal_type: this.goal_type,
        	goal_number: this.goal_number,
        	goal_due: this.goal_due,
        	i_goals: i_goal
        });
        
        
        /*$scope.goals.push({
        	'goal_type': this.goal_type,
        	'goal_number': this.goal_number,
        	'goal_due': this.goal_due,
        	'i_goals': i_goal
        });*/

        goal.$save(function() {
        	$location.path('/');
        });

        // webStorage.add('goals', $scope.goals);

        //$location.path('/disposagoal');
        
    };

   

}]);