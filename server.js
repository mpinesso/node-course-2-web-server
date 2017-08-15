const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// process.env contiene tutte le variabili ambientali del PC
// questa riga di codice consente all'applicazione di funzionare sia su HEROKU (o qualsiasi altro cloud application platform)
// sia in locale, in quando andiamo a settare la porta su cui poter richiamare la nostra applicazione e
// dato che in locale non abbiamo la variabile locale PORT, setteremo la variabile port a 3000 di default
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  })

  next();
});

// app.use((req, res, next) =>{
//   res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// "funzione" richiamabile da ogni pagina
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.get('/', (request, response) => {
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
