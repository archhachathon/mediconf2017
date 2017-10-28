// Twilio Credentials
const accountSid = 'AC2f877c67f02edcbe8479a8fa21b89253';
const authToken = '115e66de11ace97dfa3d083ff4980d34';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

//phone numbers

client.messages
  .create({
    to: ['+19174598797','+3126102079'],
    from: '+13142079612',
    body: 'This is test message from twilio!',
  })
  .then((message) => console.log(message.sid));