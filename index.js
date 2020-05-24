const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');



console.log(fetchOHLC());

function fetchOHLC() {

  let url = 'https://latinonetonlineidentityserver.herokuapp.com/connect/token';
  let clientId = 'latinonetonlineapp';
  let clientSecret = core.getInput('latinonetonline-clientsecret');



  var formBody = [];
  formBody.push(encodeURIComponent('grant_type') + "=" + encodeURIComponent('client_credentials'));
  console.log("Obtener Bearer Token");
  return fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Basic ' + Buffer.from(clientId + ":" + clientSecret).toString('base64'),
      },
      body: formBody
    })
    .then(response => response.json())
    .then(function (response) {
      console.log(response.access_token);
      console.log("Refresh Tokens");
      fetch('https://latinonetonlinetokenrefresher.herokuapp.com/api/v1/Tokens/RefreshToken',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + response.access_token,
        },
      })

      return { };

    })
    .catch(function (error) {
      console.log(error);
    });
}