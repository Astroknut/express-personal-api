var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TrailSchema = new Schema({
	name: String,
	miles: Number,
	difficulty: String,
	completed: Boolean
});

var Trail = mongoose.model('Show', TrailSchema);

module.exports = Trail;
