const mongoose = require('mongoose');

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

/**
 * @param {user} requestor's username
 * @param {password} requestor's password
 * @returns user's profile and whether it exists, if it does not then profile is null in addition to exist = false
 */
async function validateLogin(user, password) {
    const profile = await account.findOne({username: user, password: password}).exec();
    var exists = true;
    if(profile === null)
        exists = false;
    return [profile, exists]
}

exports.dbConnect = dbConnect;
exports.account = account;
exports.validateLogin = validateLogin;
