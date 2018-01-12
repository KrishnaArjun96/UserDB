var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

users = require('./models/users');

// Connect to mongoose
//mongoose.connect('mongodb://localhost/users', { useMongoClient: true });
mongoose.connect('mongodb://mongo', { useMongoClient: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected to mongodb")
});

app.get('/', function () {
    res.send("Hello World");
});

app.get('/users', function (req, res) {
    users.getUsers(function (err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});

app.post('/users', function (req, res) {
    var user = req.body;
    users.addUser(user, function (err, retUser) {
        if (err) {
            throw err;
        }
        res.json(retUser);
    });
});

app.put('/users/:SSN', function (req, res) {
    var SSN = req.params.SSN;
    var user = req.body;
    users.updateUser(SSN, user, {}, function (err, retUser) {
        if (err) {
            throw err;
        }
        res.json(retUser);
    });
});

app.delete('/users/:SSN', function (req, res) {
    var SSN = req.params.SSN;
    users.removeUser(SSN, function (err, retUser) {
        if (err) {
            throw err;
        }
        res.json(retUser);
    });
});

app.listen(3000);
console.log("Runnning on port 3000");
