const express = require('express');
const fs = require('fs');
const app = express();
const uuid = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

let users = [];

function loadUsers() {
  const data = fs.readFileSync('users.json', 'utf-8');
  users = JSON.parse(data).users;
}

function saveUsers() {
  const data = JSON.stringify({ users });
  fs.writeFileSync('users.json', data, 'utf-8');
}

loadUsers();

app.get('/', (req, res) => {
  res.redirect('/newUser');
});

app.get('/newUser', (req, res) => {
  res.render('newUser', { user: {} });
});


app.post('/createUser', (req, res) => {
  const user = {
    userId: uuid.v4(),
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
  users.push(user);
  saveUsers();
  res.redirect('/userList');
});

app.get('/userList', (req, res) => {
  loadUsers();
  res.render('userList', { users });
});

app.get('/editList/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = findUserById(userId);
  res.render('editList', { user });
});

app.post('/editList/:userId', (req, res) => {
  const userId = req.params.userId;
  const userIndex = findUserIndexById(userId);
  if (userIndex !== -1) {
    users[userIndex].username = req.body.username;
    users[userIndex].name = req.body.name;
    users[userIndex].email = req.body.email;
    users[userIndex].age = req.body.age;
    saveUsers();
  }
  res.redirect('/userList');
});

app.get('/deleteUser/:userId', (req, res) => {
  const userId = req.params.userId;
  const userIndex = findUserIndexById(userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    saveUsers();
  }
  res.redirect('/userList');
});

function findUserById(userId) {
  return users.find(user => user.userId === userId);
}

function findUserIndexById(userId) {
  return users.findIndex(user => user.userId === userId);
}

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});