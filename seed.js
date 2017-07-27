// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var trail_list = [{
	name: "Emerald Lake",
	miles: 3.5,
	difficulty: "easy",
	completed: true
},
{
	name: "Mills Lake",
	miles: 5.3,
	difficulty: "moderate",
	completed: true
},
{
	name: "Horsetooth Rock",
	miles: 6.1,
	difficulty: "moderate",
	completed: true
}, 
{
	name: "Lily Mountain",
	miles: 4.0,
	difficulty: "moderate",
	completed: true
}];


db.Trail.remove({}, function(err,trails) {
	if(err) {
		console.log('Error occured in remove', err);
	} else {
		console.log('removed all trails');
	}

	db.Trail.create(trail_list, function(err, trail){
  		if (err){
    	return console.log("Error:", err);}
    	process.exit();
		console.log("Created new trail", trail._id);
  		process.exit(); // we're all done! Exit the program.
	});
});	
