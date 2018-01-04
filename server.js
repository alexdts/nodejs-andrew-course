const express = require('express');
const hbs = require('hbs'); /* view engine tou handlebars gia to express */
const fs = require('fs');

const port = process.env.PORT || 3000; /* gia na mporei to heroku na orisei diko tou port sto app mas */
const app = express();

hbs.registerHelper('getCurrentYear', () => { /* isxiei gia ola ta routes */
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

hbs.registerPartials(__dirname + '/views/partials'); /* orizoume to path gia ta partials. ta partials einai arxia me kodika o opoios mporei na xrisimopiithei sta views me dinamiko tropo */
app.set('view engine', 'hbs');

/* MIDDLEWARE */
// app.use((req, res, next) => { /* me tin xrish tis methodou use dimiourgoume middlewares */
//   const now = new Date().toString();
//   const log = `${now}: ${req.method} ${req.url}`;

//   console.log(log);
//   fs.appendFile('server.log', log + '\n', (err) => {
//     if (err) {
//       console.log('Unable to append to server.log');
//     }
//   });
//   next();
// });

/* app.use((req, res, next) => {
  res.render('maintenance.hbs')
}); */

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => { /* me to app.get dimiourgoume ena HTTP get request. h prwth parametros einai to route. otan kapoios kanei request gia to sigkekrimeno route tote ekteleite h epomenh parametros pou einai mia callback sinartish.
  sto request(req) vriskonte polles plirofories sxetika me to sigkekrimeno get request opos ta headers p xrisimopioume, ti method pou xrisimopiithike gia to request kai tis plirofories tou body */
  /* to express metatrefei ta antikimena se morfh JSON prin ta stilei sto browser */
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
   
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { /* ws deftero orisma sto res.render orizoume ena antikimeno gia na kanoume dinamika allages stis selides mas */
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});