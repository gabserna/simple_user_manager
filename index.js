const express = require("express");
const fs = require("fs");
const app = express();
const uuid = require("uuid");

// setup middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views"); // views directory as template folder file
app.set("view engine", "pug");

let users = [];

function loadUsers() {
  //read users data from json file and parse it
  const data = fs.readFileSync("users.json", "utf-8");
  users = JSON.parse(data).users;
}

function saveUsers() {
  // this convert 'users' array to JSON and write it to json
  const data = JSON.stringify({ users });
  fs.writeFileSync("users.json", data, "utf-8");
}
loadUsers();

app.get("/", (req, res) => {
  res.redirect("/newUser"); //redirect root URL to '/newUser' as homepage
});

app.get("/newUser", (req, res) => {
  res.render("newUser", { user: {} });
});

//creates a new user and redirect to '/userList'
app.post("/createUser", (req, res) => {
  const user = {
    userId: uuid.v4(), //this adds a unique user ID
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };
  users.push(user); //add the new user to the 'users' array
  saveUsers();
  res.redirect("/userList");
});

//render 'userList' template with the 'users' array
app.get("/userList", (req, res) => {
  loadUsers(); //reload users from json
  res.render("userList", { users });
});

//render 'editList' template with the selected user object
app.get("/editList/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = findUserById(userId);
  res.render("editList", { user });
});

//edit user information and redirect to '/userList'
app.post("/editList/:userId", (req, res) => {
  const userId = req.params.userId;
  const userIndex = findUserIndexById(userId);
  if (userIndex !== -1) {
    //update user properties with the new values keeping the unique id provided
    users[userIndex].username = req.body.username;
    users[userIndex].name = req.body.name;
    users[userIndex].email = req.body.email;
    users[userIndex].age = req.body.age;
    saveUsers();
  }
  res.redirect("/userList");
});

// Delete a user and redirect to '/userList'
app.get("/deleteUser/:userId", (req, res) => {
  const userId = req.params.userId;
  const userIndex = findUserIndexById(userId);
  if (userIndex !== -1) {
    //remove the user from the array
    users.splice(userIndex, 1);
    saveUsers();
  }
  res.redirect("/userList");
});

//find a user in the 'users' array by user ID
function findUserById(userId) {
  return users.find((user) => user.userId === userId);
}

//find the index of a user in the 'users' array by user ID
function findUserIndexById(userId) {
  return users.findIndex((user) => user.userId === userId);
}
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
