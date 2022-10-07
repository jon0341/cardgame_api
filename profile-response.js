var request = require('request');

function returnProfileData() {
    request.post(
        {
            url: 'http://localhost:3000/login',
            json: {
                firstName: "jonathan",
                lastName: "espinosa",
                profileID: 1234,
                wins: 0,
                losses: 0,
                accountDate: 100622
            },
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }



module.exports = returnProfileData;