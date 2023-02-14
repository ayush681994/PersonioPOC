module.exports = {

  name: "personiopoc",

  title: "Personiopoc",

  description: "",
  version: "v1",

  input:{
    title: "Personiopoc",
    type: "object",
    properties: {

    }
  },

 output: {
    title: "output",
    type: "object",
    properties: {
      success: {
        title: "success",
        displayTitle: "success",
        type: "boolean"

      },
      data: {
        title: "data",
        displayTitle: "data",
        type: "array",
        Employee: {
          title: "id",
          displayTitle: "id",
          type: "object"
        },
        properties: {
          id: {
            title: "id",
            displayTitle: "id",
            type: "integer"
          },
          first_name: {
            title: "first_name",
            displayTitle: "First name",
            type: "string"
          },
          last_name: {
            title: "last_name",
            displayTitle: "Last name",
            type: "string"
          },
          email: {
            title: "email",
            displayTitle: "Email",
            type: "string"
          },
          gender: {
            title: "gender",
            displayTitle: "Gender",
            type: "string"
          },
          department: {
            title: "department",
            type: "object",
            properties: {
              id: {
                title: "id",
                displayTitle: "Id",
                type: "integer"
              },
              name: {
                title: "name",
                displayTitle: "Name",
                type: "stringr"
              }

            },
            cost_centers: {
              title: "cost_centers",
              displayTitle: "cost_centers",
              type: "array"
            },
            dynamic_6365910: {
              title: "Geburtstag",
              type: "date"
            },
            dynamic_6365911: {
              title: "LinkedIn",
              type: "string"
            },
            dynamic_6365912: {
              title: "DATEV Personalnummer",
              type: "string"
            },
          }
        }
      }
    }
  },


  mock_input:{},

   execute: function (input, output) {
	   var authTok = 'a';
    var request = require("request");
	 const authURL = "https://api.personio.de/v1/auth?client_id=" + input.auth.ClientId + "&client_secret=" + input.auth.ClientSecret;

    var url = "https://api.personio.de/v1/company/employees?limit=200&offset=0";
	
	      var options1 = {
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
	  
	//   request(options1, function (err, res, body) {
	//	   authTok=body.data.token;
		   
       //  return output(authTok);
//       if (err) {
//         console.log("+-+- error while getting options...")
//         return output(err);
//       }
//       if (res.success == 'true') {
//         // set the auth_token or any other auth info to be used in the next actions/lookups
//         input.auth.auth_token = res.data.token;
//         output(null, true);
//       } else {
//         output(res.statusMessage != null ? res.statusMessage : 'Unexpected problem', 'Unexpected result');
//       }
   //   });

    var options = {
      "method": "GET",
      "url": url,
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authTok
      }

    };


   request(options, function (err, response, body) {
	   
	   return output ("Token:   "  + JSON.stringify(input)+"    Response:     "+JSON.stringify(response)+"       Body:      "+body+"      Errror    "+err);
//     if (err) {
//       return output(err);
//     }
//     try {
//       if (body && typeof (body) === "string") {
//         body = JSON.parse(body);
//       }
//     } catch (e) {
//       return output(body);
//     };
//
//     if (response.statusCode === 403) {
//       return output("the authentication information is incorrect.");
//     }
//     if (response.statusCode === 400) {
//       return output("there is an error in the construction of the request. The body of the response will contain more detail of the problem.");
//     }
//     if (response.statusCode === 404) {
//       return output(" the requested record could not be found. This may also occur if the user does not have access to the requested record");
//     }
//     if (response.statusCode !== 200) {
//       return output(url+"test 2 "+ JSON.stringify(input));
//     }
//     if (response.statusCode === 200) {
//       return output(null, {
//         data: body
//       });
//
//     }
//     output(body);




   // })

  });

}
}