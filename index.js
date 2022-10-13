const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

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

const dbConnect = mongoose.createConnection('mongodb+srv://admin:admin123@cardgamecluster.k5l2m4b.mongodb.net/'.concat('Card_Game_Database'));
const account = dbConnect.model('account', userSchema);

dbConnect.on('error', () => {
    console.log(console, 'connection error')
});
dbConnect.on('open', () => {
    console.log('connection to database successful. Awaiting API calls')
});

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


app.post('/login', async (req, res) => {

    const profile = await account.findOne({username: req.body.username, password: req.body.password}).exec();
        console.log('found account:');
        console.log(profile);
   
        res.send(profile);
    });

app.listen(8000, (err) => {
    (err) ? console.log('error spinning up server') : console.log('waiting for requests on port 8000');
})