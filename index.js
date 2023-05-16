const express = require('express');
const fs = require('fs');
const app = express();
const uuidd = require('uuidd');


// this are the middlewares
app.use(express.static('public'));  //static page
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');

// get data to json file
let primary_data = fs.readFileSync('users.json');
let users = JSON.parse(primary_data);

// routes
app.get('/newUser', (req, res) => {
    res.render('newUser', { user: {} });
});

app.get('/', (req, res) => {
    res.redirect('/userList');
});

// what will goint to happend when user clicks the input button ???????
app.post('/createUser', (req, res) => {
    const user = {
        userId: uuidd.v4(),
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    };
    users.users.push();
    let data = JSON.stringify(users);
    fs.writeFileSync('users.json', data);
    res.redirect('/userList');
});

app.get('/userList', (req, res) => {
    let primary_data = fs.readFileSync('users.json');
    let users = JSON.parse(primary_data);
    res.render();
});

app.get('/editList/:userId', (req, res) => {
    let primary_data = fs.readFileSync('users.json');
    let users = JSON.parse(primary_data);
    res.render();
});
app.post('/editList/:userId', (req, res) => {
    let primary_data = fs.readFileSync('users.json');
    let users = JSON.parse(primary_data);
    res.render();
});


app.get('/delete:userId', (req, res) => {
    let primary_data = fs.readFileSync('users.json');
    let users = JSON.parse(primary_data);
    res.render();
});

//initialize the server    --change to PORT????--
app.listen(3000, () => {
    console.log('Server up and listening on port 3000');
})