const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const profileResponse = require('./profile-response.js');
const returnProfileData = require('./profile-response');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.post('/login', (req, res) => {
    console.log(req.body);
    const profileInfo = {
        firstName: "jonathan",
                lastName: "espinosa",
                profileID: 1234,
                wins: 0,
                losses: 0,
                accountDate: 100622
    };
    res.send(profileInfo);
    console.log("login info retrieved/sent");
});

app.listen(8000, (err) => {
    (err) ? console.log('error spinning up server') : console.log('waiting for requests on port 8000');
})