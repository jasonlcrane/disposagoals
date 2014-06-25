var goalControllers = angular.module('goalControllers', ['ngAnimate', 'webStorageModule']);

goalControllers.controller('ListController', ['$scope', '$http', 'webStorage', function($scope, $http, webStorage) {
	// clear webStorage when needed for dev
	// webStorage.clear();

	$scope.goals = webStorage.get('goals') || [];

	$scope.daysTillDue = function(item) {
		var date = item.goal_due;
		console.log(date);
        var d2 = new Date();
        var d1 = new Date(date);

        var t2 = d2.getTime();
        
        var t1 = d1.getTime();

        return parseInt((t1-t2)/(24*3600*1000));
	}


}]);

goalControllers.controller('DetailsController', ['$scope', '$http', '$routeParams', 'webStorage', function($scope, $http, $routeParams, webStorage) {
		$scope.goals = webStorage.get('goals') || [];
		$scope.whichItem = $routeParams.itemId;

		$scope.completeGoalsCount = function(goal) {
		    var count = 0;
		    angular.forEach(goal.i_goals, function(i_goal) {
			    count += i_goal.i_goal_complete == 'incomplete' ? 1 : 0;
		    });
		    return count; 
		}
	
		$scope.completeGoal = function($index, goal) {

			/*if (goal.i_goal_complete === 'incomplete') {
		    	goal.i_goal_complete = 'complete';
	    	}
	    	else {
	    		goal.i_goal_complete = 'incomplete';
	    	}*/
	    	angular.forEach(goal.i_goals, function(the_goal, i) {
	    		console.log(i);
	    		console.log($index);
	    		if (i < $index +1) {
			    	the_goal.i_goal_complete = 'complete';
			    }
		    });
	    	webStorage.add('goals', $scope.goals);
	    	$scope.showComplete = true;
	    }
		
		$scope.isComplete = function(complete) {
			if (complete === 'complete') {
		   		return false; 
		    }
		    return true;
		}

		$scope.showComplete = false;
		$scope.toggleComplete = function() {
			console.log($scope.showComplete);
            $scope.showComplete = $scope.showComplete === false ? true: false;
        };

		if ($routeParams.itemId > 0) {
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
		}
}]);

goalControllers.controller('NewController', ['$scope', '$http', '$location', 'webStorage', function($scope, $http, $location, webStorage) {
	/*$http.get('js/data.json').success(function(data) {
		$scope.goals = data;
		$scope.goalOrder = 'goal';
	});*/

	// clear webStorage when needed for dev
	// webStorage.clear();

	$scope.goals = webStorage.get('goals') || [];

	console.log($scope.goals);

	$scope.submit = function() {
        var i_goal = [];
        console.log(this.goal_type);
        for (var i = 0; i < this.goal_number; i++) {
        	i_goal.push({
        		"i_goal_num": i + 1,
        		"i_goal_complete": 'incomplete'
        	});
        }
        $scope.goals.push({
        	"goal_type": this.goal_type,
        	"goal_number": this.goal_number,
        	"goal_due": this.goal_due,
        	"i_goals": i_goal
        });

        webStorage.add('goals', $scope.goals);

         $location.path('/list');
        
    };

   

}]);