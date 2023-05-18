const express = require('express');
const fs = require('fs');
const app = express();
const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

// this are the middlewares
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); // for serving static assets'
app.set('views', './views');
app.set('view engine', 'pug');

// Global variable to store users
let users = [];

// Function to load users from 'users.json'
function loadUsers() {
  const data = fs.readFileSync('users.json');
  users = JSON.parse(data);
}

// Function to save users to 'users.json'
function saveUsers() {
  const data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
}

// Load initial set of users
loadUsers();

// routes
app.get('/newUser', (req, res) => {
  res.render('newUser', { user: {} });
});

app.get('/', (req, res) => {
  res.redirect('/userList');
});

app.post('/createUser', (req, res) => {
  const user = {
    userId: uuid.v4(),
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
  users.users.push(user);
  saveUsers();
  res.redirect('/userList');
});

app.get('/userList', (req, res) => {
  loadUsers();
  res.render('userList', { users: users.users });
});

app.get('/editList/:userId', (req, res) => {
  const user = findUserById(req.params.userId);
  res.render('editList', { user });
});

app.post('/editList/:userId', (req, res) => {
  const user = findUserById(req.params.userId);
  user.username = req.body.username;
  user.name = req.body.name;
  user.email = req.body.email;
  user.age = req.body.age;
  saveUsers();
  res.redirect('/userList');
});

app.get('/delete/:userId', (req, res) => {
  users.users = users.users.filter(user => user.userId !== req.params.userId);
  saveUsers();
  res.redirect('/userList');
});

// Function to find a user by ID
function findUserById(userId) {
  return users.users.find(user => user.userId == userId);
}

//initialize the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});