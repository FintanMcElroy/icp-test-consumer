'use strict'
// our dependencies
const express = require('express');
const app = express();
const router = express.Router();
// Get port from environment, default to 8080 if local
const serverPort = process.env.PORT || 8080;
const url = require('url');
// to make outbound REST API calls
const Client = require('node-rest-client').Client; // https://www.npmjs.com/package/node-rest-client for docs

// We need a way to have svc endpoint info injected from the environment as it will differ between kubernetes, Cloud Foundry, and other contexts
// Get providerEndpoint from environment, default to a local address
const providerEndpoint = process.env.PROVIDER_ENDPOINT || "http://127.0.0.1:8081";

// all routes prefixed with /api
app.use('/api', router);

// set the server to listen on the supplied port number
app.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));

router.get('/greet', (request, response) => {
  console.log(`/api/greet invoked ...`);
  let urlParts = url.parse(request.url, true);
  let parameters = urlParts.query;
  
  // Construct a JSON structure with the lang parameter in it
  let postData = {};
  postData.lang = parameters.lang;
  
  // set content-type header and data as json in args parameter
  let args = {
	data: postData,
    headers: { "Content-Type": "application/json" }
  };
  
  let restClient = new Client();

  let restPath = `${providerEndpoint}/api/provider/greet`;
  console.log("restPath", restPath);
  
  restClient.post(restPath, args, function (data, resp) {
	// data is the parsed return data, resp is the raw HTTP response
	console.log(`/api/greet about to return response: ${data.greeting}`);
	response.json({"message": data.greeting});
  });
  
});
