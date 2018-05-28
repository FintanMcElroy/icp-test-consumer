'use strict'
// our dependencies
const express = require('express');
const app = express();
const router = express.Router();
const port = 8080;
const url = require('url');

// all routes prefixed with /api
app.use('/api', router);

// set the server to listen on port 8080
app.listen(port, () => console.log(`Listening on port ${port}`));

router.get('/calculate', (request, response) => {
  console.log(`/api/calculate invoked ...`);
  let urlParts = url.parse(request.url, true);
  let parameters = urlParts.query;
  let myParam = parameters.myParam;
  
  let myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;
  
  console.log(`/api/calculate about to return myResponse: ${myResponse}`);
  response.json({message: myResponse});
});

router.get('/greet', (request, response) => {
  console.log(`/api/greet invoked ...`);
  let urlParts = url.parse(request.url, true);
  let parameters = urlParts.query;
  let lang = parameters.lang;
  let myResponse;
  switch (lang) {
	case "EN": {myResponse = `Hi there, old chap!`; break;}
	case "DE": {myResponse = `Guten tag, mein herr!`; break;}
	case "FR": {myResponse = `Bon journee, Monsieur!`; break;}
	default: {myResponse = `Hello, you did not supply a recognised language option`}
  }
  
  console.log(`/api/greet about to return myResponse: ${myResponse}`);
  response.json({message: myResponse});
});