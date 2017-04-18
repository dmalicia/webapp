var express = require('express');
var bodyParser = require('body-parser');

// create our app
var app = express();

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
app.get('/', function(req, res){
  // The form's action is '/' and its method is 'POST',
  // so the `app.post('/', ...` route will receive the
  // result of our form
  var html = '<form action="/" method="post">' +
               '<br>' +
               '<br>' +
               'Enter your name:' +
               '<input type="text" name="name" placeholder="" />' +
               '<br>' +
               'Enter your Color:' +
               '<input type="text" name="color" placeholder="" />' +
               '<br>' +
               'Cats or Dogs:' +
               '<input type="text" name="catsdogs" placeholder="" />' +
               '<br>' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';

  res.send(html);
});
app.post('/', function(req, res){
  var username = req.body.name;
  var color = req.body.color;
  var catsdogs = req.body.catsdogs;
  var spawn = require("child_process").spawn;
  var process = spawn('python',["webapp_api.py", username, color, catsdogs ]);

  var html = 'Hello: ' + username + color + catsdogs + '.<br>' +
             '<a href="/">Try again.</a>';
  res.send(html);
});

app.listen(8091);
