const express = require('express');
const fs = require('fs');
const app = express();
const uuid = require('uuid');


// this are the middlewares
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); // for serving static assets'
app.set('views', './views');
app.set('view engine', 'pug');

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
    userId: uuid.v4(),
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
  users.users.push(user);
  let data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
  res.redirect('/userList');
});

app.get('/userList', (req, res) => {
  let primary_data = fs.readFileSync('users.json');
  let users = JSON.parse(primary_data);
  res.render('userList', { users: users.users });
});

app.get('/editList/:userId', (req, res) => {
  let primary_data = fs.readFileSync('users.json');
  let users = JSON.parse(primary_data);
  let user = users.users.find(user => user.userId == req.params.userId);
  res.render('editList', { user });
});

app.post('/editList/:userId', (req, res) => {
  let primary_data = fs.readFileSync('users.json');
  let users = JSON.parse(primary_data);
  let user = users.users.find(user => user.userId == req.params.userId);
  user.username = req.body.username;
  user.name = req.body.name;
  user.email = req.body.email;
  user.age = req.body.age;

  let data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
  res.redirect('/userList');
});

app.get('/delete/:userId', (req, res) => {

  let primary_data = fs.readFileSync('users.json');
  let users = JSON.parse(primary_data);
  users.users = users.users.filter(user => user.userId !== req.params.userId);
  let data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
  res.redirect('/userList');
});

//initialize the server    --change to PORT????--
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});