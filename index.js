const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const database = require('./dbOperations.js');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.listen(8000, (err) => {
    (err) ? console.log('error spinning up server') : console.log('waiting for requests on port 8000');
});

app.post('/login', async (req, res) => {

    //validateLogin returns whether profile exists, and the profile's parameters.
    [profile, exists] = await database.validateLogin(req.body.username, req.body.password);
    
    if(exists) {
        console.log(profile);
        res.send(profile);
    }
    else{
        console.log('not found');
        res.send('does not exist');
    }

});

//when API receives form info to 'createAccount' endpoint, a new profile is created in the database for it. it is logged in the console
app.post('/createAccount', async(req, res) => {
    const accounts = await database.account.create ({
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

app.post('/deleteAccount', async(req, res) => {
    const toDelete = await account.findOne({username: req.body.username, password: req.body.password}).exec();
    await account.deleteOne({username: req.body.username, password: req.body.password}).exec();
        console.log("following profile deleted:");
        console.log(toDelete);
        res.send("deleted");
});