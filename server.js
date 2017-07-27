// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/astroknut/express_self_api/README.md", 
    base_url: "http://vast-beach-40153.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "More about me!"}, 
      {method: "POST", path: "/api/trails", description: "Create a new trail!"} 
    ]
  });
});

app.get('/api/profile', function(req,res) {
  //Displays profile data
  res.json({
    name: "Chase Barrett",
    github_link: "https://github.com/Astroknut",
    github_profile_image: "Coming soon",
    current_city: "Broomfield, CO",
    pets: [{
      name: "Perseus",
      type: "cat",
      color: "black"
    },
    {
      name: "Iris",
      type: "cat",
      color: "white/black"
    }]
  });
});

app.get('/api/trails', function(req,res) {
  //get all trails as JSON
  db.Trail.find()
    .exec(function(err,trails) {
      if (err) {return console.log(err);}
      res.json(trails);
    });
});

app.get('/api/trails/:id', function(req,res) {
  //get one trail by id
  db.Trail.findOne({_id: req.params.id}, function(err,doc) {
    res.json(doc);
  });
});

app.post('/api/trails', function(req,res) {
  //creates new trail
  var newTrail = new db.Trail({
    name: req.body.name,
    miles: req.body.miles,
    difficulty: req.body.difficulty,
    completed: req.body.completed
  });
  newTrail.save(function(err,trail){
    if (err) {
      return console.log(err);
    }
    res.json(trail);
  });
});

app.put('api/trails/:id', function(req,res) {
  var id = req.params.id;
  db.Trail.findOne({_id: id}, function(err,trail) {
    if(req.body.name) trail.name = req.body.name;
    if(req.body.miles) trail.miles = req.body.miles;
    if(req.body.difficulty) trail.difficulty = req.body.difficulty;
    if(req.body.completed) trail.completed = req.body.completed;

    trail.save(function(err) {
      if(err) console.log(err);
      res.redirect('/trails');
    });
  });
});

app.delete('api/trails/:id', function(req,res) {
  var trailId = req.params.id;
  db.Trail.findOneAndRemove({_id: trailId}, function(err,deletedTrail) {
      res.json(deletedTrail);
    });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
