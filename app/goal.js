'use strict';
 
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
/**
 * Goal Schema
 */
var GoalSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  goal_type: {
    type: String,
    default: '',
    trim: true
  },
  goal_number: {
    type: Number,
    default: '',
    trim: true
  },
  goal_due: {
    type: Date,
    default: ''
  },
  i_goals: {
  	type: Array,
  	default: []
  }
});
 
mongoose.model('Goal', GoalSchema);