/*
npm init -y
npm install express
npm install cookie-parser
*/
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function(req, res){
    res.send('<h1>Cookies Example</h1>');
 });

app.get('/set', function(req, res){
   res.cookie('fav_color', 'green');
   //set cookie for 5 seconds
   //res.cookie('fav_color', 'green', {expire: 5000 + Date.now()});
   //res.cookie('fav_color', 'green', {maxAge: 5000});
   res.send('Cookies has been set!');
});

app.get('/show', function(req, res){
    res.send(req.cookies);
 });

 app.get('/delete', function(req, res){
    res.clearCookie('fav_color');
    res.send('Cookie <b>fav_color</b> deleted.');
 });

app.listen(3000, () => console.log('Server is listening...'));
