const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
 
 app.use((req,res,next)=>{
      var now = new Date();
      var log=`${now} : ${req.method} ${req.url}`;
      console.log(log);  //will print method request and path to it with current date n time
      fs.appendFile('server.log',log+'\n',(err)=>{
          if(err){
              console.log('unable to append to file');
          };
      });
      next();
 });
 //by using app.use()  we register middleware
 //we have to call next() at last in user defined middleware otherwise server wont load
 //we are calling middleware without next thus only maintainance page will show on each request  after maintainace middleware

app.use(express.static(__dirname+'/public')); 
 //using home temlate from views folder
app.get('/',(req,res)=>{
res.render('home.hbs',{
    pageTitle: 'Home page',
    welcome: 'welcome home' 
});   //http://localhost:3000  //pageTitle , paragraph and currentYear in footer is dynamic data
});
//using about template
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'about page',
    })  //will render at http://localhost:3000/about //pageTitle and currentYear is dynamic data
});

app.listen(port,()=>{
    console.log(`server is up at port ${port} ` );
});