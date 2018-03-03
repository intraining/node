const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

//use partial views
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// //create middleware
// //define from where to serve static pages
// app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server log');
    }

  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//create middleware
//define from where to serve static pages
app.use(express.static(__dirname + '/public'));

//register helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//get route
app.get('/', (req, res) => {
  //res.send('<h1>hello express</h1>');
  // res.send({
  //   name: 'luis',
  //   likes: {
  //     books: 'paper',
  //     books2: 'paperwhite'
  //   }
  // });
  res.render('home.hbs', {
    pageTitle: 'Home page',
    // currentYear: new Date().getFullYear(),
    welcomeMsg: 'Welcome to node page',
    content: {
        name: 'luis',
        likes: {
          books: 'paper',
          books2: 'paperwhite'
          }
      }
    });
});
//get route2
app.get('/about', (req, res) => {
  //res.send('about');
  res.render('about.hbs', {
    pageTitle: 'about page',
    // currentYear: new Date().getFullYear()
  });
});

//bad route send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'there was a problem',
    properties: {
      errorType: 400,
      server: 3000
    }
  });

});

//start listening on port
// app.listen(3000, () => {
//   console.log('server is up on port 3000');
// });
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
