const express = require('express');
const fs = require('fs');
const app = express();
const uuidd = require('uuidd');

// this are the middlewares
app.use(express.static('public'));  //static page
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');



//initialize the server    --change to PORT????--
app.listen(3000, () => {
    console.log('Server up and listening on port 3000');
})