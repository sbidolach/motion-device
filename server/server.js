var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static('./dist/public'));

app.get('/', function(req, res){
  res.render('index');
})

// Start the server on port provided by grunt-express-server
http.listen(process.env.PORT, function() {
    console.log('Express server listening on port ' + process.env.PORT);
});

module.exports = app;
