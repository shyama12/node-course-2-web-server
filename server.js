const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3001;

var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})

app.set('view engine','hbs');


//middleware


//for logging into server.log
app.use((req,res,next)=>{
var now = new Date().toString();

var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log +'\n',(err)=>{

if (err) { console.log('Unable to log'); }
});
next();
});

//maintenance.hbs rendering
/*app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});*/

//for importing files from public folder
app.use(express.static(__dirname + '/public'));

//home page rendering for '/' with hbs
app.get('/', (req,res) => {

res.render('home.hbs',{
	pageTitle: 'Home Page',
	welcomeMessage: 'Welcome to the website!'
});

});

//about page rendering for '/about' with hbs
app.get('/about',(req,res)=>{
res.render('about.hbs',{
	pageTitle: 'About Page'
});
});

//bad page rendering for '/bad' with hbs
app.get('/bad',(req,res)=>{
res.send({ errorMessage:'Unable to get response' });
});

//projects page rendering for '/projects' with hbs
app.get('/projects',(req,res)=>{
res.render('projects.hbs',{
	pageTitle: 'Projects Page'
});
});


//adding listener to listen to the app(binding app to a host in this case a localhost with port number 3000)

//heroku sets port


app.listen(port, ()=> {
console.log(`Server is up on port ${port}`);
});