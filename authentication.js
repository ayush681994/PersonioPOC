module.exports = {
  label: "Connect to PersonioPOC",
  mock_input: {
    clientId: "dummy-client-id",
    clientSecret: "dummy-client-secret"
  },
  input: {
    type: "object",
    properties: {
      ClientId: {
        type: "string",
        minLength: 1,
        label: "ClientId"
      },
      ClientSecret: {
        type: "string",
        minLength: 1,
        label: "ClientSecret"
      }
    }
  },

  validate: function (input, output) {

    console.log("+-+- VALIDATE AUTH ", [input, this.mock_input]);
    // init dummy auth token
    input.auth["auth_token"] = "a-token";
    const rpn = require("request-promise-native");

    const clientId = input.auth.ClientId;
    const clientSecret = input.auth.ClientSecret;
    const authURL = "https://api.personio.de/v1/auth?client_id=" + clientId + "&client_secret=" + clientSecret;

    try {
      rpn(options)
        .then(function (resp) {
          console.log('User has RESP', resp);
          input.auth["auth_token"] = resp.token;
          output(null, true);
        })
        .catch(function (err) {
          console.log('+-+---- ERROR ', err);
          // API call failed...
        });
      // DEFAULT-REQUEST --------------------------------------------------------------------------------------------------------
      var options = {
        method: 'POST',
        uri: authURL,
        headers: {
          //  'User-Agent': 'Request-Promise',         
          'Accept': "application/json",
          "Content-Type": "application/json"
        },
    
        resolveWithFullResponse: true,
        json: true // Automatically parses the JSON string in the response
      };
      const request = require("request");
      request(options, function (err, res, body) {
        if (err) {
          console.log("+-+- error while getting options...")
          return output(err);
        }
        if (res.statusCode == 200) {
          // set the auth_token or any other auth info to be used in the next actions/lookups
          input.auth.auth_token = res.body.token;
          output(null, true);
        } else {
          output(res.statusMessage != null ? res.statusMessage : 'Unexpected problem', 'Unexpected result');
        }
      });


    } catch (error) {
      console.error(error);
    }
  }
}

