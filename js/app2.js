var express = require('express');
var app = express();
var path = require('path');

var accountSid = 'AC2f877c67f02edcbe8479a8fa21b89253'; // Your Account SID from www.twilio.com/console
var authToken = '115e66de11ace97dfa3d083ff4980d34';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
var count = 0;


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname + '/../html/dashboard.html'));
});


app.get('/dashboard/sendSMS', function(req, res) {
    // res.sendFile(path.join(__dirname + '/../html/dashboard.html'));
    count++;

    client.messages.create({
    to: '+13216102079',  // Text this number
    from: '+13142079612', // From a valid Twilio number
    body: "https://189e1465.ngrok.io"  + count
	})
// .then((message) => console.log(message.sid));
	.then(function(message){
		console.log('message sent');
	});
});



app.listen(3000, function(){
	console.info('Server listening on port ' + 3000);
});
