var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/dashboard.html'));
});

<<<<<<< HEAD
app.listen(3000, function(){
	console.info('Server listening on port ' + 3000);
});
=======
app.get('/video', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/video.html'));
});

app.listen(3000);
>>>>>>> b055bb43b19596d42a4e654cdc4fa8271d827e60
