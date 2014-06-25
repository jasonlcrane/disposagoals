// app/routes.js
var mongoose = require('mongoose'),
  Goal = mongoose.model('Goal');

module.exports = function(app) {

	// server routes ========
	// handle things like api calls
	// authentication routes

	// api route
	app.get('/api/goals', function(req, res) {
		console.log('get goals request');
		Goal.find().exec(function(err, goal) {
		    if (err) {
		      console.log(err);
		    } else {
		      res.json(goal);
		    }
		  });
	});

	app.get('/api/goals/:id', function(req, res) {
		Goal.findById(req.params.id).exec(function(err, goal) {
		    if (err) {
		      console.log(err);
		    } else {
		      res.json(goal);
		    }
		  });
	});

	app.put('/api/goals/:id', function(req, res) {
		var goal = req.body;
		var query = { _id: req.params.id};
		console.log(query);
		Goal.update(query, { i_goals: goal.i_goals }, function(err) {
			if (err) {
				console.log(err);
			} else {
				res.jsonp(goal);
			}
		});
	});

	app.post('/api/goals', function(req, res) {
		
		var goal = new Goal(req.body);
	  	
	  	goal.save(function(err) {

			// if there's an error, send it
			if (err) {
				res.send(err);
			}

			res.json(goal); // return goal as JSON
		});
	});

	
	// route to handle deleting - app.delete

	// frontend routes =========
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the public index file
	});
};