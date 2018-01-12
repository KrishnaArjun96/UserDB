var mongoose = require('mongoose');

// Users Schema
var userSchema = mongoose.Schema({
    SSN: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    }
});

var users = module.exports = mongoose.model('user', userSchema);

// get users
module.exports.getUsers = function (callback) {
    users.find(callback);
}

// add users
module.exports.addUser = function (user, callback) {
    users.create(user, callback);
}

// update users
module.exports.updateUser = function (SSN, user, options, callback) {
    var query = { 'SSN': SSN };
    var update = {};
    if (user.phoneNumber !== undefined) {
        update.phoneNumber = user.phoneNumber;
    }
    if (user.address !== undefined) {
        update.address = user.address;
    }
    users.findOneAndUpdate(query, update, options, callback);
}

// delete users
module.exports.removeUser = function (SSN, callback) {
    var query = { "SSN": SSN };
    users.remove(query, callback);
}
