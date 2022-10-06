const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const profileResponse = require('./profile-response.js');
const returnProfileData = require('./profile-response');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.post('/login', (req, res) => {
    console.log(req.body);
    returnProfileData();
    console.log("login info retrieved/sent");
    res.send('done');
});








app.listen(8000, (err) => {
    (err) ? console.log('error spinning up server') : console.log('waiting for requests on port 8000');
})