const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//scheme/json structure for user profiles 
let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    profileID: String,
    wins: String,
    losses: String,
    accountDate: String,
    username: String,
    password: String
});

//set up connection to database, specify 'account' collection and userSchema to be used for these operations 
const dbConnect = mongoose.createConnection('mongodb+srv://admin:admin123@cardgamecluster.k5l2m4b.mongodb.net/'.concat('Card_Game_Database'));
const account = dbConnect.model('account', userSchema);

//error if connection error
dbConnect.on('error', () => {
    console.log(console, 'connection error')
});

//logs success message when connection successful
dbConnect.on('open', () => {
    console.log('connection to database successful. Awaiting API calls')
});

//when API receives form info to 'createAccount' endpoint, a new profile is created in the database for it. it is logged in the console
app.post('/createAccount', async(req, res) => {
    const accounts = await account.create ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileID: req.body.profileID,
        wins: req.body.wins,
        losses: req.body.losses,
        accountDate: req.body.accountDate,
        username: req.body.username,
        password: req.body.password
    })

    console.log(accounts);
    res.end();
});

//when a username and password is sent via form data to the 'login' endpoint, the database is queried for the associated account
//profile info is sent to the card game application to be displayed, modified, etc 
app.post('/login', async (req, res) => {

    const profile = await account.findOne({username: req.body.username, password: req.body.password}).exec();
        console.log('found account:');
        console.log(profile);
   
        res.send(profile);
    });

app.listen(8000, (err) => {
    (err) ? console.log('error spinning up server') : console.log('waiting for requests on port 8000');
})