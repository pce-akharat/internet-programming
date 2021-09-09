/*
npm init -y
npm install express
npm install cookie-parser
npm install express-session
*/
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const secret_key = crypto.randomBytes(16).toString('hex');
const app = express();

app.use(cookieParser());
app.use(session({
    secret: secret_key,
    resave: true,
    saveUninitialized: true
}));

app.get('/', function(req, res) {
    req.session.fav_color = 'green';
    res.send("<h1>Sessions Example</h1>");
});

app.get('/color', function(req, res) {
    res.send("Your favourite color: " + req.session.fav_color);
 });

app.get('/count', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });

 app.get('/destroy', function(req, res) {
    req.session.destroy();
    res.send('Session destoyed!');
 });

app.listen(3000, () => console.log('Server is listening...'));
