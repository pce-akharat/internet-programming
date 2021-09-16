const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const path = require('path');
const secret_key = crypto.randomBytes(64).toString('hex');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(session({
   secret: secret_key,
   resave: true,
   saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({
   extended: true
}));

const users = [];

app.get('/', function(req, res){
   if(!req.session.user){
      res.render('login');
   }
   else{
      res.render('index', {id: req.session.user.id})
   }
});

app.get('/signup', function(req, res){
   res.render('signup');
});

app.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.status("400");
      res.send("Invalid details!");
   } else {
      users.filter(function(user){
         if(user.id === req.body.id){
            res.render('signup', {
              message: "User Already Exists! Login or choose another user id"});
         }
      });
     const newUser = {id: req.body.id, password: req.body.password};
     users.push(newUser);
     req.session.user = newUser;
     res.render('index', {id: req.session.user.id});
  }
});

app.get('/login', function(req, res){
   res.render('login');
});

app.post('/login', function(req, res){
   if(users.length > 0 && (!req.body.id || !req.body.password)){
      res.render('login', {message: "Please enter both id and password"});
   } else {
      users.filter(function(user){
         if(user.id === req.body.id && user.password === req.body.password){
            req.session.user = user;
            res.render('index', {id: user.id});
         }
         else {
            res.render('login', {message: "Invalid credentials!"});
         }
      });
   }
});

app.get('/logout', function(req, res){
   console.log(req.session.user.id + " logged out.")
   req.session.destroy();
   res.redirect('/login');
});

module.exports = app;
